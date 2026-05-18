import * as fs from 'fs';

const actionsFile = './data/actions.json';
const outputFile = './tests/generated.spec.ts';

// Read recorded actions
const actions = JSON.parse(
  fs.readFileSync(actionsFile, 'utf-8')
);

// Generate Playwright test
let script = `
import { test } from '@playwright/test';
import actions from '../data/actions.json';
import {
  smartClick,
  smartFill
} from '../engine/replayEngine';

test('generated flow', async ({ page }) => {

`;


// 🚀 Navigate only ONCE
if (actions.length > 0) {

  script += `
  await page.goto('${actions[0].url}');
`;

}


// 🔥 Generate replay flow
actions.forEach((action: any) => {

  // ✅ Ignore useless input clicks
  if (
    action.type === 'click' &&
    action.selector &&
    actions.some(
      (a: any) =>
        a.type === 'fill' &&
        a.selector === action.selector
    )
  ) {
    return;
  }

  // 🔥 Handle fill
  if (action.type === 'fill') {

    script += `  await smartFill(page, ${JSON.stringify(action)});`;

  }

  // 🔥 Handle click
  if (action.type === 'click') {

    script += `
  await smartClick(page, ${JSON.stringify(action)});
  await page.waitForLoadState('networkidle');
`;

  }

});


// Close test
script += `
});
`;


// Write generated file
fs.writeFileSync(outputFile, script);

console.log('✅ Generated:', outputFile);