function getTodoTemplate(todoObj) {
    var strikedText = todoObj.isDone ? "striked-text" : "";
    var checked = todoObj.isDone ? "checked" : "";
    return  "<div class='todo-data'>" +
                "<input class='todo-check' type='checkbox'" + checked + ">" +
                "<input type='text' class='todo-row "+ strikedText + "' value='" + todoObj.text + "'>" +
                "</input>" +
                "<button class='todo-remove'>RemoveTodo</button>" +
            "</div>";
}
