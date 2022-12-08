<template>
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
    <Todo :todos="todos" @edit="editTodo" @remove="removeTodo" />
  </section>
</template>

<script setup>
import Alert from "@/components/Alert.vue";
import Spinner from "@/components/Spinner.vue";
import Todo from "@/components/Todo.vue";
import AddTodoForm from "@/components/TodoForm/AddTodoForm.vue";
import { useFetch } from "@/composables/fetch.js";
import axios from "axios";
import { onMounted, ref } from "vue";
import { onBeforeRouteLeave, useRouter } from "vue-router";
import { alertData, useShowAlert } from "../composables/showAlert.js";

const alert = alertData;
const isAnyError = ref(false);

const router = useRouter();

const {
  data: todos,
  isLoading,
  flashMessage,
} = useFetch("/api/todos", {
  onError: () => useShowAlert("Failed loading todos"),
});

async function addTodo(title) {
  if (title === "") {
    useShowAlert(alert, "Todo title is required");
    return;
  }

  const res = await axios.post("api/todos", {
    title: title,
  });

  todos.value.push(res.data);

  alert.show = false;
}

async function removeTodo(id) {
  await axios.delete(`api/todos/${id}`);

  todos.value = todos.value.filter((todo) => todo.id !== id);

  useShowAlert(alert, "Todo removed successfully");
}

function editTodo(id) {
  router.push(`/todos/${id}/edit`);
}

onMounted(() => {
  if (flashMessage !== null) {
    useShowAlert(alert, "Todo title updated successfully", "info");
  }
});

onBeforeRouteLeave(() => {
  alert.show = false;
});
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
