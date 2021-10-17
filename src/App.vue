<template>
  <Navbar />
  <main class="container" style="margin-top: 70px">
    <h1>Ponyracer</h1>
    <Alert v-if="error" variant="danger">
      An error occurred while loading.
    </Alert>
    <Suspense v-else>
      <Races />
      <template #fallback>Loading...</template>
    </Suspense>
  </main>
</template>

<script setup lang="ts">
import { onErrorCaptured, Ref, ref } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Races from '@/views/Races.vue';

const error: Ref<boolean> = ref<boolean>(false);
onErrorCaptured(() => {
  error.value = true;
  return false;
});
</script>

<style>
@import '~bootstrap/dist/css/bootstrap.min.css';
@import '~font-awesome/css/font-awesome.min.css';
</style>
