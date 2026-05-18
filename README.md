# AI Playwright Automation Engine

Owner: **siju.vasu**

An intelligent Playwright-based browser automation framework that records real user interactions, generates automation scripts, and executes them using adaptive self-healing replay logic.

---

# 🚀 Features

## ✅ Browser Interaction Recorder
- Records real user actions
- Captures:
  - clicks
  - typing
  - navigation context

---

## ✅ Intelligent Selector Engine

Generates multiple selector candidates:
- data-test
- id
- name
- aria-label
- text

Each selector is:
- validated for uniqueness
- scored by reliability
- ranked automatically

---

## ✅ Adaptive Replay Engine

Self-healing replay system:
- tries best selector first
- falls back automatically
- validates:
  - visibility
  - uniqueness

---

## ✅ Smart Interaction Execution

### smartClick()
Adaptive click execution engine.

### smartFill()
Adaptive input handling engine.

Both support:
- selector fallback
- visibility checks
- uniqueness checks

---

## ✅ Failure Diagnostics Engine

On replay failure:
- captures screenshot
- stores diagnostics report
- logs failed selectors
- explains replay failure reasons

Artifacts generated:
- screenshots
- JSON debug reports

---

# 📁 Project Structure

```text
project/
│
├── recorder/
│   └── browserRecorder.ts
│
├── generator/
│   └── generateTest.ts
│
├── engine/
│   └── replayEngine.ts
│
├── diagnostics/
│   └── reporter.ts
│
├── data/
│   └── actions.json
│
├── tests/
│   └── generated.spec.ts
│
└── README.md
```

---

# ⚙️ Initial Setup

## 1️⃣ Create project

```bash
mkdir ai-playwright-agent
cd ai-playwright-agent
```

---

## 2️⃣ Initialize Node project

```bash
npm init -y
```

---

## 3️⃣ Install Playwright

```bash
npm init playwright@latest
```

Select:
- TypeScript
- Chromium
- No GitHub Actions

---

## 4️⃣ Install required dependencies

```bash
npm install
npm install ts-node typescript @types/node --save-dev
```

---

## 5️⃣ Install Playwright browsers

```bash
npx playwright install
```

---

# ▶️ Recorder Workflow

## Step 1 — Start Recorder

```bash
npx ts-node recorder/browserRecorder.ts
```

Browser opens in visible mode.

Perform:
- login
- clicks
- form fills
- navigation

Recorded actions stored in:

```text
data/actions.json
```

---

## Step 2 — Generate Automation Test

```bash
npx ts-node generator/generateTest.ts
```

Generated test file:

```text
tests/generated.spec.ts
```

---

## Step 3 — Execute Generated Automation

```bash
npx playwright test tests/generated.spec.ts --project=chromium --headed --slow-mo=500
```

---

# 🧠 Intelligent Replay Workflow

```text
Record Flow
↓
Generate Actions
↓
Generate Automation
↓
Adaptive Replay
↓
Selector Validation
↓
Fallback Handling
↓
Diagnostics Collection
```

---

# 📸 Diagnostics

On failure:
- screenshot captured
- selector diagnostics stored
- JSON failure report generated

Artifacts location:

```text
diagnostics/
```

Example:
- failure-click-xxxxx.png
- failure-fill-xxxxx.png
- report-xxxxx.json

---

# 🔥 Current Capabilities

✅ Real browser interaction recording  
✅ Selector ranking engine  
✅ Self-healing replay  
✅ Smart click execution  
✅ Smart fill execution  
✅ Failure diagnostics  
✅ Adaptive automation replay  

---

# 🚀 Planned Features

- DOM similarity healing
- AI-assisted selector recovery
- Natural language flow summaries
- Execution dashboard
- Visual replay analysis
- MCP integration
- Autonomous automation agents

---

# 🛠️ Tech Stack

- Playwright
- TypeScript
- Node.js

---

# 🎯 Vision

Build an intelligent automation platform capable of:
- understanding browser interactions
- healing failed automation
- generating adaptive automation flows
- assisting debugging with diagnostics and replay intelligence