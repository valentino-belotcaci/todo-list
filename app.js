let input = document.getElementById('new');
const btn = document.getElementById('addTodo');
const list = document.getElementById('todos');
let text;// text of the input
let A = [""]; //array of todos added

btn.addEventListener("click", (e) => {
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
        }
        else
            console.log("todo already added");
    }

});


list.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (e.target.matches('button.deleteBtn')) {
        const text = li.childNodes[1].textContent;
        const pos = A.indexOf(text);
        A.splice(pos);
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
