<template>
  <div v-for="todo in todos" :key="todo.id" class="todo">
    <p>{{ todo.title }}</p>
    <div>
      <Btn type="secondary" @click="$emit('edit', todo.id)" class="btn-edit">
        <Pencil />
      </Btn>

      <Btn type="danger" @click="$emit('remove', todo.id)" class="btn-remove">
        &times;
      </Btn>
    </div>
  </div>
</template>

<script>
import Btn from "./Btn.vue";
import Pencil from "./icons/Pencil.vue";

export default {
  components: { Btn, Pencil },

  props: {
    todos: {
      required: true,
      type: Array,
    },
  },
  emits: ["remove", "edit"],
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

.btn-edit {
  width: 28px;
  height: 28px;
  font-size: 22px;
}

.btn-remove {
  width: 28px;
  height: 28px;
  font-size: 22px;
}
</style>
