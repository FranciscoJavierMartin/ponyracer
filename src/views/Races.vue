<template>
  <Race v-for="race in races" :key="race.id" :raceModel="race" />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import Race from '@/components/Race.vue';
import { RaceModel } from '@/models/RaceModel';
import { useRaceService } from '@/composables/RaceService';

export default defineComponent({
  components: {
    Race,
  },
  setup() {
    const raceService = useRaceService();

    onMounted(async () => {
      races.value = await raceService.list();
    });

    const races = ref<Array<RaceModel>>([]);

    return {
      races,
    };
  },
});
</script>
