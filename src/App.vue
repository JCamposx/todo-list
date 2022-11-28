<template>
  <nav class="navbar">
    <img class="logo" src="./assets/logo.svg" alt="Logo" width="32" />
    <div>Todo List App</div>
  </nav>

  <main class="container">
    <section>
      <form class="add-todo-form">
        <input v-model="todoTitle" type="text" placeholder="Title" />
        <div>
          <button @click.prevent="addTodo(todoTitle)">Add</button>
        </div>
      </form>
    </section>

    <section v-if="todos.length === 0">
      <div class="no-todo">
        <p>You don't have any todo</p>
      </div>
    </section>
    <section v-else>
      <div v-for="todo in todos" :key="todo.id" class="todo">
        <p>{{ todo.title }}</p>
        <div>
          <button @click="removeTodo(todo.id)" class="btn-remove-todo">
            &times;
          </button>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      todoTitle: "",
      todos: [],
    };
  },

  methods: {
    addTodo() {
      if (this.todoTitle !== "") {
        this.todos.push({
          id: Math.floor(Math.random() * 1000),
          title: this.todoTitle,
        });
        this.todoTitle = "";
      }
    },

    removeTodo(id) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    },
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  background: var(--dark-color);
  padding: 15px;
  padding-inline: 20px;
  margin-bottom: 40px;
}

.logo {
  padding-inline-end: 8px;
}

.add-todo-form {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
}

.add-todo-form input {
  width: 80%;
  border: none;
  border-radius: 5px;
  padding-inline: 10px;
}

.add-todo-form button {
  background: var(--accent-color);
  color: var(--text-color);
  padding-inline-start: 15px;
  padding-inline-end: 15px;
  height: 35px;
}

.no-todo {
  display: flex;
  align-items: center;
  justify-content: center;
}

.no-todo p {
  display: flex;
  align-items: center;
  background: var(--dark-color);
  padding-inline: 25px;
  border-radius: 5px;
  height: 60px;
  margin-top: 15px;
  border-radius: 10px;
}

.todo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--dark-color);
  padding-inline: 25px;
  border-radius: 5px;
  height: 60px;
  margin-top: 15px;
  border-radius: 10px;
  margin-top: 15px;
  border-radius: 10px;
  height: 70px;
}

.btn-remove-todo {
  width: 28px;
  height: 28px;
  font-size: 22px;
  background: var(--danger-color);
  color: var(--text-color);
}
</style>
