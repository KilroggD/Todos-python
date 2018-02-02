import {observable, computed, reaction} from 'mobx'

class TodoStore {

    @observable todos = []

    @computed getActiveTodoCount() {
        return this.todos.reduce(
            (s, todo) => s + (todo.completed ? 0 : 1),
            0
        )
    }

    @computed get completedTodoCount() {
        return this.todos.length - this.getActiveTodoCount;
    }

    @action async fetchTodos() {
        
    }

}