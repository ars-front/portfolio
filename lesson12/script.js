'use strict';

const todoControl = document.querySelector('.todo-control'),
headerInput = document.querySelector('.header-input'),
todoList = document.querySelector('.todo-list'),
todoComplete = document.querySelector('.todo-completed');

let todoData  = [];
if(JSON.parse(localStorage.getItem("todo_data"))){
    todoData  = JSON.parse(localStorage.getItem("todo_data"));
}


const StorageMeneger = function(){
    localStorage.setItem("todo_data",JSON.stringify(todoData));
        let data = localStorage.getItem("todo_data");
        todoData = JSON.parse(data);
}

const render = function(){
    todoList.textContent = '';
    todoComplete.textContent = '';

    if(todoData !== null){
            todoData.forEach(function(item){
            
                const liItem = document.createElement('li');
                liItem.classList.add('todo-item');
                liItem.innerHTML = '<span class="text-todo">' + item.value + '</span>'+
                    '<div class="todo-buttons">' +
                        '<button class="todo-remove"></button>' +
                        '<button class="todo-complete"></button>' +
                    '</div>';
                if(item.completed){
                    todoComplete.append(liItem);
                }else{
                    todoList.append(liItem);
                };

                const btnTodoCompleted = liItem.querySelector('.todo-complete');
                btnTodoCompleted.addEventListener('click', function(){
                    item.completed = !item.completed;
                    StorageMeneger();
                    render();
                });

                const btnTodoDelte = liItem.querySelector('.todo-remove');

                btnTodoDelte.addEventListener('click', function(){
                    todoData = todoData.filter(itemm => itemm !== item);
                    StorageMeneger();
                    render();
                });

            });
    };

};

todoControl.addEventListener("submit", function(event){

    if(headerInput.value !== ''){
        event.preventDefault();

        const newTodo = {
                value: headerInput.value,
                completed: false
        };

        console.log(newTodo);
        todoData.push(newTodo);
        headerInput.value = null;
        StorageMeneger();
        render();
    }
    
} );

render();