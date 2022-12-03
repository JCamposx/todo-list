<template>
  <Navbar />

  <main class="container">
    <Modal :show="editTodoForm.show">
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
          <Btn type="secondary" @click="editTodoForm.show = false">Close</Btn>
          <Btn type="success" @click="updateTodo">Confirm</Btn>
        </div>
      </template>
    </Modal>

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
      showAlert: false,
      editTodoForm: {
        show: false,
        todo: {
          id: 0,
          title: "",
        },
      },
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

    showEditTodoForm(id) {
      this.editTodoForm.show = true;
      this.editTodoForm.todo = { ...this.todos.find((todo) => todo.id === id) };
    },

    updateTodo() {
      const todo = this.todos.find(
        (todo) => todo.id === this.editTodoForm.todo.id
      );

      todo.title = this.editTodoForm.todo.title;

      this.editTodoForm.show = false;
    },

    removeTodo(id) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
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
