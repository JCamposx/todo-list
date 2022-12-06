<template>
  <Modal :show="show" @close="$emit('close')">
    <template #header>
      <h2>Edit todo</h2>
    </template>

    <template #body>
      <form class="edit-todo-modal-form">
        <label>Todo title</label>
        <input
          type="text"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
        />
      </form>
    </template>

    <template #footer>
      <div class="edit-todo-modal-footer">
        <Btn variant="secondary" @click="$emit('close')"> Close </Btn>
        <Btn variant="success" @click="$emit('submit')">Confirm</Btn>
      </div>
    </template>
  </Modal>
</template>

<script setup>
import Btn from "../Btn.vue";
import Modal from "../Modal.vue";

defineProps(["modelValue", "show"]);

defineEmits(["close", "submit", "update:modelValue"]);
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
</style>
