const input = document.getElementById('new');
const btn = document.getElementById('addTodo');
const list = document.getElementById('todos');
const counter = document.getElementById('counter');
const prio = document.getElementById('choices');
let text;// text of the input
let A = []; //array of todos added

function addTodo(){
    text = input.value.trim();

    if(text.length == 0)
        console.log('blank todo');
    else{
        let pos = A.indexOf(text);

        if (pos == -1){
            

            A.push(text);
            const li = document.createElement('li');

            //color based on priority
            if(prio.value == 1)
                li.classList.add('low-p');
            else if (prio.value == 2)
                li.classList.add('med-p');
            else
                li.classList.add('high-p');

            const check = document.createElement('input');

            check.type = "checkbox";
            /*
            check.name = "name";
            check.value = "value";
            check.id = "id";
            */

            li.appendChild(check);

            const span = document.createElement('span');
            span.textContent = text;
            li.appendChild(span);

            const now = new Date();
            const isoDate = now.toISOString();
            li.setAttribute('data-date', isoDate);
            const date = document.createElement('p');
            const formattedDate = new Intl.DateTimeFormat("it-IT", {
                dateStyle: "short",
                timeStyle: "medium"
              }).format(now);

            date.textContent = formattedDate;
            li.appendChild(date);

            const del = document.createElement('button');
            del.textContent = "x";
            del.classList.add('deleteBtn');
            li.appendChild(del);

            list.appendChild(li);
            counter.textContent = A.length + ' items';
            saveData();
            updateEmptyMessage()
            addEventListeners();
        }
        else
            console.log("todo already added");
    }
}

btn.addEventListener("click", () => {
    addTodo();
});

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTodo();
    }
});

input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      input.value = "";
      console.log("esc");
    }
});

list.addEventListener('dblclick', (e) => {
    if (e.target.tagName.toLowerCase() === 'span') {
        const span = e.target;
        const currText = span.textContent;
        

        const input = document.createElement('input');
        input.type = "text";
        input.value = currText;
        input.size = Math.max(1, currText.length);

        span.replaceWith(input);
        input.focus();

        input.addEventListener('blur', () => {
            const newText = input.value.trim();
        
            // blank text or already added
            if (newText.length === 0 || (A.includes(newText) && newText !== currText)) {
                input.replaceWith(span);//replace old span
                return;
            }
        
            const newSpan = document.createElement('span');
            newSpan.textContent = newText;
            input.replaceWith(newSpan);
        
            // update array A
            const li = newSpan.closest('li');
            const index = A.indexOf(currText);
            if (index !== -1) {
                A[index] = newText;
            }
        
            saveData();
        });
        

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                input.blur();
            }
        });
    }
});


list.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (e.target.matches('button.deleteBtn')) {
        const text = li.querySelector('span').textContent;
        const pos = A.indexOf(text);
        A.splice(pos, 1);
        counter.textContent = A.length + ' items';
        li.remove();
        updateEmptyMessage()
        saveData();
        return;
    }
    //click on checkbox
    if (e.target.matches('input[type="checkbox"]')) {
        li.classList.toggle('checked', e.target.checked);
        saveData();
        return;
    }
    //click on li element
    if (e.target.matches('span')) {
        const cb = li.querySelector('input[type="checkbox"]');
        cb.checked = !cb.checked;
        li.classList.toggle('checked', cb.checked);
        saveData();
        return;
    }
    
  });


const all = document.getElementById('f-all');

all.addEventListener("click", () => {
    Array.from(list.children).forEach(li => {
        li.classList.remove('remove-li');
    })
    counter.textContent = A.length + ' items';
    updateEmptyMessage();
});

const active = document.getElementById('f-active');

active.addEventListener("click", () => {
    let c = 0;
    Array.from(list.children).forEach(li => {
        if (li.classList.contains('checked')){
            li.classList.add('remove-li');
            //updateEmptyMessage();
        }
        else if (li.classList.contains('remove-li')){
            li.classList.remove('remove-li');
            c++;
        }else c++;
    })
    counter.textContent = c + ' items';
    updateEmptyMessage();
});

const completed = document.getElementById('f-done');

completed.addEventListener("click", () => {
    let c = 0;
    Array.from(list.children).forEach(li => {
        if (!li.classList.contains('checked')){
            li.classList.add('remove-li');
            //updateEmptyMessage();
        }
        else if (li.classList.contains('remove-li')){
            li.classList.remove('remove-li');
            c++;
        }else c++;
    })
    counter.textContent = c + ' items';
    updateEmptyMessage()
});

const toggle = document.getElementById('t-all');

toggle.addEventListener("click", () => {
    const items = Array.from(list.children);
    const allChecked = items.every(li => {
        const cb = li.querySelector('input[type="checkbox"]');
        return cb && cb.checked;
    });

    items.forEach(li => {
        const cb = li.querySelector('input[type="checkbox"]');
        if (cb) {
            cb.checked = !allChecked;
            if (cb.checked) {
                li.classList.add('checked');
            } else {
                li.classList.remove('checked');
            }
        }
    });

    saveData();
});

