<script setup lang="ts">
import { ref } from 'vue'

const showMenu = ref(false)

const accountName =  ref('Учетная запись')

</script>
<template>
    <header class="header">
        <div class="container">
          <div class="logo">
              <h1 class="text-blue-500">N E T G R A P H</h1>
              <img src="../assets/netgraph_logo.svg" alt="Netgraph Logo" class="logo-image">
              <span class="text-gray-400">v0.0.2</span>
          </div>
          <div class="right-side">
              <div class="emails">
              <a href="mailto:chinya@tvsi.ru">chinya@tvsi.ru</a>
              <br />
              <a href="mailto:bodaral17r85@gmail">bodaral17r85@gmail</a>
              </div>
              <div class="account-menu">
              <button @click="showMenu = !showMenu">
                  {{ accountName }}
              </button>
              <ul v-if="showMenu">
                  <li><a href="#">Настройки профиля</a></li>
                  <li><a href="#">Выйти</a></li>
              </ul>
              </div>
          </div>
        </div>
    </header>
  </template>

<style scoped>
.header {
  background-color: #1c1c1c;
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.container {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
.logo {
  display: flex;
  align-items: center;
}
.logo h1 {
  font-size: 1.5rem;
}
.right-side {
  display: flex;
  align-items: center;
}
.emails {
  margin-right: 20px;
}
.emails a {
  color: white;
  text-decoration: none;
}
.account-menu button {
  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;
}
.account-menu ul {
  background-color: white;
  color: black;
  position: absolute;
  top: 100%;
  right: 0;
  margin: 0;
  padding: 10px;
  list-style: none;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}
.account-menu li {
  padding: 5px 0;
}
.account-menu a {
  color: black;
  text-decoration: none;
}
.logo-image {
  margin-left: 10px; /* Пространство между лого и "Netgraph" */
  width: auto; /* Автоматически подбирает ширину */
  max-height: 2.3rem; /* Максимальная высота, чтобы логотип не был больше текста */
}
</style>