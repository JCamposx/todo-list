<template>
  <button
    @click.prevent="$emit('click')"
    class="btn"
    :style="{ backgroundColor }"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  variant: {
    required: false,
    default: "danger",
    validator(value) {
      const options = ["danger", "warning", "info", "success", "secondary"];

      return options.includes(value);
    },
  },
});

const backgroundColor = computed(() => {
  const options = {
    danger: "var(--danger-color)",
    warning: "var(--warning-color)",
    info: "var(--info-color)",
    success: "var(--accent-color)",
    secondary: "var(--secondary-color)",
  };

  return options[props.variant];
});

defineEmits(["click"]);
</script>

<style scoped>
.btn {
  color: var(--text-color);
  border: none;
  height: 35px;
  cursor: pointer;
  margin-inline-start: 10px;
}
</style>