const comp = document.getElementById('u-all');

comp.addEventListener("click", () => {
    Array.from(list.children).forEach(li => {
        if(li.classList.contains('checked')){
            li.remove();
            updateEmptyMessage();
            const pos = A.indexOf(text);
            A.splice(pos, 1);
            counter.textContent = A.length + ' items';
        }
    })
    saveData();

});

function search(e){

    let c = 0;

    const value = e.target.value.toLowerCase();

    Array.from(list.children).forEach(li => {

        const isVisible = li.querySelector('span').textContent.trim().toLowerCase().includes(value) || 
        li.querySelector('p').textContent.trim().toLowerCase().includes(value);

        
        li.classList.toggle('search-li', !isVisible);

        if (isVisible) {
            c++;
        }
    })
    counter.textContent = c + ' items';
    updateEmptyMessage();
}

const s = document.getElementById('search');

s.addEventListener("input", (e) => search(e));



let dragStartIndex;

function dragStart(e) {
    dragStartIndex = [...list.children].indexOf(this);
    //console.log("dragStartIndex:", dragStartIndex);
}


function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    this.classList.add('over');
}

function dragLeave() {
    this.classList.remove('over');
}

function dragDrop() {
    const dragEndIndex = [...list.children].indexOf(this);
    //console.log("dragEndIndex:", dragEndIndex);

    swapItems(dragStartIndex, dragEndIndex); // swap in localStorage

    showList(); 
    this.classList.remove('over');
}


function swapItems(fromIndex, toIndex){
    const data = JSON.parse(localStorage.getItem("data")) || [];

    //console.log("Swapping", fromIndex, "with", toIndex);

    const temp = data[fromIndex];
    data[fromIndex] = data[toIndex];
    data[toIndex] = temp;

    //console.log("After swap:", data.map(t => t.text));

    localStorage.setItem("data", JSON.stringify(data));
}

function dragEnter(e) {
    e.preventDefault();
    this.classList.add('over');
    
}

function dragLeave() {
    this.classList.remove('over');
}


function addEventListeners(){
    Array.from(list.children).forEach(li => {
        li.setAttribute('draggable', 'true');

        li.addEventListener('dragstart', dragStart);
        li.addEventListener('dragover', dragOver);
        li.addEventListener('drop', dragDrop);
        li.addEventListener('dragenter', dragEnter);
        li.addEventListener('dragleave', dragLeave);
    });
}


function updateEmptyMessage() {
    const msg = document.getElementById('emptyMsg');
    const count = parseInt(counter.textContent);
    msg.style.display = (count === 0) ? 'block' : 'none';
}


function saveData(){
    const todos = [];
    Array.from(list.children).forEach(li => {
        const text = li.querySelector('span').textContent;
        const checked = li.querySelector('input[type="checkbox"]').checked;
        const displayDate = li.querySelector('p').textContent;
        const isoDate = li.getAttribute('data-date');
        const prio = li.classList.contains('low-p') ? 1 :
                    li.classList.contains('med-p') ? 2 : 3;
        todos.push({ text, checked, date: isoDate, displayDate, prio });
    });
    localStorage.setItem("data", JSON.stringify(todos));
}

const date = document.getElementById('date');
const priority = document.getElementById('priority');

function sortByDate(){
    const data = JSON.parse(localStorage.getItem("data")) || [];
    data.sort((a, b) => new Date(b.date) - new Date(a.date));
    return data;
}

function sortByPrio(){
    const data = JSON.parse(localStorage.getItem("data")) || [];
    data.sort((a, b) => b.prio - a.prio);
    return data;
}

date.addEventListener("click", () => showList(sortByDate()));

priority.addEventListener("click", () => showList(sortByPrio()));

function showList(data = null){
    const todos = data || JSON.parse(localStorage.getItem("data")) || []
    A = []; 

    list.innerHTML = ''; 
    updateEmptyMessage();

    todos.forEach(todo => {
        A.push(todo.text);

        const li = document.createElement('li');
        li.setAttribute('data-date', todo.date);

        const check = document.createElement('input');
        check.type = "checkbox";
        check.checked = todo.checked;

        const span = document.createElement('span');
        span.textContent = todo.text;

        const date = document.createElement('p');
        date.textContent = todo.displayDate;

        const prio = todo.prio;
        if(prio == 1)
            li.classList.add('low-p');
        else if (prio == 2)
            li.classList.add('med-p');
        else
            li.classList.add('high-p');

        const del = document.createElement('button');
        del.textContent = "x";
        del.classList.add('deleteBtn');

        li.appendChild(check);
        li.appendChild(span);
        li.appendChild(date);
        li.appendChild(del);

        if (todo.checked) 
            li.classList.add('checked');

        list.appendChild(li);
    });
    addEventListeners();
    updateEmptyMessage();
    counter.textContent = A.length + ' items';
}


showList();