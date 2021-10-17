<template>
  <div>
    <Alert v-if="error" variant="danger" dismissible @dismissed="closeAlert">
      An error occurred while loading.</Alert
    >
    <Race v-for="race in races" :key="race.id" :raceModel="race" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Race from '@/components/Race.vue';
import { RaceModel } from '@/models/RaceModel';
import { useRaceService } from '@/composables/RaceService';

const raceService = useRaceService();
const races = ref<Array<RaceModel>>([]);
const error = ref<boolean>(false);

function closeAlert(): void {
  error.value = false;
}

onMounted(async () => {
  try {
    races.value = await raceService.list();
  } catch {
    error.value = true;
  }
});
</script>
