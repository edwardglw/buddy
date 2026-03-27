# New React Project Checklist (Windows)

## One-time setup (already done on this PC)
- [x] Fix PowerShell execution policy:
  `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`

---

## Every new project

### Step 1 — Create a clean project folder
Create a new folder somewhere simple, e.g.:
```
C:\Projects\myapp
```
Avoid deep paths with spaces. Avoid creating projects inside your home directory (`C:\Users\Ed\`).

### Step 2 — Open PowerShell and navigate to the folder
```
cd C:\Projects\myapp
```

### Step 3 — Scaffold the React app
```
npm create vite@latest .
```
- When asked to proceed: `y`
- Framework: **React**
- Variant: **JavaScript**

### Step 4 — Install dependencies
```
npm install
```

### Step 5 — Fix vite.config.js (avoids IPv6/timeout issues on Windows)
Replace the contents of `vite.config.js` with:
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 5173,
  },
  optimizeDeps: {
    force: true,
  },
})
```

### Step 6 — Start the dev server
```
npm run dev
```

### Step 7 — Open in Chrome
```
http://127.0.0.1:5173/
```

---

## Notes
- Always use `http://127.0.0.1:5173/` not `http://localhost:5173/` on this machine
- Keep PowerShell open while developing — closing it stops the server
- To stop the server: `Ctrl+C` in PowerShell
