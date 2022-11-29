<template>
  <Navbar />

  <main class="container">
    <Alert
      :show="showAlert"
      message="Todo title is required"
      type="danger"
      @close="showAlert = false"
    />

    <section>
      <AddTodoForm @submit="addTodo" />
    </section>

    <section v-if="todos.length === 0">
      <div class="no-todo">
        <p>You don't have any todo</p>
      </div>
    </section>
    <section v-else>
      <Todo :todos="todos" @click="removeTodo" />
    </section>
  </main>
</template>

<script>
import AddTodoForm from "./components/AddTodoForm.vue";
import Alert from "./components/Alert.vue";
import Navbar from "./components/Navbar.vue";
import Todo from "./components/Todo.vue";

export default {
  components: {
    Alert,
    Navbar,
    AddTodoForm,
    Todo,
  },

  data() {
    return {
      todoTitle: "",
      todos: [],
      showAlert: false,
    };
  },

  methods: {
    addTodo(title) {
      if (title === "") {
        this.showAlert = true;
        return;
      }

      this.todos.push({
        id: Math.floor(Math.random() * 1000),
        title: title,
      });

      this.showAlert = false;
    },

    removeTodo(id) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    },
  },
};
</script>

<style scoped>
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
</style>
