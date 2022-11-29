<template>
  <div v-for="todo in todos" :key="todo.id" class="todo">
    <p>{{ todo.title }}</p>
    <div>
      <button @click="$emit('click', todo.id)" class="btn-remove-todo">
        &times;
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    todos: {
      required: true,
      type: Array,
    },
  },

  emits: ["click"],
};
</script>

<style scoped>
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
  cursor: pointer;
}
</style>
