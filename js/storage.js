/**
 * storage.js
 * ------------
 * Handles all interactions with the browser's localStorage.
 * This module is responsible for saving, loading, and sorting tasks.
 * It provides a clean separation between app logic and data persistence.
 */

/**
 * saveData(list)
 * ----------------
 * Reads the current state of the task list from the DOM and saves it in localStorage.
 * Each <li> is converted into a plain object with:
 *  - text: task description
 *  - checked: completion state
 *  - date: ISO timestamp
 *  - displayDate: formatted date for UI display
 *  - prio: numeric priority (1 = low, 2 = medium, 3 = high)
 */
export function saveData(list) {
    const todos = [];
    list.querySelectorAll("li").forEach(li => {
        const text = li.querySelector("span").textContent;
        const checked = li.querySelector('input[type="checkbox"]').checked;
        const displayDate = li.querySelector("p").textContent;
        const isoDate = li.getAttribute("data-date");
        const prio =
        li.classList.contains("low-p") ? 1 :
        li.classList.contains("med-p") ? 2 : 3;

        todos.push({ text, checked, date: isoDate, displayDate, prio });
    });

    // Convert to JSON and store persistently in localStorage
    localStorage.setItem("data", JSON.stringify(todos));
}
  
/**
 * loadData()
 * ------------
 * Reads the saved to-do list from localStorage and returns it as an array.
 * If no data is found, it returns an empty array to avoid null errors.
 *
 * @returns {Array<Object>} Array of task objects.
 */
export function loadData() {
    return JSON.parse(localStorage.getItem("data")) || [];
}
  
/**
 * sortByDate()
 * --------------
 * Loads data from storage and returns a new array sorted by creation date (descending).
 * Most recent tasks appear first.
 *
 * @returns {Array<Object>} Sorted array of task objects.
 */
export function sortByDate() {
    const data = loadData();
    data.sort((a, b) => new Date(b.date) - new Date(a.date));
    return data;
}
  
/**
 * sortByPriority()
 * ------------------
 * Loads data from storage and returns a new array sorted by priority (descending).
 * Higher priority tasks (3 = High) appear first.
 *
 * @returns {Array<Object>} Sorted array of task objects.
 */
export function sortByPriority() {
    const data = loadData();
    data.sort((a, b) => b.prio - a.prio);
    return data;
}
  