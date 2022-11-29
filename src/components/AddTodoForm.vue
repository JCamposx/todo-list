<template>
  <form class="add-todo-form">
    <input v-model="todoTitle" type="text" placeholder="Title" />
    <div>
      <button
        @click.prevent="
          $emit('submit', todoTitle);
          todoTitle = '';
        "
      >
        Add
      </button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      todoTitle: "",
    };
  },

  emits: ["submit"],
};
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

.add-todo-form button {
  background: var(--accent-color);
  color: var(--text-color);
  padding-inline-start: 15px;
  padding-inline-end: 15px;
  height: 35px;
  cursor: pointer;
}
</style>
