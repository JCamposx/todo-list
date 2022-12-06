<template>
  <button
    @click.prevent="$emit('click')"
    class="btn"
    :style="{ backgroundColor }"
    v-bind="$attrs"
    :variant="variant"
  >
    <slot />
  </button>
</template>

<script setup>
import {
  useBackgroundColor,
  backgroundColorProps,
} from "../composables/backgroundColor.js";

const props = defineProps({
  ...backgroundColorProps,
});

const backgroundColor = useBackgroundColor(props);

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
