<template>
  <nav class="navbar">
    <img class="logo" src="@/assets/logo.svg" alt="Logo" width="32" />
    <div>Todo List App</div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  background: var(--dark-color);
  padding: 15px;
  padding-inline: 20px;
  margin-bottom: 40px;
}

.logo {
  padding-inline-end: 8px;
}
</style>
