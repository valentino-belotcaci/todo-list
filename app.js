let input = document.getElementById('new');
const btn = document.getElementById('addTodo');
const list = document.getElementById('todos');
let text;// text of the input
let A = [""]; //array of todos added

btn.addEventListener("click", () => {
    text = input.value.trim();

    if(text.length == 0)
        console.log('blank todo');
    else{
        let pos = A.indexOf(text);
        if (pos == -1){
            A.push(text);
            const li = document.createElement('li');
            let liText;
            liText = document.createTextNode(text);
            li.appendChild(liText);
            list.appendChild(li);
        }
        else
            console.log("todo already added");
    }

});

