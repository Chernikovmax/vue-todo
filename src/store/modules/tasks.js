export default {
  actions: {
    async fetchTasks(ctx, limit = 20) {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
      );
      const tasks = await response.json();

      ctx.commit("updateTasks", tasks);
    },

    passTheTask(ctx, task) {
        ctx.commit("addNewTask", task);
    },

    deleteTask(ctx, taskId) {
        ctx.commit("taskRemoving", taskId);
    }
  },
  mutations: {
    updateTasks(state, tasks) {
      state.todos = tasks;
      state.loading = false;
    },
    addNewTask(state, task) {
        state.todos.unshift(task);
    },
    taskRemoving(state, taskId) {
        state.todos = state.todos.filter(task => task.id !== taskId);
    },

  },
  state: {
    todos: [],
    loading: true,
  },
  getters: {
    fetchingStatus(state) {
        return state.loading;
    },
    allTasks(state) {
      return state.todos;
    },
    activeTasks(state) {
      return state.todos.filter(task => !task.completed);
    },
    doneTasks(state) {
      return state.todos.filter(task => task.completed);
    },
  }
};
