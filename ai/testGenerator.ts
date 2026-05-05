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

  actions.forEach((action: any) => {

    if (action.type === 'goto') {
      script += `  await page.goto('${action.url}');\n`;
    }

    if (action.type === 'click') {
      if (action.role && action.text) {
        script += `  await page.getByRole('${action.role}', { name: '${action.text}' }).click();\n`;
      } else {
        script += `  await page.locator('${action.selector || 'UNKNOWN'}').click();\n`;
      }
    }

  });

  script += `});
`;

  fs.writeFileSync(outputFile, script);

  console.log('✅ Test generated at:', outputFile);
}