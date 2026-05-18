import { Page } from '@playwright/test';
import { saveDiagnostics } from '../diagnostics/reporter';


// 🔥 SMART CLICK
async function smartClick(
  page: Page,
  action: any
) {

  const selectors =
    action.selectors || [];

  const diagnostics: any[] = [];

  for (const selector of selectors) {

    try {

      const locator =
        page.locator(selector.value);

      const count =
        await locator.count();

      // ❌ No element / multiple elements
      if (count !== 1) {

        diagnostics.push({
          selector: selector.value,
          reason: `Expected 1 element, found ${count}`
        });

        continue;
      }

      // ❌ Hidden element
      const visible =
        await locator.first().isVisible();

      if (!visible) {

        diagnostics.push({
          selector: selector.value,
          reason: 'Element not visible'
        });

        continue;
      }

      console.log(
        `✅ Using click selector: ${selector.value}`
      );

      // ✅ Perform click
      await locator.first().click();

      return;

    } catch (err: any) {

      diagnostics.push({
        selector: selector.value,
        reason: err.message
      });

    }

  }

  // 📸 Capture screenshot
  const screenshot =
    `diagnostics/failure-click-${Date.now()}.png`;

  await page.screenshot({
    path: screenshot,
    fullPage: true
  });

  console.log(
    `📸 Screenshot saved: ${screenshot}`
  );

  // 📄 Save diagnostics
  saveDiagnostics(action, diagnostics);

  throw new Error(
    JSON.stringify(diagnostics, null, 2)
  );

}



// 🔥 SMART FILL
async function smartFill(
  page: Page,
  action: any
) {

  const selectors =
    action.selectors || [
      {
        value: action.selector
      }
    ];

  const diagnostics: any[] = [];

  for (const selector of selectors) {

    try {

      const locator =
        page.locator(selector.value);

      const count =
        await locator.count();

      // ❌ No element / multiple elements
      if (count !== 1) {

        diagnostics.push({
          selector: selector.value,
          reason: `Expected 1 element, found ${count}`
        });

        continue;
      }

      // ❌ Hidden element
      const visible =
        await locator.first().isVisible();

      if (!visible) {

        diagnostics.push({
          selector: selector.value,
          reason: 'Element not visible'
        });

        continue;
      }

      console.log(
        `✅ Using fill selector: ${selector.value}`
      );

      // ✅ Clear existing value
      await locator.first().clear();

      // ✅ Fill value
      await locator.first().fill(action.value);

      return;

    } catch (err: any) {

      diagnostics.push({
        selector: selector.value,
        reason: err.message
      });

    }

  }

  // 📸 Capture screenshot
  const screenshot =
    `diagnostics/failure-fill-${Date.now()}.png`;

  await page.screenshot({
    path: screenshot,
    fullPage: true
  });

  console.log(
    `📸 Screenshot saved: ${screenshot}`
  );

  // 📄 Save diagnostics
  saveDiagnostics(action, diagnostics);

  throw new Error(
    JSON.stringify(diagnostics, null, 2)
  );

}


export {
  smartClick,
  smartFill
};

export default smartClick;