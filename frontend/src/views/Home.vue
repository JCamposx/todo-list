<template>
  <EditTodoForm
    :show="editTodoForm.show"
    @close="editTodoForm.show = false"
    @submit="updateTodo"
    v-model="editTodoForm.todo.title"
  />

  <Alert
    :show="alert.show"
    :message="alert.message"
    :variant="alert.variant"
    @close="alert.show = false"
  />

  <section>
    <AddTodoForm @submit="addTodo" />
  </section>

  <section>
    <Spinner v-if="isLoading" />
  </section>

  <section v-if="todos === null"></section>
  <section v-else-if="todos.length === 0 && !isAnyError">
    <div class="no-todo">
      <p>You don't have any todo</p>
    </div>
  </section>
  <section v-else>
    <Todo :todos="todos" @edit="showEditTodoForm" @remove="removeTodo" />
  </section>
</template>

<script setup>
import AddTodoForm from "@/components/TodoForm/AddTodoForm.vue";
import Alert from "@/components/Alert.vue";
import Spinner from "@/components/Spinner.vue";
import Todo from "@/components/Todo.vue";
import axios from "axios";
import EditTodoForm from "@/components/TodoForm/EditTodoForm.vue";
import { reactive, ref } from "vue";
import { useFetch } from "@/composables/fetch.js";

const alert = reactive({
  show: false,
  message: "",
  variant: "danger",
});
const isAnyError = ref(false);
const editTodoForm = reactive({
  show: false,
  todo: {
    id: 0,
    title: "",
  },
});

const { data: todos, isLoading } = useFetch("/api/todos", {
  onError: () => showAlert("Failed loading todos"),
});

async function addTodo(title) {
  if (title === "") {
    showAlert("Todo title is required");
    return;
  }

  const res = await axios.post("api/todos", {
    title: title,
  });

  todos.value.push(res.data);

  alert.show = false;
}

async function updateTodo() {
  await axios.put(`api/todos/${editTodoForm.todo.id}`, {
    title: editTodoForm.todo.title,
  });

  const todo = todos.value.find((todo) => todo.id === editTodoForm.todo.id);
  todo.title = editTodoForm.todo.title;

  editTodoForm.show = false;
}

async function removeTodo(id) {
  await axios.delete(`api/todos/${id}`);

  todos.value = todos.value.filter((todo) => todo.id !== id);
}

function showEditTodoForm(id) {
  editTodoForm.show = true;
  editTodoForm.todo = { ...todos.value.find((todo) => todo.id === id) };
}

function showAlert(message, type = "danger") {
  alert.show = true;
  alert.message = message;
  alert.type = type;
}
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
