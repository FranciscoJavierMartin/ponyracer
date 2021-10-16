<template>
  <h2>{{ raceModel.name }}</h2>
  <ul>
    <li v-for="pony in raceModel.ponies" :key="pony.id">{{ pony.name }}</li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { RaceModel } from '@/models/RaceModel';

export default defineComponent({
  props: {
    raceModel: {
      type: Object as PropType<RaceModel>,
      required: true
    }
  }
});
</script>
