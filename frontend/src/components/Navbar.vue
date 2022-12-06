<template>
  <nav class="navbar">
    <div class="logo">
      <img src="@/assets/logo.svg" alt="Logo" width="32" />
      <div>Todo List App</div>
    </div>

    <div class="links">
      <ul>
        <li><RouterLink to="/">Home</RouterLink></li>
        <li><RouterLink to="/about">About</RouterLink></li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--dark-color);
  padding: 15px;
  padding-inline: 20px;
  margin-bottom: 40px;
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  padding-inline-end: 8px;
}

.links ul {
  display: flex;
  align-items: center;
  list-style: none;
}

.links a {
  font-size: 16px;
  padding-inline-start: 15px;
  text-decoration: none;
  color: var(--text-color);
}

a.router-link-active {
  color: var(--accent-color);
}

@media (max-width: 680px) {
  .navbar {
    display: block;
  }

  .links ul {
    padding: 0;
    padding-top: 10px;
  }
}
</style>
