import { observable, computed, reaction } from 'mobx'
import ApiService from '../services/ApiService'

class TodoStore {

    @observable todos = []
    @observable loading = true

    @computed getActiveTodoCount() {
        return this.todos.reduce(
            (s, todo) => s + (todo.completed ? 0 : 1),
            0
        )
    }

    @computed get completedTodoCount() {
        return this.todos.length - this.getActiveTodoCount;
    }

    @action async fetchTodos(userId) {
        this.todos = []
        this.loading = true
        const res = await ApiService.get_todos(userId)      
        runInAction(() => {
            this.todos = res.todos;
            this.loading = false;
        }
    }

}