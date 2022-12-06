<template>
  <form class="add-todo-form">
    <input v-model="todoTitle" type="text" placeholder="Title" />
    <div>
      <Btn
        class="btn"
        variant="success"
        @click="
          $emit('submit', todoTitle);
          todoTitle = '';
        "
      >
        Add
      </Btn>
    </div>
  </form>
</template>

<script setup>
import Btn from "../Btn.vue";
import { ref } from "vue";

const todoTitle = ref("");

defineEmits(["submit"]);
</script>

<style scoped>
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

.btn {
  padding-inline: 15px;
}
</style>
