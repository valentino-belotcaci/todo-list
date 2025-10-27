/**
 * utils.js
 * ----------
 * Contains small, reusable helper functions used across multiple modules.
 * These functions are purely utility-based and have no side effects
 * beyond what is explicitly described.
 */

/**
 * formatDate(date)
 * -----------------
 * Formats a JavaScript Date object into a localized Italian date and time string.
 * Example output: "27/10/2025, 21:32:10"
 *
 * @param {Date} date - The date object to format.
 * @returns {string} - A human-readable localized string.
 */
export function formatDate(date) {
    return new Intl.DateTimeFormat("it-IT", {
        dateStyle: "short",
        timeStyle: "medium"
    }).format(date);
}
  
/**
 * updateEmptyMessage(counter, msg)
 * ---------------------------------
 * Shows or hides the "empty list" message depending on the number of visible tasks.
 * It reads the numeric count from the counter element (e.g., "3 items").
 *
 * @param {HTMLElement} counter - The element displaying the task count text.
 * @param {HTMLElement} msg - The <p> element containing the empty list message.
 */
export function updateEmptyMessage(counter, msg) {
    const count = parseInt(counter.textContent);
    msg.style.display = count === 0 ? "block" : "none";
}
  