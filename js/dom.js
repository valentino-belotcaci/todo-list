/**
 * dom.js
 * -------
 * Handles all DOM creation and rendering logic.
 * - Builds <li> elements for each to-do item.
 * - Renders the full list based on stored data.
 * - Connects drag-and-drop updates with visual refresh.
*/

import { saveData, loadData } from "./storage.js";
import { formatDate, updateEmptyMessage } from "./utils.js";
import { addDragListeners } from "./dragdrop.js";

// Global array containing the text of all current to-dos (used to prevent duplicates)
export let todosArray = [];
 
/**
 * showList(list, counter, msg, data)
 * -----------------------------------
 * Renders the full to-do list inside the given <ul> element.
 * Steps:
 *  1. Load data (from argument or localStorage).
 *  2. Clear current list.
 *  3. Build and append an <li> for each to-do.
 *  4. Attach drag-and-drop listeners.
 *  5. Update the counter and empty-list message.
 *
 * @param {HTMLElement} list - The <ul> element that holds all tasks.
 * @param {HTMLElement} counter - The element showing number of tasks.
 * @param {HTMLElement} msg - The "empty list" message element.
 * @param {Array<Object>} [data] - Optional task data; defaults to data from localStorage.
 */
export function showList(list, counter, msg, data = null) {
    const todos = data || loadData(); // use provided data or load saved one
    todosArray = [];
    list.innerHTML = ""; // clear list before re-rendering

    todos.forEach(todo => {
        todosArray.push(todo.text); // keep local list of text values
        const li = document.createElement("li");
        li.setAttribute("data-date", todo.date);

        // --- checkbox ---
        const check = document.createElement("input");
        check.type = "checkbox";
        check.checked = todo.checked;

        // --- task text ---
        const span = document.createElement("span");
        span.textContent = todo.text;

        // --- date display ---
        const date = document.createElement("p");
        date.textContent = todo.displayDate;

        // --- delete button ---
        const del = document.createElement("button");
        del.textContent = "x";
        del.classList.add("deleteBtn");

        // --- priority coloring ---
        const prio = todo.prio;
        if (prio === 1) li.classList.add("low-p");
        else if (prio === 2) li.classList.add("med-p");
        else li.classList.add("high-p");

        // --- checked tasks ---
        if (todo.checked) li.classList.add("checked");

        // --- build list item ---
        li.append(check, span, date, del);
        list.appendChild(li);
    });

    // Enable drag & drop and define callback for refreshing after reorder
    addDragListeners(list, () => showList(list, counter, msg));

    // Update task counter and empty message visibility
    counter.textContent = todosArray.length + " items";
    updateEmptyMessage(counter, msg);
}

/**
 * createTodoElement(text, prioValue)
 * -----------------------------------
 * Creates and returns a new <li> DOM element for a single to-do.
 * It does not append it to the list — this is handled externally.
 *
 * @param {string} text - The text content of the to-do.
 * @param {number} prioValue - Priority level (1 = low, 2 = medium, 3 = high).
 * @returns {HTMLLIElement} - The ready-to-use list item.
 */
export function createTodoElement(text, prioValue) {
    const li = document.createElement("li");
    li.setAttribute("data-date", new Date().toISOString());

    // Assign color class based on priority
    if (prioValue == 1) li.classList.add("low-p");
    else if (prioValue == 2) li.classList.add("med-p");
    else li.classList.add("high-p");

    // --- checkbox ---
    const check = document.createElement("input");
    check.type = "checkbox";

    // --- task text ---
    const span = document.createElement("span");
    span.textContent = text;

    // --- timestamp ---
    const date = document.createElement("p");
    date.textContent = formatDate(new Date());

    // --- delete button ---
    const del = document.createElement("button");
    del.textContent = "x";
    del.classList.add("deleteBtn");

    // Combine elements and return
    li.append(check, span, date, del);
    return li;
}
