import * as fs from 'fs';

const inputFile = './data/actions.json';
const outputFile = './tests/generated.spec.ts';

export function generateTest() {

  if (!fs.existsSync(inputFile)) {
    console.error('No actions file found');
    return;
  }

  const rawData = fs.readFileSync(inputFile, 'utf-8');
  const actions = JSON.parse(rawData || '[]');

  let script = `
import { test, expect } from '@playwright/test';

test('generated test', async ({ page }) => {
`;

  let lastGoto = '';

  actions.forEach((action: any) => {

    // ✅ Handle GOTO (avoid duplicates)
    if (action.type === 'goto') {
      if (action.url !== lastGoto) {
        script += `  await page.goto('${action.url}');\n`;
        lastGoto = action.url;
      }
    }

    // ✅ Handle CLICK
    if (action.type === 'click') {

      if (action.role && action.text) {

        if (action.navigation) {
          script += `
          await page.getByRole('${action.role}', { name: '${action.text}' }).click();
          await page.waitForURL(/.*/);
          `;
        } else {
          script += `  await page.getByRole('${action.role}', { name: '${action.text}' }).click();\n`;
        }

      } else if (action.text) {
        script += `  await page.getByText('${action.text}').click();\n`;
      } else {
        script += `  await page.locator('${action.selector || 'UNKNOWN'}').click();\n`;
      }

    }

  });

  // ✅ Close test AFTER loop
  script += `});
`;

  // ✅ Write file ONCE
  fs.writeFileSync(outputFile, script);

  console.log('✅ Test generated at:', outputFile);
}