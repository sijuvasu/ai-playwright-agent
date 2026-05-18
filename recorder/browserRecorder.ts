import { chromium } from '@playwright/test';
import * as fs from 'fs';

const actions: any[] = [];

(async () => {

  // 🚀 Launch browser
  const browser = await chromium.launch({
    headless: false
  });

  const page = await browser.newPage();

  // 🌐 Open starting page
  await page.goto('https://example.com');

  // 🔥 Inject recorder into browser
  await page.exposeFunction('recordEvent', (event: any) => {
    console.log('Captured:', event);

    actions.push(event);

    fs.writeFileSync(
      './data/actions.json',
      JSON.stringify(actions, null, 2)
    );
  });

  // 🧠 Listen for browser events
  await page.addInitScript(() => {

    // CLICK recorder
    document.addEventListener('click', (e: any) => {

      const target = e.target as HTMLElement;

      const text =
        target.innerText ||
        target.textContent ||
        '';

      // Build simple selector
      let selector = target.tagName.toLowerCase();

      if (target.id) {
        selector += `#${target.id}`;
      }

      if (target.className && typeof target.className === 'string') {
        selector += `.${target.className.split(' ').join('.')}`;
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

  });

  console.log('🎥 Recorder started...');
  console.log('Perform actions in browser');

})();