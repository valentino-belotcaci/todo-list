# 📝 To-Do List Web App

A modular **JavaScript To-Do List** application built with clean ES6 modules.  
It lets users manage daily tasks with features like filtering, sorting, priorities, search, and drag-and-drop reordering — all stored in **localStorage**.

---

## 🚀 Features

- ✅ Add, edit, and delete tasks  
- 📅 Sort by **date** or **priority**  
- 🔍 Real-time **search** by text or date  
- 🟢 Filter: **All**, **Active**, **Completed**  
- 🔁 Toggle all tasks at once  
- 🧹 Remove all completed tasks  
- 📦 LocalStorage persistence (tasks remain after reload)  
- ✋ Drag-and-drop task reordering  
- 🎨 Visual priority colors (Low, Medium, High)  
- 🟨 Active filter/sort highlighting  

---

## 📂 Project Structure

project/
│
├── index.html # Main HTML page
├── style.css # UI design and layout
│
└── js/
├── app.js # Entry point – initializes the app
├── dom.js # DOM creation & rendering logic
├── events.js # Handles all event listeners and UI interactions
├── storage.js # localStorage read/write and sorting logic
├── dragdrop.js # Drag & drop functionality
└── utils.js # Helper utilities (date formatting, empty message)


Each module has a single, well-defined responsibility to keep the code easy to read and maintain.

---

## ⚙️ How It Works

### Data Flow
1. **DOM interactions** (add, delete, toggle, reorder) trigger functions in `events.js`.  
2. **Changes** are saved to **localStorage** via `storage.js`.  
3. **UI updates** are rendered by `dom.js`.  
4. **Helper utilities** in `utils.js` handle formatting and UI consistency.  
5. **Drag-and-drop** updates the stored order and re-renders the list.

---

## 🧩 Main Modules Overview

### `app.js`
- **Entry point** of the application.  
- Selects all DOM elements and initializes event registration and rendering when the page loads.

### `dom.js`
- Builds `<li>` elements dynamically for each task.  
- Handles all **UI rendering and visual updates**.  
- Integrates **drag-and-drop** functionality for reordering tasks.

### `events.js`
- Handles all **user interactions**, including:
  - Adding and deleting tasks  
  - Filtering, sorting, toggling, clearing, and searching  
- Manages the **highlighting of active filters and sort buttons**.  
- Keeps the DOM and localStorage synchronized after every action.

### `storage.js`
- Saves and loads task data using **localStorage**.  
- Provides sorting utilities:
  - `sortByDate()` — sorts tasks by creation date (newest first).  
  - `sortByPriority()` — sorts tasks by priority (High → Low).

### `dragdrop.js`
- Adds **native drag-and-drop behavior** to each list item.  
- Updates the internal storage order and re-renders the list automatically after items are swapped.

### `utils.js`
- Contains small, reusable helper functions:
  - Formats dates for the **Italian locale**.  
  - Shows or hides the **“empty list”** message based on the current task count.

## 🧑‍💻 Author
Developed by **Valentino Belotcaci**  