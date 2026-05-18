import fs from 'fs';

const filePath = './data/actions.json';

export function recordAction(action: any) {
  let actions = [];

  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf-8');
    actions = JSON.parse(data || '[]');
  }

  actions.push(action);

  fs.writeFileSync(filePath, JSON.stringify(actions, null, 2));
}

export function clearActions() {
  fs.writeFileSync('./data/actions.json', '[]');
}