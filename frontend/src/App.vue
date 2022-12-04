<template>
  <Navbar />

  <main class="container">
    <Modal :show="editTodoForm.show" @close="editTodoForm.show = false">
      <template #header>
        <h2>Edit todo</h2>
      </template>

      <template #body>
        <form class="edit-todo-modal-form">
          <label>Todo title</label>
          <input type="text" v-model="editTodoForm.todo.title" />
        </form>
      </template>

      <template #footer>
        <div class="edit-todo-modal-footer">
          <Btn variant="secondary" @click="editTodoForm.show = false">
            Close
          </Btn>
          <Btn variant="success" @click="updateTodo">Confirm</Btn>
        </div>
      </template>
    </Modal>

    <Alert
      :show="alert.show"
      :message="alert.message"
      :variant="alert.type"
      @close="alert.show = false"
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
      <Todo :todos="todos" @edit="showEditTodoForm" @remove="removeTodo" />
    </section>
  </main>
</template>

<script>
import AddTodoForm from "./components/AddTodoForm.vue";
import Alert from "./components/Alert.vue";
import Btn from "./components/Btn.vue";
import Modal from "./components/Modal.vue";
import Navbar from "./components/Navbar.vue";
import Todo from "./components/Todo.vue";
import axios from "axios";

export default {
  components: {
    Alert,
    Navbar,
    AddTodoForm,
    Todo,
    Modal,
    Btn,
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
      try {
        const res = await axios.get("http://localhost:8080/todos");
        this.todos = await res.data;
      } catch (e) {
        this.showAlert("Failed loading todos");
      }
    },

    async addTodo(title) {
      if (title === "") {
        this.showAlert("Todo title is required");
        return;
      }

      const res = await axios.post("http://localhost:8080/todos", {
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
      await axios.put(
        `http://localhost:8080/todos/${this.editTodoForm.todo.id}`,
        {
          title: this.editTodoForm.todo.title,
        }
      );

      const todo = this.todos.find(
        (todo) => todo.id === this.editTodoForm.todo.id
      );

      todo.title = this.editTodoForm.todo.title;

      this.editTodoForm.show = false;
    },

    async removeTodo(id) {
      await axios.delete(`http://localhost:8080/todos/${id}`);

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
.edit-todo-modal-form input {
  width: 97%;
  border: none;
  border-radius: 5px;
  padding-inline: 10px;
  height: 35px;
  margin-top: 10px;
}

.edit-todo-modal-footer {
  display: flex;
  justify-content: center;
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
</style>
