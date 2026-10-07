# STEMMate Namibia

STEMMate Namibia helps STEM facilitators plan hands-on learning sessions, **even without internet**. A facilitator signs in, browses activities, saves them for offline use, writes session plans (with safety notes and an inclusion prompt) and watches them sync when the connection returns.

This is a React version of the "Prototype v0.1" single-file HTML app. The design, content and user flow are preserved. There is **no backend and no database**: activities live in a JavaScript array and the user's work is stored in the browser's `localStorage`.

## Technologies

- React 18 (functional components and hooks: `useState`, `useEffect`, `useMemo`, `useRef`, `useContext`)
- React Router 6 (`HashRouter`, so URLs look like `/#/browse` and work on any static host)
- Vite 5 (dev server and production build)
- Plain CSS (no UI library)

## Install and run

You need [Node.js](https://nodejs.org) 18 or newer.

```bash
npm install
npm run dev        # open the address it prints (usually http://localhost:5173)
```

Sign in with an ID like `FAC-01` (letters `FAC-` followed by two digits).

## Production build

```bash
npm run build      # creates the dist/ folder
npm run preview    # serves dist/ locally to test it
```

Upload the contents of `dist/` to any static web host. (Open it through a web server or `npm run preview`, not by double-clicking `index.html`.)

## Project structure

```
src/
├── main.jsx               Starts React (Router + AppProvider + App)
├── App.jsx                Route table (which URL shows which page)
├── index.css              Imports the files in styles/
├── styles/                theme (colours, dark mode), base, layout, components
├── data/
│   ├── activities.js      MOCK DATABASE of activities + filter options
│   └── planFields.js      The 5 required session-plan sections
├── context/               AppProvider: shared state & actions (useApp())
├── hooks/                 useLocalStorage, useSavedActivities, useSessionPlans, useDraftPlans,
│                          useActivityFilters, useToast, useEvaluatorPanel
├── utils/                 validation, filtering, storage keys/validators, sync statuses
├── components/            Reusable UI: Header, BottomNavigation, ActivityCard, ActivityFilters,
│                          StatusBadge, ProgressBar, EmptyState, FormField, SyncTimeline, ...
└── pages/                 SignIn, Home, Browse, ActivityDetails, Saved, SessionPlan, Plans,
                           SyncStatus, SignOut, SignedOut, NotFound
```

Pages read shared data with `useApp()`; components receive what they need through **props** (for example `<ActivityCard activity={a} onOpen={...} />`).

## How localStorage is used

`src/hooks/useLocalStorage.js` works like `useState` but remembers the value:

```js
const [savedIds, setSavedIds] = useLocalStorage("stemmate:savedActivities", [], isIdList);
```

- The value is restored when the page loads and saved on every change.
- Missing, corrupted or wrongly shaped data is ignored and the default is used.
- If `localStorage` is blocked or full, the app keeps working from memory.

Keys (see `src/utils/storageKeys.js`):

| Key | What it stores |
| --- | --- |
| `stemmate:user` | Signed-in facilitator ID |
| `stemmate:savedActivities` | Ids of activities saved for offline use |
| `stemmate:sessionPlans` | Saved plans with their sync status |
| `stemmate:draftPlans` | Auto-saved drafts, one per activity |
| `stemmate:offlineMode` | The online/offline simulation switch |

Signing out clears the user, plans, drafts and saved activities. A sync that was in progress when the page was refreshed resumes automatically.

## Where the mock database is, and how to add an activity

Open `src/data/activities.js` and add an object to the `activities` array with a **new unique `id`**:

```js
{
  id: 7,
  title: "Balloon Car",
  subject: "Engineering",        // Science | Maths | Engineering | Technology
  duration: 30,                  // 20 | 30 | 45 | 60
  level: "Grade 6",              // Grade 4 | Grade 6 | Grade 8
  resources: ["Paper", "Tape"],  // names from MATERIALS
  description: "Build a car powered by a balloon and race it.",
}
```

To add a new subject, duration, level or material, add it to `SUBJECTS`, `DURATIONS`, `LEVELS` or `MATERIALS` in the same file (a new subject also needs colours in `styles/theme.css` and an icon in `components/Icon.jsx`).

## Testing offline and failures

- The **Online/Offline** button in the header simulates losing the connection. Plans saved while offline become *Pending* and sync when you go back online.
- Press **Ctrl+Shift+E** (or add `?test` to the URL) to show the evaluator panel: force the next sync or save to fail, or simulate closing and reopening the app.
