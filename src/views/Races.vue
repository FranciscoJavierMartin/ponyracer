<template>
  <div>
    <Race v-for="race in races" :key="race.id" :raceModel="race" />
    <div class="alert alert-danger" v-if="error">
      An error occurred while loading.
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        @click="closeAlert"
      />
    </div>
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
