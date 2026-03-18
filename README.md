# NGO Event Explorer

A React-based web application that enables users to discover, filter, and register for social impact events organized by NGO partners across India.

---

## About the Project

NGO Event Explorer is a front-end web application built as part of a Social Impact Platform. It allows volunteers, donors, and community members to browse NGO-hosted events across India — such as blood donation camps, tree plantation drives, digital literacy workshops, and more — and register for the ones they wish to attend.

The application demonstrates core React concepts including component-based architecture, state management with hooks, asynchronous data fetching, and dynamic UI filtering.

---

## Live Overview

| Stat | Description |
|---|---|
| Total Events | Fetched dynamically from an external API (20 events) |
| Categories | Education, Health, Environment, Community, Human Rights |
| Locations | 10 major Indian cities |
| Interaction | Register / unregister for upcoming events in one click |

---

## Features

- **Event Listing** — Displays 20 NGO events fetched from a REST API and mapped to meaningful event data
- **Search** — Real-time search by event title
- **Filter by Status** — Toggle between All, Upcoming, and Past events
- **Filter by Category** — Narrow events by one of five social impact categories
- **Registration** — Click to register or unregister for any upcoming event; state persists across filters
- **Live Stats** — Header shows total events, upcoming count, and number of registered events at a glance
- **Sticky Footer** — Appears only when registered for at least one event, showing a live count
- **Loading & Error States** — Graceful UI handling for API loading and fetch failures
- **Responsive Grid** — Auto-fill card grid that adapts to different screen sizes

---

## Project Structure

```
src/
│
├── components/
│   ├── Header.jsx       — Top banner with branding and live stats
│   ├── Filters.jsx      — Search bar, status toggles, category dropdown
│   ├── EventCard.jsx    — Individual event card with registration button
│   ├── EventGrid.jsx    — Grid layout + loading / error / empty states
│   └── Footer.jsx       — Sticky registration count bar
│
├── utils/
│   └── constants.js     — Category config, helper functions, data mapper
│
└── App.jsx              — Root component; owns all state and data fetching
```

---

## Component Breakdown

### `App.jsx`
The root orchestrator of the application. It is responsible for:
- Fetching event data from the API on mount via `useEffect`
- Holding all application state (events, filters, search text, registered events)
- Deriving filtered event lists and passing them down as props
- Rendering the full page layout by composing all child components

It does **not** contain any UI markup of its own beyond a wrapper `div` — all visual rendering is delegated to child components.

---

### `components/Header.jsx`
Displays the platform branding, application title, and a live stats bar.

**Props received:**
| Prop | Type | Description |
|---|---|---|
| `totalEvents` | `number` | Total number of events loaded |
| `upcomingCount` | `number` | Count of events with a future date |
| `registeredCount` | `number` | Number of events the user has registered for |

---

### `components/Filters.jsx`
Renders the search and filter controls bar, including the text search input, All / Upcoming / Past toggle buttons, and the category dropdown.

**Props received:**
| Prop | Type | Description |
|---|---|---|
| `searchText` | `string` | Current search input value |
| `setSearchText` | `function` | Updater for search input |
| `filter` | `string` | Active status filter (`"all"`, `"upcoming"`, `"past"`) |
| `setFilter` | `function` | Updater for status filter |
| `categoryFilter` | `string` | Active category filter |
| `setCategoryFilter` | `function` | Updater for category filter |

Imports `categories` from `utils/constants.js` to populate the dropdown dynamically.

---

### `components/EventCard.jsx`
Renders a single event as a styled card. Displays event title, description, date, location, spots available, organizer name, category badge, and upcoming/past status badge.

The Register button is only interactive for upcoming events. Clicking it calls `onRegister` to toggle registration state in the parent.

**Props received:**
| Prop | Type | Description |
|---|---|---|
| `event` | `object` | Full event data object |
| `registered` | `boolean` | Whether the user has registered for this event |
| `onRegister` | `function` | Callback to toggle registration by event ID |

Imports `categoryColors`, `formatDate`, and `isUpcoming` from `utils/constants.js`.

---

### `components/EventGrid.jsx`
Responsible for rendering the correct UI state based on data availability:
- **Loading state** — shown while the API fetch is in progress
- **Error state** — shown if the fetch fails
- **Empty state** — shown when filters return no results
- **Grid** — renders a responsive card grid of `EventCard` components when data is available

**Props received:**
| Prop | Type | Description |
|---|---|---|
| `loading` | `boolean` | Whether data is still being fetched |
| `error` | `string \| null` | Error message if fetch failed |
| `events` | `array` | Filtered list of events to display |
| `registeredEvents` | `Set` | Set of registered event IDs |
| `onRegister` | `function` | Registration toggle callback passed to each card |

