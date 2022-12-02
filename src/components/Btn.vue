<template>
  <button @click.prevent="$emit('click')" :style="{ backgroundColor }">
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    type: {
      required: false,
      default: "danger",
      validator(value) {
        const options = ["danger", "warning", "info", "success", "secondary"];

        return options.includes(value);
      },
    },
  },

  computed: {
    backgroundColor() {
      const options = {
        danger: "var(--danger-color)",
        warning: "var(--warning-color)",
        info: "var(--info-color)",
        success: "var(--accent-color)",
        secondary: "var(--secondary-color)",
      };

      return options[this.type];
    },
  },

  emits: ["click"],
};
</script>

<style scoped>
button {
  color: var(--text-color);
  border: none;
  height: 35px;
  cursor: pointer;
  margin-inline-start: 10px;
}
</style>
