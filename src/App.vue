<template>
  <nav class="navbar">
    <img class="logo" src="./assets/logo.svg" alt="Logo" width="32" />
    <div>Todo List App</div>
  </nav>

  <main class="container">
    <section>
      <form class="add-todo-form">
        <input type="text" placeholder="Title" />
        <div>
          <button>Add</button>
        </div>
      </form>
    </section>

    <section>
      <div class="todo">
        <p>Todo 1</p>
        <div>
          <button class="btn-remove-todo">&times;</button>
        </div>
      </div>
    </section>
  </main>
</template>

<script></script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  background: var(--navbar-color);
  padding: 15px;
  padding-inline: 20px;
  margin-bottom: 40px;
}

.logo {
  padding-inline-end: 8px;
}

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
}

.todo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--navbar-color);
  padding-inline: 25px;
  border-radius: 5px;
  height: 60px;
  margin-top: 15px;
  border-radius: 10px;
}

.btn-remove-todo {
  width: 28px;
  height: 28px;
  font-size: 22px;
  background: var(--danger-color);
  color: var(--text-color);
}
</style>
