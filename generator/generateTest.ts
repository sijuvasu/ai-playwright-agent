import * as fs from 'fs';

const actionsFile = './data/actions.json';
const outputFile = './tests/generated.spec.ts';

const actions = JSON.parse(
    fs.readFileSync(actionsFile, 'utf-8')
);

let script = `
import { test, expect } from '@playwright/test';

test('generated flow', async ({ page }) => {
`;

const visitedUrls = new Set();

if (actions.length > 0) {
    script += `  await page.goto('${actions[0].url}');\n`;
}

actions.forEach((action: any) => {

    // 🔥 Handle fill
    if (action.type === 'fill') {
        script += `  await page.locator('${action.selector}').fill('${action.value}');\n`;
    }

    // 🔥 Handle click
    if (action.type === 'click') {
        script += `  await page.locator('${action.selector}').click();\n`;
        script += `  await page.waitForLoadState('networkidle');\n`;
    }

});

script += `});
`;

fs.writeFileSync(outputFile, script);

console.log('✅ Generated:', outputFile);