<template>
  <div v-for="race in races" :key="race.id">
    <Race :raceModel="race" />
    <RouterLink
      :to="{ name: 'bet', params: { raceId: race.id } }"
      class="btn btn-primary"
    >
      Bet on {{ race.name }}
    </RouterLink>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Races',
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import Race from '@/components/Race.vue';
import { RaceModel } from '@/models/RaceModel';
import { useRaceService } from '@/composables/RaceService';

const raceService = useRaceService();
const races = ref<Array<RaceModel>>(await raceService.list());
</script>
