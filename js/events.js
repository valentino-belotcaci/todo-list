/**
 * events.js
 * -----------
 * Central event management module.
 * Handles all user interactions:
 *  - Adding, deleting, checking tasks
 *  - Filtering, sorting, toggling, and searching
 *  - Synchronizing changes with localStorage and UI updates
*/

import { saveData, sortByDate, sortByPriority } from "./storage.js";
import { createTodoElement, showList, todosArray } from "./dom.js";
import { updateEmptyMessage } from "./utils.js";

/**
 * registerEvents()
 * -----------------
 * Attaches all event listeners for buttons, inputs, and list interactions.
 * Keeps DOM logic separate from rendering and storage.
 *
 * @param {Object} elements - collection of DOM elements needed by the app
 */
export function registerEvents({
    input, btn, list, counter, prio, msg,
    dateBtn, priorityBtn,
    allBtn, activeBtn, completedBtn,
    toggleBtn, clearBtn, searchInput
}) {

    /**
    * setActiveButton(group, activeBtn)
    * ----------------------------------
    * Highlights the active filter/sort button and removes highlight from others.
    */
    function setActiveButton(group, activeBtn) {
        group.forEach(btn => btn.classList.remove("active"));
        activeBtn.classList.add("active");
    }

    /**
    * addTodo()
    * ----------
    * Adds a new task to the list if it’s not empty or duplicated.
    * Creates the element, appends it to DOM, updates storage and UI.
    */
    function addTodo() {
        const text = input.value.trim();
        if (!text.length || todosArray.includes(text)) return;

        todosArray.push(text);
        const li = createTodoElement(text, prio.value);
        list.appendChild(li);
        input.value = "";

        saveData(list);
        counter.textContent = list.children.length + " items";
        updateEmptyMessage(counter, msg);
    }

    // --- EVENT LISTENERS ---

    // Add button
    btn.addEventListener("click", addTodo);

    // Enter = add, Escape = clear input
    input.addEventListener("keydown", e => {
        if (e.key === "Enter") {
        e.preventDefault();
        addTodo();
        }
        if (e.key === "Escape") input.value = "";
    });

    /**
    * Handles all clicks within the list (<ul>).
    * Uses event delegation to capture:
    *  - Delete button
    *  - Checkbox toggle
    *  - Clicking on task text
    */
    list.addEventListener("click", e => {
        const li = e.target.closest("li");
        if (!li) return;

        // --- Delete task ---
        if (e.target.matches("button.deleteBtn")) {
        const text = li.querySelector("span").textContent;
        const pos = todosArray.indexOf(text);
        if (pos !== -1) todosArray.splice(pos, 1);
        li.remove();
        saveData(list);
        counter.textContent = list.children.length + " items";
        updateEmptyMessage(counter, msg);
        }

        // --- Checkbox toggle ---
        if (e.target.matches('input[type="checkbox"]')) {
        li.classList.toggle("checked", e.target.checked);
        saveData(list);
        }

        // --- Clicking task text toggles its checkbox ---
        if (e.target.matches("span")) {
        const cb = li.querySelector('input[type="checkbox"]');
        cb.checked = !cb.checked;
        li.classList.toggle("checked", cb.checked);
        saveData(list);
        }
    });

    /**
    * Handles double clicks within the list (<ul>).
    * Modifies the current text of the task with a new one
    * The new text must not be blank, and have a different text from all previous tasks added
    */
    list.addEventListener('dblclick', e => {
        if (e.target.tagName.toLowerCase() === 'span') {
        const span = e.target;
        const oldText = span.textContent;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = oldText;
        input.size = Math.max(1, oldText.length);
    
        span.replaceWith(input);
        input.focus();
    
        input.addEventListener('blur', () => {
            const newText = input.value.trim();
            if (!newText.length || todosArray.includes(newText)) {
            input.replaceWith(span);
            return;
            }
            span.textContent = newText;
            input.replaceWith(span);
    
            // update array and save
            const index = todosArray.indexOf(oldText);
            if (index !== -1) todosArray[index] = newText;
            saveData(list);
        });
    
        input.addEventListener('keydown', e => {
            if (e.key === 'Enter') input.blur();
            if (e.key === 'Escape') input.replaceWith(span);
        });
        }
    });
  

    // --- FILTER BUTTONS (All / Active / Completed) ---
    const filterButtons = [allBtn, activeBtn, completedBtn];

    allBtn.addEventListener("click", () => {
        Array.from(list.children).forEach(li => li.classList.remove("remove-li"));
        counter.textContent = list.children.length + " items";
        updateEmptyMessage(counter, msg);
        setActiveButton(filterButtons, allBtn);
    });

    activeBtn.addEventListener("click", () => {
        filter(list, counter, msg, false);
        setActiveButton(filterButtons, activeBtn);
    });

    completedBtn.addEventListener("click", () => {
        filter(list, counter, msg, true);
        setActiveButton(filterButtons, completedBtn);
    });

    // --- TOGGLE ALL ---
    toggleBtn.addEventListener("click", () => {
        const items = Array.from(list.children);
        const allChecked = items.every(li => li.querySelector("input").checked);
        items.forEach(li => {
        const cb = li.querySelector("input");
        cb.checked = !allChecked;
        li.classList.toggle("checked", cb.checked);
        });
        saveData(list);
    });

    // --- CLEAR COMPLETED ---
    clearBtn.addEventListener("click", () => {
        Array.from(list.querySelectorAll("li.checked")).forEach(li => li.remove());
        saveData(list);
        showList(list, counter, msg); // re-render and resync todosArray
        updateEmptyMessage(counter, msg);
    });

    // --- SORT BUTTONS (Date / Priority) ---
    const sortButtons = [dateBtn, priorityBtn];

    dateBtn.addEventListener("click", () => {
        showList(list, counter, msg, sortByDate());
        setActiveButton(sortButtons, dateBtn);
    });

    priorityBtn.addEventListener("click", () => {
        showList(list, counter, msg, sortByPriority());
        setActiveButton(sortButtons, priorityBtn);
    });

    // --- SEARCH BAR ---
    searchInput.addEventListener("input", e => search(e, list, counter, msg));

    /**
    * filter()
    * ---------
    * Filters tasks based on completion state.
    * @param {boolean} showCompleted - true = show completed only, false = show active only
    */
    function filter(list, counter, msg, showCompleted) {
        let visibleCount = 0;
        Array.from(list.children).forEach(li => {
        const isChecked = li.classList.contains("checked");
        const hide = showCompleted ? !isChecked : isChecked;
        li.classList.toggle("remove-li", hide);
        if (!hide) visibleCount++;
        });
        counter.textContent = visibleCount + " items";
        updateEmptyMessage(counter, msg);
    }

    /**
    * search()
    * ---------
    * Filters visible tasks by matching text or date with the search input value.
    */
    function search(e, list, counter, msg) {
        const value = e.target.value.toLowerCase();
        let visibleCount = 0;

        Array.from(list.children).forEach(li => {
        const span = li.querySelector("span").textContent.toLowerCase();
        const date = li.querySelector("p").textContent.toLowerCase();
        const visible = span.includes(value) || date.includes(value);
        li.classList.toggle("search-li", !visible);
        if (visible) visibleCount++;
        });

        counter.textContent = visibleCount + " items";
        updateEmptyMessage(counter, msg);
    }
}
