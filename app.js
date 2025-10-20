const input = document.getElementById('new');
const btn = document.getElementById('addTodo');
const list = document.getElementById('todos');
const counter = document.getElementById('counter');
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
            const check = document.createElement('input');

            check.type = "checkbox";
            /*
            check.name = "name";
            check.value = "value";
            check.id = "id";
            */

            li.appendChild(check);

            let liText;

            liText = document.createTextNode(text);
            li.appendChild(liText);

            const del = document.createElement('button');
            del.textContent = "x";
            del.classList.add('deleteBtn');
            li.appendChild(del);

            list.appendChild(li);
            counter.textContent = A.length + ' items';
            //console.log(counter.value);
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


list.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (e.target.matches('button.deleteBtn')) {
        const text = li.childNodes[1].textContent;
        const pos = A.indexOf(text);
        A.splice(pos, 1);
        counter.textContent = A.length + ' items';
        li.remove();
    }
    //click on checkbox
    if (e.target.matches('input[type="checkbox"]')) {
        li.classList.toggle('checked', e.target.checked);
    }
    //click on li element
    const cb = li.querySelector('input[type="checkbox"]');
    if (cb) {
        cb.checked = !cb.checked;
        li.classList.toggle('checked', cb.checked);
    }
  });


const all = document.getElementById('f-all');

all.addEventListener("click", () => {
    let c;
    Array.from(list.children).forEach(li => {
        li.classList.remove('remove-li');
    })
    counter.textContent = A.length + ' items';
});

const active = document.getElementById('f-active');

active.addEventListener("click", () => {
    let c = 0;
    Array.from(list.children).forEach(li => {
        if (li.classList.contains('checked'))
            li.classList.add('remove-li');
        else if (li.classList.contains('remove-li')){
            li.classList.remove('remove-li');
            c++;
        }else c++;
    })
    counter.textContent = c + ' items';
});

const completed = document.getElementById('f-done');

completed.addEventListener("click", () => {
    let c = 0;
    Array.from(list.children).forEach(li => {
        if (!li.classList.contains('checked'))
            li.classList.add('remove-li');
        else if (li.classList.contains('remove-li')){
            li.classList.remove('remove-li');
            c++;
        }else c++;
    })
    counter.textContent = c + ' items';
});