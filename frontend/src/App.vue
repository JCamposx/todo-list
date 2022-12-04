<template>
  <Navbar />

  <main class="container">
    <EditTodoForm
      :show="editTodoForm.show"
      @close="editTodoForm.show = false"
      @submit="updateTodo"
      v-model="editTodoForm.todo.title"
    />

    <Alert
      :show="alert.show"
      :message="alert.message"
      :variant="alert.type"
      @close="alert.show = false"
    />

    <section>
      <AddTodoForm @submit="addTodo" />
    </section>

    <section>
      <Spinner v-if="isLoading" />
    </section>

    <section v-if="todos.length === 0 && !isAnyError">
      <div class="no-todo">
        <p>You don't have any todo</p>
      </div>
    </section>
    <section v-else>
      <Todo :todos="todos" @edit="showEditTodoForm" @remove="removeTodo" />
    </section>
  </main>
</template>

<script>
import AddTodoForm from "./components/TodoForm/AddTodoForm.vue";
import Alert from "./components/Alert.vue";
import Btn from "./components/Btn.vue";
import Modal from "./components/Modal.vue";
import Navbar from "./components/Navbar.vue";
import Spinner from "./components/Spinner.vue";
import Todo from "./components/Todo.vue";
import axios from "axios";
import EditTodoForm from "./components/TodoForm/EditTodoForm.vue";

export default {
  components: {
    AddTodoForm,
    Alert,
    Btn,
    Modal,
    Navbar,
    Spinner,
    Todo,
    EditTodoForm,
  },

  data() {
    return {
      todoTitle: "",
      todos: [],
      alert: {
        show: false,
        message: "",
        type: "",
      },
      isLoading: true,
      isAnyError: false,
      editTodoForm: {
        show: false,
        todo: {
          id: 0,
          title: "",
        },
      },
    };
  },

  created() {
    this.getTodos();
  },

  methods: {
    async getTodos() {
      this.isLoading = true;
      try {
        const res = await axios.get("api/todos");
        this.todos = await res.data;
        this.isLoading = false;
      } catch (e) {
        this.showAlert("Failed loading todos");
        this.isAnyError = true;
      }
    },

    async addTodo(title) {
      if (title === "") {
        this.showAlert("Todo title is required");
        return;
      }

      const res = await axios.post("api/todos", {
        title: title,
      });

      this.todos.push(res.data);

      this.alert.show = false;
    },

    showEditTodoForm(id) {
      this.editTodoForm.show = true;
      this.editTodoForm.todo = { ...this.todos.find((todo) => todo.id === id) };
    },

    async updateTodo() {
      await axios.put(`api/todos/${this.editTodoForm.todo.id}`, {
        title: this.editTodoForm.todo.title,
      });

      const todo = this.todos.find(
        (todo) => todo.id === this.editTodoForm.todo.id
      );

      todo.title = this.editTodoForm.todo.title;

      this.editTodoForm.show = false;
    },

    async removeTodo(id) {
      await axios.delete(`api/todos/${id}`);

      this.todos = this.todos.filter((todo) => todo.id !== id);
    },

    showAlert(message, type = "danger") {
      this.alert.show = true;
      this.alert.message = message;
      this.alert.type = type;
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
