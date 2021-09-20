# FireLearn
A learning management system built with [Firebase]("https://firebase.google.com), [React](https://reactjs.org), [TypeScript](https://typescriptlang.org/), and [Material UI](https://v4.mui.com/).

## Status
This is a work in progress. All bugs are my own.

## Structure
Primary app files can be found in the `src` directory under the following subdirectories:
- **`components`** - primary UI components
- **`config`** - FireBase configuration
- **`contexts`** - React `createContext` wrappers for FireBase services (Auth, FireStore, Storage)
- **`hooks`** - React hooks for interacting with services or UI functionality
- **`routes`** - Nested page structure
- **`theme`** - Material UI theme definitions
- **`types`** - TypeScript type definitions
- **`utils`** - Reusable utility (pure) functions 

### Serverless (lambda) functions
Services requiring admin access to FireBase or that are triggered by the UI (onUserCreate, onUserUpdate) can be found in the `functions` top-level folder.


### Todo
- [ ] Enable users to connect and view each others' profiles
- [ ] Add commenting to lessons
- [ ] Build analytics dashboard for admins
- [x] Lesson editing with Markdown using [Outline Rich Markdown Editor](https://github.com/outline/rich-markdown-editor)
- [x] Admin management tools for course building
- [ ] Image pipeline for course building (inserting images into Markdown, generating thumbnails/responsive images from originals)

