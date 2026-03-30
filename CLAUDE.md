# Cloud & AI Buddy Programme — Project Context

## What this is
A self-service pairing tool for large teams to connect around shared cloud and AI interests.
Users add themselves to topics, get paired with others at a similar or complementary level,
and see suggested learning resources per topic.

## Tech stack
- React 19 + Vite 8, plain JS (no TypeScript)
- **No CSS libraries** — inline styles only throughout
- GitHub Pages deployment: `npm run deploy` → https://edwardglw.github.io/cloud-ai-buddy/
- GitHub repo: https://github.com/edwardglw/cloud-ai-buddy
- Figma file key: F7UaHtjA6HdTRSbyrtfP2v

## Design system
- **Accent / CTA**: orange `#f4a261`, red `#e63946`
- **Background**: `#f0f2f5`
- **Header gradient**: `#111827` → `#1e1b4b`
- **Card background**: `#fff`, border `#e5e7eb`, radius 16, shadow `0 1px 4px rgba(0,0,0,0.06)`
- **Name format**: "First L" — enforced by regex `/^[A-Za-z]+(?: [A-Za-z])?$/`
- Theme: corporate modern, dark header, orange/red highlights

## Layout (critical)
Fixed viewport height layout — do NOT use `position: sticky` or page scroll.
- Outer: `height: 100vh; display: flex; flex-direction: column; overflow: hidden`
- Content row: `flex: 1; display: flex; overflow: hidden`
- Sidebar: `overflow-y: auto; flex-direction: column` with `minHeight: 0` on inner scroll div
- Main: `flex: 1; minWidth: 0; overflow-y: auto`

## Data model (local state only — no backend yet)
```js
{
  topics: string[],          // all topic names
  entries: [{ id, name, topic, level }],   // waiting for a buddy
  groups:  [{ id, topic, members: [{ name, level }] }]  // active pairings
}
```
- **Orphan promotion**: when a member is removed from a 2-person group, the remaining member
  is moved back to `entries` (waiting list) and the group is deleted.

## File structure
```
src/
  App.jsx          — root component, all state, event handlers (~170 lines)
  data.js          — PALETTE, CLOUD_TOPICS, AI_TOPICS, LINKS, DEFAULT_DATA, helpers
  index.css        — minimal reset + body font only
  components/
    Avatar.jsx         — coloured initials circle
    Badge.jsx          — Beginner/Intermediate/Expert chip
    Modal.jsx          — Modal wrapper + Field label wrapper
    MemberCard.jsx     — member chip with hover-remove button
    SuggestedLearning.jsx — 3 learning links with refresh button
    TopicCard.jsx      — CardHeader, GroupRow, TopicCard, WaitingTopicCard
    Sidebar.jsx        — left filter panel + add topic, Sidebar + SidebarTopic
    Modals.jsx         — AddMyselfModal, PairWithModal, JoinGroupModal
```

## Topics
- 15 Cloud topics (CLOUD_TOPICS in data.js)
- 15 AI topics (AI_TOPICS in data.js)
- Custom topics can be added at runtime via sidebar

## Suggested learning
- 5 links per topic in LINKS object (data.js)
- Shows 3 at a time, refresh button cycles through them
- FALLBACK_LINKS used for custom topics

## Windows dev notes
- Run dev server: `npm run dev` from `C:\Users\Ed\Desktop\AIprojects\cloud-ai-buddy`
- Open: http://127.0.0.1:5173/cloud-ai-buddy/
- vite.config.js has `host: '127.0.0.1'` — required on Windows (IPv6 binding causes blank page)
- PowerShell execution policy fix if needed: `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`

## Deployment
```bash
npm run deploy
```
Then ensure GitHub Pages is set to serve from `gh-pages` branch in repo Settings → Pages.

## Next steps / backlog
- Backend data store (Firebase or JSONBin) so all team members share state
- More views: profile page, topic detail, admin/moderation
- Push final designs to Figma after each screen is built
