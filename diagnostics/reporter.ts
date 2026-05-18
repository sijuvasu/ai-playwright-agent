import * as fs from 'fs';

export function saveDiagnostics(
  action: any,
  diagnostics: any[]
) {

  const report = {
    timestamp: new Date().toISOString(),
    action,
    diagnostics
  };

  const fileName =
    `diagnostics/report-${Date.now()}.json`;

  fs.writeFileSync(
    fileName,
    JSON.stringify(report, null, 2)
  );

  console.log(
    `📄 Diagnostics saved: ${fileName}`
  );

}