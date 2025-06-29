// Get DOM elements for the todo container, add button, and save button
let todoItemContainer = document.getElementById("todoItemContainer");
let addTodoButtom = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");

// Function to fetch todo list from localStorage
function getTodoListFronLocalStroage() {
    let stringfiedTodoList = localStorage.getItem("todoList"); // Get data from local storage
    let parsedTodoList = JSON.parse(stringfiedTodoList); // Convert JSON string to array
    if (parsedTodoList === null) {
        return []; // Return empty array if no data found
    } else {
        return parsedTodoList; // Return existing todo list
    }
}

// Initialize todo list from localStorage
let todoList = getTodoListFronLocalStroage();

// Save button stores current todo list into localStorage
saveTodoButton.onclick = function () {
    localStorage.setItem("todoList", JSON.stringify(todoList)); // Convert to string and store
}

// Add button triggers new todo addition
addTodoButtom.onclick = function () {
    onAddTodo();
};

// Function to delete a todo item by ID
function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId); // Find the DOM element
    todoItemContainer.removeChild(todoElement); // Remove it from the UI

    console.log(todoList);
    console.log(todoId);

    // Find index in the todoList array to delete
    let deleteIndex = todoList.findIndex(function (eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;

        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });

    // Remove the item from the array
    todoList.splice(deleteIndex, 1);
    console.log(todoList);
}

// Function to handle checkbox check/uncheck
function onTodoStatusChange(checkboxId, labelId, todoId) {
    let checkboxElement = document.getElementById(checkboxId); // Get checkbox
    let labelElement = document.getElementById(labelId); // Get corresponding label

    // Toggle class based on checkbox status
    if (checkboxElement.checked === true) {
        labelElement.classList.add("checked");
    } else {
        labelElement.classList.remove("checked");
    }

    // Update the isChecked property in todoList array
    let todoObjectIndex = todoList.findIndex(function (eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        return eachTodoId === todoId;
    });

    let todoObject = todoList[todoObjectIndex];
    todoObject.isChecked = checkboxElement.checked; // Set based on actual checked value
}

// Function to create and append a todo item to the DOM
function createAndAppendTodo(todo) {
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let todoId = "todo" + todo.uniqueNo;

    // Create the outer <li> element
    let todoElement = document.createElement("li");
    todoElement.id = todoId;
    todoElement.classList.add("todo-item-contianer", "d-flex", "flex-row"); // Note: typo in class name

    todoItemContainer.appendChild(todoElement);
    console.log(todoItemContainer);

    // Create the checkbox input
    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked; // Set checked status from object
    inputElement.classList.add("checkbox-input");

    inputElement.onclick = function () {
        onTodoStatusChange(checkboxId, labelId, todoId);
    };

    todoElement.appendChild(inputElement);

    // Create the label container <div>
    let lablecontainer = document.createElement("div");
    lablecontainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(lablecontainer);
    console.log(lablecontainer);

    // Create the <label> for the todo text
    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;

    if (todo.isChecked === true) {
        labelElement.classList.add("checked"); // If checked, show line-through
    }

    lablecontainer.appendChild(labelElement);

    // Create delete icon container and icon
    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    lablecontainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIconContainer.appendChild(deleteIcon);

    // Delete icon removes the todo item
    deleteIcon.onclick = function () {
        onDeleteTodo(todoId);
    };
}

// Function to add a new todo from user input
function onAddTodo() {
    let todosCount = todoList.length;
    todosCount = todosCount + 1;

    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value.trim(); // Remove spaces

    if (userInputValue === "") {
        alert("Entre valid input"); // Alert if input is empty
        return;
    }

    // Create a new todo object
    let newTodo = {
        text: userInputValue,
        uniqueNo: todosCount,
        isChecked: false
    };

    todoList.push(newTodo); // Add to array
    createAndAppendTodo(newTodo); // Add to DOM
    userInputElement.value = ""; // Clear input box
}

// Loop through existing todos and render them on page load
for (let todo of todoList) {
    createAndAppendTodo(todo);
}
