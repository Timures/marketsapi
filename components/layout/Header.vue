<script lang="ts" setup></script>

<template>
  <header class="header">
    <div class="container">
      <div class="logo"><img src="/img/logo.svg" alt="MarketsAPI" /></div>
      <div class="toggle-menu btn btn-grey" title="Меню">
        <svg width="24" height="24">
          <use xlink:href="/img/sprite.svg#menu"></use>
        </svg>
      </div>
      <div class="menu-fader"></div>
      <nav class="menu">
        <ul>
          <li>
            <a class="btn btn-grey btn-small" href="#"
              ><span>Endpoints / Методы</span></a
            >
          </li>
          <li>
            <a class="btn btn-grey btn-small" href="#"><span>Цены</span></a>
          </li>
          <li>
            <a class="btn btn-grey btn-small" href="#"
              ><span>Поддержка</span></a
            >
          </li>
        </ul>
        <ul>
          <li>
            <a class="btn btn-grey btn-small" href="#"
              ><span>Войти в кабинет</span></a
            >
          </li>
        </ul>
      </nav>
      <!-- end .menu-->
    </div>
    <!-- end .container-->
  </header>
  <!-- end .header-->
</template>