---

### `components/Footer.jsx`
A sticky footer bar that appears at the bottom of the viewport only when the user has registered for one or more events. It displays a live count of registrations.

**Props received:**
| Prop | Type | Description |
|---|---|---|
| `registeredCount` | `number` | Number of registered events; renders `null` if zero |

---

## Utility Functions

All shared logic and configuration lives in `src/utils/constants.js`.

### `categoryColors`
An object mapping each category name to a set of `bg`, `text`, and `border` color values used for consistent badge and accent styling across cards.

### `categories`
A derived array of category names from `categoryColors`, used to populate the filter dropdown in `Filters.jsx`.

### `formatDate(date)`
Accepts a JavaScript `Date` object and returns a human-readable string formatted for Indian locale (e.g., `14 Mar 2026`).

### `isUpcoming(date)`
Returns `true` if the given date is today or in the future. Used to determine card status badges and whether the Register button is interactive.

### `mapPostToEvent(post)`
Transforms a raw JSONPlaceholder post object into a structured event object with the following fields: `id`, `title`, `description`, `date`, `location`, `category`, `spots`, and `organizer`. This acts as a data adapter layer between the external API and the application's internal data model.

---

## Data Flow

```
JSONPlaceholder API
       │
       ▼
   App.jsx (fetch + map via mapPostToEvent)
       │
       ├──▶ Header.jsx         (stats: total, upcoming, registered)
       │
       ├──▶ Filters.jsx        (search + filter controls → updates App state)
       │
       └──▶ EventGrid.jsx
                 │
                 └──▶ EventCard.jsx × N   (per filtered event)
                           │
                           └──▶ onRegister → App.jsx (updates registeredEvents Set)
```

State always flows **down** via props. User interactions (register, search, filter) call setter functions passed from `App.jsx`, keeping the single source of truth in the root component.

---

## State Management

All state is managed in `App.jsx` using React's `useState` hook. No external state library is used.

| State Variable | Type | Purpose |
|---|---|---|
| `events` | `array` | Full list of fetched and mapped events |
| `searchText` | `string` | Current value of the search input |
| `registeredEvents` | `Set` | IDs of events the user has registered for |
| `loading` | `boolean` | Controls loading UI during API fetch |
| `error` | `string \| null` | Stores fetch error message if any |
| `filter` | `string` | Status filter: `"all"`, `"upcoming"`, or `"past"` |
| `categoryFilter` | `string` | Category filter value or `"all"` |

`registeredEvents` uses a JavaScript `Set` for O(1) lookup when checking if an event is registered, and is updated immutably by spreading into a new `Set` on each toggle.

---

## API Integration

The application fetches data from the [JSONPlaceholder](https://jsonplaceholder.typicode.com/) public mock API:

```
GET https://jsonplaceholder.typicode.com/posts?_limit=20
```

Since this is a mock API, raw post data (title, body, userId) is transformed into event-shaped data using `mapPostToEvent()` in `utils/constants.js`. In a production environment, this endpoint would be replaced with a real NGO events API, and the mapper would be updated or removed accordingly.

---

> Built with Vite. If using Create React App, replace `npm run dev` with `npm start`.

---

## Where It Can Be Used

This application is well-suited for the following real-world contexts:

**NGO Portals** — Any non-profit organization that hosts regular public events (health camps, awareness drives, workshops) can use this as a lightweight volunteer/attendee registration portal.

**CSR Platforms** — Companies running Corporate Social Responsibility programs can use it to list employee volunteering opportunities and track participation.

**College Social Clubs** — Student organizations managing community service events can adapt this to manage event listings and sign-ups.

**Government Community Programs** — Municipal or state-level social welfare departments can use it to surface public events to citizens by city and category.

**Hackathon Starter Template** — The clean component structure and mock API integration make it a strong starting point for social-good hackathon projects.

---

## Future Improvements

- **Backend Integration** — Replace JSONPlaceholder with a real REST or GraphQL API backed by a database
- **Authentication** — Add user login so registrations persist across sessions
- **Event Detail Page** — Dedicated route per event with full description, map, and contact info
- **Pagination or Infinite Scroll** — Handle larger datasets beyond 20 events
- **Notifications** — Email or push reminders for registered upcoming events
- **Admin Panel** — Allow NGO partners to create and manage their own events
- **Accessibility** — Add ARIA labels, keyboard navigation, and screen reader support
- **Dark Mode** — Toggle between light and dark theme

---

*Built with React · Designed for Social Impact*
