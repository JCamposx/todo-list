<template>
  <Spinner v-if="isLoading" />

  <Alert
    :show="alert.show"
    :message="alert.message"
    :variant="alert.variant"
    @close="alert.show = false"
  />

  <div v-if="todo !== null" class="form">
    <h1>Edit todo</h1>
    <form>
      <label>Todo title</label>
      <input type="text" v-model="todo.title" />

      <div class="submit">
        <Btn variant="secondary" @click="$router.go(-1)">Cancel</Btn>
        <Btn variant="success" @click="submit">Submit</Btn>
      </div>
    </form>
  </div>
</template>

<script setup>
import Alert from "@/components/Alert.vue";
import Btn from "@/components/Btn.vue";
import Spinner from "@/components/Spinner.vue";
import { useFetch } from "@/composables/fetch.js";
import axios from "axios";
import { alertData, useShowAlert } from "../composables/showAlert.js";

const props = defineProps(["id"]);

const alert = alertData;

const { data: todo, isLoading } = useFetch(`/api/todos/${props.id}`, {
  onError: () => useShowAlert(alert, "Failed loading todos"),
});

async function submit() {
  if (todo.value.title === "") {
    useShowAlert(alert, "Todo title is required");
    return;
  }

  try {
    await axios.put(`/api/todos/${todo.value.id}`, {
      title: todo.value.title,
    });
    useShowAlert(alert, "Todo title updated successfully", "info");
  } catch (e) {
    useShowAlert(alert, "Failed updating todo");
  }
}
</script>

<style scoped>
.form {
  background-color: var(--dark-color);
  border-radius: 5px;
  padding: 30px;
}

.form h1 {
  margin-top: 0px;
}

.form form input {
  width: 97%;
  border: none;
  border-radius: 5px;
  padding-inline: 10px;
  height: 35px;
  margin-top: 10px;
}

.submit {
  display: flex;
  justify-content: center;
  align-items: cneter;
  margin-top: 25px;
}
</style>
