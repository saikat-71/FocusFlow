# FocusFlow — Personal Productivity & Life Tracker

> A responsive, browser-based productivity and life tracking application built with HTML5, CSS3, and Vanilla JavaScript.

FocusFlow helps you plan tasks, track how you spend your time, manage goals, review productivity trends, and maintain a simple personal profile — without requiring a backend server or database.

## Overview

FocusFlow is a lightweight personal productivity dashboard for desktop and mobile devices. Application data is stored in the browser using LocalStorage, with JSON export/import available for manual backup and restore.

The project is intentionally built with plain web technologies so it is easy to understand, customize, deploy, and maintain.

## Core Features

### Dashboard
- Daily productivity overview
- Completed-task statistics
- Productive, unproductive, and untracked time
- Daily timeline
- Planned vs. actual time comparison
- Active goal progress
- Automatic productivity insights

### Task Management
- Create, edit, complete, and delete tasks
- Task date and start/end time
- Priority levels: High, Medium, Low
- Task categories
- Location and notes
- Search and filtering by status and priority
- Optional goal linking

### Time Tracker
- Live start/stop timer
- Manual activity logging
- Activity categories
- Productive and unproductive activity tracking
- Optional task and goal linking
- Activity history and deletion

### Goal Management
- Create, edit, and delete goals
- Target and current progress
- Deadlines
- Tracking modes for hours/activities, tasks, or manual progress
- Automatic progress updates for linked tasks and activities

### Calendar & Reviews
- Monthly task calendar
- Weekly productivity review
- Goal health overview
- Daily and weekly productivity observations

### Analytics
- Monthly analytics
- Yearly analytics
- Productive vs. unproductive time trends
- Category-based time breakdown
- Completion statistics
- Automatic long-term insights

### Profile & Settings
- Editable personal profile
- Email, phone, website, GitHub, and LinkedIn links
- Profile statistics
- Dark/light mode
- Daily wake/sleep schedule
- Browser reminder settings
- Browser notification support
- JSON export/import
- Reset local application data

### Mobile & PWA
- Responsive desktop and mobile layout
- Mobile hamburger navigation drawer
- Mobile bottom navigation
- Touch-friendly controls
- Progressive Web App (PWA) manifest
- Service-worker based offline support
- Browser-based installation on supported devices

> FocusFlow is currently a PWA, not a native Android APK. On supported Android browsers, it can be installed from the browser's install prompt or browser menu when the site is served from a suitable HTTPS deployment.

## Technology Stack

| Technology | Purpose |
|---|---|
| HTML5 | Application structure and semantic UI |
| CSS3 | Responsive layout, themes, components, and mobile UI |
| Vanilla JavaScript | Application logic, routing, forms, tracking, analytics, and interactions |
| LocalStorage | Local persistence of tasks, activities, goals, profile, and settings |
| Service Worker | Offline caching and PWA support |
| Web App Manifest | Installable PWA metadata |

No framework, backend API, or external database is required for the current version.

## Project Structure

```text
FocusFlow/
│
├── index.html
├── manifest.webmanifest
├── sw.js
├── README.md
│
├── assets/
│   └── logo.png
│
├── css/
│   └── style.css
│
└── js/
    ├── storage.js
    ├── tasks.js
    ├── tracker.js
    ├── goals.js
    ├── calendar.js
    ├── analytics.js
    ├── review.js
    ├── profile.js
    └── app.js
```

### JavaScript Responsibilities

- `storage.js` — LocalStorage data model, defaults, persistence helpers, and shared utilities.
- `tasks.js` — Task creation, editing, completion, filtering, and rendering.
- `tracker.js` — Live timer and manual activity tracking.
- `goals.js` — Goal creation, progress calculation, and goal rendering.
- `calendar.js` — Monthly calendar and task display.
- `analytics.js` — Monthly/yearly productivity calculations and charts.
- `review.js` — Weekly review calculations and insights.
- `profile.js` — Profile editing, rendering, and profile statistics.
- `app.js` — Application startup, navigation, dashboard rendering, settings, reminders, import/export, theme handling, mobile navigation, and PWA installation behavior.


## Data & Privacy

FocusFlow stores application data locally in the browser. The current version does not require an account, backend server, or cloud database.

Stored data can include:
- Tasks
- Activity records
- Goals
- Profile information
- Application settings

Because the data is stored locally, clearing the browser's site data can remove your FocusFlow data. **Use Export JSON regularly if the data is important.**

## Backup & Restore

FocusFlow provides JSON export/import from the **Settings → Data** section.

### Export
1. Open **Settings**.
2. Open the **Data** section.
3. Select **Export JSON**.
4. Keep the downloaded JSON file in a safe location.

### Import
1. Open **Settings**.
2. Open the **Data** section.
3. Select **Import JSON**.
4. Choose a previously exported FocusFlow JSON backup.

Importing a backup replaces the current locally stored application data with the imported dataset, so create a backup first if the current data must be preserved.

## PWA / Installation

FocusFlow includes a web app manifest and service worker. When deployed over HTTPS and when the browser's installation requirements are satisfied, supported browsers may show an **Install app** option.

### Android
- Open the deployed FocusFlow site in Chrome.
- Use the browser's **Install app** prompt if available.
- If the prompt is not shown, open the browser menu and look for **Install app** or **Add to Home screen**.

### iPhone / iPad
- Open FocusFlow in Safari.
- Use **Share → Add to Home Screen**.

Availability and wording can vary by browser and device.

## Browser Notifications

Task reminders can use browser notifications when notification permission is granted by the browser. Notification support depends on the browser, device, permission state, and deployment environment.

## Responsive Design

The interface is designed for both desktop and mobile use. On smaller screens, FocusFlow provides:

- Mobile navigation drawer
- Bottom navigation bar
- Responsive cards and grids
- Touch-friendly buttons and controls
- Mobile-friendly forms and calendars

## Development Notes

This project uses plain JavaScript rather than a frontend framework. The application is organized into separate JavaScript files by feature while sharing a common LocalStorage data model.

When modifying the project:

1. Preserve the existing HTML IDs used by JavaScript.
2. Keep LocalStorage data compatibility in mind.
3. Test both desktop and mobile layouts after UI changes.
4. Test create/edit/delete flows after changes to forms.
5. Test JSON export/import after changing the data model.
6. Re-check PWA/service-worker behavior after changing core assets.

## Deployment

FocusFlow can be deployed as a static website because it does not require a backend server. Suitable static hosting platforms include GitHub Pages and other services that provide HTTPS static hosting.

For PWA installation and service-worker behavior, deploy through HTTPS rather than relying only on a local `file://` URL.

## Current Limitations

- No user authentication
- No cloud synchronization
- No multi-device automatic sync
- Data is browser/device specific unless manually exported and imported
- Not a native APK application

## Future Enhancements

Possible future improvements include:

- Cloud synchronization
- User authentication
- Recurring tasks
- Advanced habit tracking
- Pomodoro/focus sessions
- More detailed productivity reports
- Cross-device synchronization
- Native Android packaging

## License

This project is intended for educational, personal productivity, and learning purposes.

## Version

**FocusFlow — Production UI/PWA build**

This README documents the current project structure and functionality included in the distributed build.
