owner: Siju.vasu
Project: AI-Playwright Automation

npx ts-node recorder/browserRecorder.ts
npx ts-node generator/generateTest.ts
npx playwright test tests/generated.spec.ts \
--project=chromium \
--headed