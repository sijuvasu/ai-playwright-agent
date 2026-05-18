import { chromium } from '@playwright/test';
import * as fs from 'fs';

const actions: any[] = [];
const inputTimers = new Map();

(async () => {


  // 🚀 Launch browser
  const browser = await chromium.launch({
    headless: false
  });

  const page = await browser.newPage();

  // 🔥 Inject recorder BEFORE page load
  await page.exposeFunction('recordEvent', (event: any) => {
    console.log('Captured:', event);

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

  // 🧠 Inject listeners
  await page.addInitScript(() => {

    // CLICK recorder
    document.addEventListener('click', (e: any) => {

      let target = e.target as HTMLElement;
      target =
        target.closest('button, a, input, [role="button"]')
        || target;

      const text =
        target.innerText ||
        target.textContent ||
        '';

      // Build selector
      let selector = '';

      if (target.id) {
        selector = `#${target.id}`;
      }
      else if (target.getAttribute('name')) {
        selector = `[name="${target.getAttribute('name')}"]`;
      }
      else if (target.innerText) {
        selector = `text=${target.innerText.trim()}`;
      }
      else {
        selector = target.tagName.toLowerCase();
      }

      if (
        target.tagName === 'DIV' ||
        target.tagName === 'SPAN'
      ) {
        return;
      }

      // @ts-ignore
      window.recordEvent({
        type: 'click',
        tag: target.tagName,
        text: text.trim(),
        selector,
        url: window.location.href
      });

    });

    // INPUT recorder
    document.addEventListener('input', (e: any) => {

      const target = e.target as HTMLInputElement;

      if (!target || !target.tagName) return;

      const tag = target.tagName.toLowerCase();

      if (tag !== 'input' && tag !== 'textarea') return;

      let selector = '';

      if (target.id) {
        selector = `#${target.id}`;
      }
      else if (target.name) {
        selector = `[name="${target.name}"]`;
      }
      else if (target.placeholder) {
        selector = `[placeholder="${target.placeholder}"]`;
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

  // 🌐 Navigate AFTER injection
  await page.goto('https://www.saucedemo.com/');

  console.log('🎥 Recorder started...');
  console.log('Perform actions in browser');

})();