<template>
  <nav class="navbar navbar-expand-md navbar-light bg-light">
    <div class="container-fluid">
      <RouterLink to="/" class="navbar-brand">PonyRacer</RouterLink>
      <button type="button" class="navbar-toggler" @click="toggleNavbar">
        <span class="navbar-toggler-icon" />
      </button>
      <div
        id="navbar"
        class="navbar-collapse"
        :class="{ collapse: navbarCollapsed }"
      >
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <RouterLink to="/races" class="nav-link">Races</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';

const navbarCollapsed: Ref<boolean> = ref<boolean>(true);

function toggleNavbar(): void {
  navbarCollapsed.value = !navbarCollapsed.value;
}
</script>
