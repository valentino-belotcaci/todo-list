/**
 * dragdrop.js
 * -------------
 * Manages drag-and-drop reordering of to-do list items.
 * This module enables users to rearrange tasks visually and keeps
 * the order synchronized with localStorage.
*/

import { loadData } from "./storage.js";

let dragStartIndex;   // position index of the dragged element
let refreshFn = null; // callback used to re-render the list after drop

/**
 * addDragListeners(list, refreshCallback)
 * ----------------------------------------
 * Adds drag-and-drop event listeners to all <li> items in the list.
 * The provided refresh callback is executed after an item is dropped,
 * so the DOM and storage stay synchronized.
 *
 * @param {HTMLElement} list - the <ul> element containing tasks
 * @param {Function} refreshCallback - function to call after dropping
 */
export function addDragListeners(list, refreshCallback) {
    refreshFn = refreshCallback;

    list.querySelectorAll("li").forEach(li => {
        li.setAttribute("draggable", "true");
        li.addEventListener("dragstart", dragStart);
        li.addEventListener("dragover", dragOver);
        li.addEventListener("drop", dragDrop);
        li.addEventListener("dragenter", dragEnter);
        li.addEventListener("dragleave", dragLeave);
    });
}

/**
 * dragStart()
 * -------------
 * Stores the index of the element currently being dragged.
 */
function dragStart() {
    dragStartIndex = [...this.parentNode.children].indexOf(this);
}

/**
 * dragOver(e)
 * -------------
 * Prevents default behavior to allow dropping.
 */
function dragOver(e) {
    e.preventDefault();
}

/**
 * dragEnter(e)
 * --------------
 * Visually indicates a potential drop target by adding a highlight class.
 */
function dragEnter(e) {
    e.preventDefault();
    this.classList.add("over");
}

/**
 * dragLeave()
 * -------------
 * Removes the highlight when the dragged item leaves a potential drop zone.
 */
function dragLeave() {
    this.classList.remove("over");
}

/**
 * dragDrop()
 * ------------
 * Executes when an item is dropped:
 *  1. Determines the source and target indices.
 *  2. Swaps the two elements inside the stored task array.
 *  3. Saves the new order to localStorage.
 *  4. Calls the refresh function to re-render the list.
 */
function dragDrop() {
    const list = this.parentNode;
    const dragEndIndex = [...list.children].indexOf(this);
    const data = loadData();

    // swap items inside localStorage array
    const temp = data[dragStartIndex];
    data[dragStartIndex] = data[dragEndIndex];
    data[dragEndIndex] = temp;
    localStorage.setItem("data", JSON.stringify(data));

    // refresh UI after drop
    if (refreshFn) refreshFn();

    this.classList.remove("over");
}
