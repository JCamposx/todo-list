<template>
  <div v-if="show" class="alert" :style="{ backgroundColor }">
    <div>{{ message }}</div>
    <div @click="$emit('close')" class="close-alert">&times;</div>
  </div>
</template>

<script setup>
import {
  useBackgroundColor,
  backgroundColorProps,
} from "../composables/backgroundColor.js";

const props = defineProps({
  ...backgroundColorProps,
  show: {
    required: true,
    type: Boolean,
  },
  message: {
    required: true,
    type: String,
  },
});

const backgroundColor = useBackgroundColor(props);

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
