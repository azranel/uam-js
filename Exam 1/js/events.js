window.addEventListener('DOMContentLoaded', function () {

    var todos = [];

    var todoInput = document.querySelector('#newTodo');
    var todosList = document.querySelector('#todosList');
    var clearDoneTodosButton = document.querySelector('#removeDoneTodos');
    var todosNumber = document.querySelector('#todosNumber');

    var updateNotDoneCount = function() {
      var notDoneTodosLength = todos.filter(function(todo) {
        return todo.isDone === false;
      }).length;
      todosNumber.innerHTML = "<strong>" + notDoneTodosLength.toString() + "</strong> items left.";
    };

    var updateClearDoneTodosButton = function() {
      var doneTodosLength = todos.filter(function (todo) {
        return todo.isDone === true;
      }).length;
      clearDoneTodosButton.innerHTML = "Clear " + doneTodosLength.toString() + " items.";
    }

    var repaintUI = function() {
      todosList.innerHTML = "";
      for(var i = 0; i < todos.length; i++) {
        paintElement(todos[i]);
      };
      updateNotDoneCount();
      updateClearDoneTodosButton();
    }

    var paintElement = function(todo) {
      var todoDomElement = document.createElement('li');
      var template = getTodoTemplate(todo);

      updateNotDoneCount();
      todoDomElement.innerHTML = template;
      todosList.appendChild(todoDomElement);

      var removeBtn = todoDomElement.querySelector('.todo-remove');
      var todoEditInput = todoDomElement.querySelector('.todo-row');
      var todoCheck = todoDomElement.querySelector('.todo-check');

      todoEditInput.addEventListener('keypress', function (e) {
        todo.text = e.target.value;
      });

      todoCheck.addEventListener('click', function(e) {
        todo.isDone = !todo.isDone;
        repaintUI();
        updateNotDoneCount();
      });

      removeBtn.addEventListener('click', function(e) {
        var todoIndex = todos.indexOf(todo);
        if (todoIndex >= 0) {
              todos.splice(todoIndex, 1);
        }
        todosList.removeChild(todoDomElement);
        updateNotDoneCount();
      });
    }

    todoInput.addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode;
      if (key === 13) {
        var todoText = todoInput.value;
        var todo = {
          text: todoText,
          isDone: false
        };
        todos.push(todo);

        paintElement(todo);
        updateClearDoneTodosButton();

        todoInput.value = "";
      }
    });

    clearDoneTodosButton.addEventListener('click', function(e) {
      todos = todos.filter(function(todo) {
        return todo.isDone === false;
      });
      repaintUI();
    });
});
