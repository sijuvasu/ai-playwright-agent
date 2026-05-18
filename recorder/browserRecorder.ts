import { chromium } from '@playwright/test';
import * as fs from 'fs';

const actions: any[] = [];

(async () => {

  // 🚀 Launch browser
  const browser = await chromium.launch({
    headless: false
  });

  const page = await browser.newPage();

  // 🔥 Recorder bridge
  await page.exposeFunction('recordEvent', (event: any) => {

    console.log('Captured:', event);

    // ✅ Merge fill events
    if (event.type === 'fill') {

      const existingIndex = actions.findIndex(
        (a) =>
          a.type === 'fill' &&
          a.selector === event.selector
      );

      if (existingIndex !== -1) {
        actions[existingIndex] = event;
      } else {
        actions.push(event);
      }

    } else {
      actions.push(event);
    }

    fs.writeFileSync(
      './data/actions.json',
      JSON.stringify(actions, null, 2)
    );

  });

  // 🧠 Inject recorder BEFORE page loads
  await page.addInitScript(() => {

    // 🔥 Build selector candidates
    function buildSelectorCandidates(target: HTMLElement) {

      const selectors = [];

      // 1️⃣ data-test
      const dataTest = target.getAttribute('data-test');

      if (dataTest) {

        const selector = `[data-test="${dataTest}"]`;

        selectors.push({
          value: selector,
          type: 'data-test',
          unique: document.querySelectorAll(selector).length === 1,
          score: 10
        });

      }

      // 2️⃣ id
      if (target.id) {

        const selector = `#${target.id}`;

        selectors.push({
          value: selector,
          type: 'id',
          unique: document.querySelectorAll(selector).length === 1,
          score: 9
        });

      }

      // 3️⃣ name
      const name = target.getAttribute('name');

      if (name) {

        const selector = `[name="${name}"]`;

        selectors.push({
          value: selector,
          type: 'name',
          unique: document.querySelectorAll(selector).length === 1,
          score: 8
        });

      }

      // 4️⃣ aria-label
      const aria = target.getAttribute('aria-label');

      if (aria) {

        const selector = `[aria-label="${aria}"]`;

        selectors.push({
          value: selector,
          type: 'aria-label',
          unique: document.querySelectorAll(selector).length === 1,
          score: 7
        });

      }

      // 5️⃣ text
      const text =
        target.innerText ||
        target.textContent;

      if (
        text &&
        text.trim().length > 2
      ) {

        const cleanText = text.trim();

        selectors.push({
          value: `text=${cleanText}`,
          type: 'text',
          unique: false,
          score: 4
        });

      }

      // Sort best first
      selectors.sort((a, b) => b.score - a.score);

      return selectors;
    }

    // 🔥 CLICK recorder
    document.addEventListener('click', (e: any) => {

      let target = e.target as HTMLElement;

      // Find meaningful clickable parent
      target =
        target.closest('button, a, input, [role="button"]')
        || target;

      const text =
        target.innerText ||
        target.textContent ||
        '';

      // 🔥 Generate selector candidates
      const selectors =
        buildSelectorCandidates(target);

      // ✅ Choose best UNIQUE selector
      const bestSelector =
        selectors.find((s) => s.unique)
        || selectors[0];

      // @ts-ignore
      window.recordEvent({
        type: 'click',
        tag: target.tagName,
        text: text.trim(),
        selector: bestSelector?.value || '',
        selectors,
        url: window.location.href
      });

    });

    // 🔥 INPUT recorder
    document.addEventListener('input', (e: any) => {

      const target = e.target as HTMLInputElement;

      if (!target || !target.tagName) return;

      const tag = target.tagName.toLowerCase();

      if (
        tag !== 'input' &&
        tag !== 'textarea'
      ) return;

      let selector = '';

      // Better selector priority
      const dataTest =
        target.getAttribute('data-test');

      if (dataTest) {
        selector = `[data-test="${dataTest}"]`;
      }
      else if (target.id) {
        selector = `#${target.id}`;
      }
      else if (target.name) {
        selector = `[name="${target.name}"]`;
      }
      else if (target.placeholder) {
        selector =
          `[placeholder="${target.placeholder}"]`;
      }
      else {
        selector = tag;
      }

      // @ts-ignore
      clearTimeout(window.__inputTimer);

      // @ts-ignore
      window.__inputTimer = setTimeout(() => {

        // @ts-ignore
        window.recordEvent({
          type: 'fill',
          selector,
          value: target.value,
          url: window.location.href
        });

      }, 500);

    });

  });

  // 🌐 Open app AFTER recorder injection
  await page.goto('https://www.saucedemo.com/');

  console.log('🎥 Recorder started...');
  console.log('Perform actions in browser');

})();