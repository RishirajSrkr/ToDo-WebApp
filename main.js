//selectors
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo');


//event listeners

//if everything loads up,, run the function getTodos
document.addEventListener('DOMContentLoaded', getTodos);

// when we click we want to do "addTodo"
todoButton.addEventListener('click', addTodo);
//so we will create the task "addTodo"

///deletecheck function will basically determine where are ww clicking, on the delete or check button.
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);



//functions
function addTodo(event) {
    // prevent form from submitting/ prevent from refreshing
    event.preventDefault();

    //todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    //create li
    const newTodo = document.createElement('li');
    if (todoInput.value !== "") {
        newTodo.innerText = todoInput.value;

        newTodo.classList.add("todo-item");

        //adding this new created li to the div(todoDiv)
        todoDiv.appendChild(newTodo);

    } else {
        alert('Message cannot be empty!');
        return false;
    }


    //add todo to local storage
    saveLocalTodos(todoInput.value);

    //check mark button
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fa-solid fa-square-check"></i>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);


    //check delete button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);


    //then add this div(todoDiv) to todo-list
    todoList.appendChild(todoDiv);

    //clear todo input value
    todoInput.value = "";

}

function deleteCheck(e) {
    //console.log(e.target), this will tell where we are clicking on, check or delete button

    const item = e.target;
    //delete todo
    if (item.classList[0] === "trash-btn") {
        //delete the parent of the item, so in this way the entire todo will get deleted, and not just the item(item is just a icon actually, either check or delete), we want to delete the entire todo(entire row) that belongs to that item.)
        const todo = item.parentElement;

        //before removing adding a animation
        todo.classList.add("fall");
        //but problem is, the remove statement will not wait for the animation to complete, it will instantly remove the todo once we hit delete. so we need to find a way such that the todo gets remove after the animation finishes.

        removeLocalTodos(todo);

        todo.addEventListener('transitionend', function () {
            todo.remove();
        });
    }
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
        //we will style the completed class to show that the task has been completed.
    }
}


//:scope is a pseudo-class that refers to the current element in the selector. In this case, :scope > .todo selects all child elements with the class todo that are direct children of the current element.

//So, :scope > .todo in the filterTodo function is selecting all the child elements with the class todo that are direct children of the todoList element. It is used to filter the to-do list based on the value of the filterOption select element.

function filterTodo(e) {
    const todos = todoList.childNodes;

    todos.forEach(function (todo) {
        if(todo.nodeType == Node.ELEMENT_NODE)
        {
        switch (e.target.value) //this will return us all or completed or incomplete
        {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none";
                }
                break;
            case "incomplete":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none";
                }
                break;
            }
        }
    });
}


// saving in local storage
function saveLocalTodos(todo) {
    //check if todo is already present in local storage
    let todos;
    //if todo is not already present then create a empty todo array
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }

    //if already a todo array is present, then get the array.
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    //add new todo to the already existing todo array
    todos.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos));
}


//function to display the local storage data in UI
function getTodos() {
    let todos;
    //if todo is not already present then create a empty todo array
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }

    //if already a todo array is present, then get the array.
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }


    //from here we have copied the addtodo function, and did some changes

    todos.forEach(function (todo) {


        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");

        //create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);


        //check mark button
        const completeButton = document.createElement('button');
        completeButton.innerHTML = '<i class="fa-solid fa-square-check"></i>';
        completeButton.classList.add("complete-btn");
        todoDiv.appendChild(completeButton);


        //check delete button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);


        //then add this div(todoDiv) to todo-list
        todoList.appendChild(todoDiv);

    })
}

//function to delete todo from local storage
function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    //we need to find the index of todo which we want to delete

    //finding the index of the text in which I am clicking delete
    const todoIndex = todo.children[0].innerText;

    //remove 1 element starting from position of todoIndex
    todos.splice(todos.indexOf(todoIndex), 1);

    //update it to localstorage after deleting
    localStorage.setItem("todos", JSON.stringify(todos));

}