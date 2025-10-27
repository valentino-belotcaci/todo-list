/**
 * app.js
 * ----------
 * Entry point of the To-Do List application.
 * - Imports the main modules: dom.js (for rendering) and events.js (for user interaction).
 * - Selects all necessary DOM elements.
 * - Initializes the app when the page finishes loading.
 */

import { showList } from "./dom.js";
import { registerEvents } from "./events.js";

// --- DOM ELEMENT REFERENCES ---
// Input elements
const input = document.getElementById("new");             // text field for new tasks
const btn = document.getElementById("addTodo");           // "Add" button
const prio = document.getElementById("choices");          // priority selector

// Task list and counters
const list = document.getElementById("todos");            // container <ul> for tasks
const counter = document.getElementById("counter");       // element showing total/visible tasks
const msg = document.getElementById("emptyMsg");          // message shown when list is empty

// Sorting and filtering buttons
const dateBtn = document.getElementById("date");          // sort by date button
const priorityBtn = document.getElementById("priority");  // sort by priority button
const allBtn = document.getElementById("f-all");          // filter: all tasks
const activeBtn = document.getElementById("f-active");    // filter: only active (unchecked)
const completedBtn = document.getElementById("f-done");   // filter: only completed

// Other control buttons
const toggleBtn = document.getElementById("t-all");       // toggle all checkboxes
const clearBtn = document.getElementById("u-all");        // remove all completed tasks
const searchInput = document.getElementById("search");    // search bar (text/date filter)
 
// --- INITIALIZATION ---
// Wait until the DOM is ready before running app logic.
document.addEventListener("DOMContentLoaded", () => {
    // Render the saved to-dos from localStorage
    showList(list, counter, msg);

    // Register all button handlers and keyboard events
    registerEvents({
        input, btn, list, counter, prio, msg,
        dateBtn, priorityBtn,
        allBtn, activeBtn, completedBtn,
        toggleBtn, clearBtn, searchInput
    });
});
 