<template>
  <div>
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

onMounted(async () => {
  races.value = await raceService.list();
});
</script>
