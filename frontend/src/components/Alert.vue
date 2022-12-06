<template>
  <div v-if="show" class="alert" :style="{ backgroundColor }">
    <div>{{ message }}</div>
    <div @click="$emit('close')" class="close-alert">&times;</div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  show: {
    required: true,
    type: Boolean,
  },
  message: {
    required: true,
    type: String,
  },
  variant: {
    required: false,
    default: "danger",
    validator(value) {
      return ["danger", "warning", "info"].includes(value);
    },
  },
});

const backgroundColor = computed(() => {
  const options = {
    danger: "var(--danger-color)",
    warning: "var(--warning-color)",
    info: "var(--info-color)",
  };

  return options[props.variant];
});

defineEmits(["close"]);
</script>

<style scoped>
.alert {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  margin-bottom: 20px;
  padding-inline: 25px;
  height: 50px;
}

.close-alert {
  font-size: 30px;
  cursor: pointer;
}
</style>
