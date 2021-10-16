<template>
  <h2>{{ raceModel.name }}</h2>
  <p>{{ startInstant }}</p>
  <ul>
    <li v-for="pony in raceModel.ponies" :key="pony.id">{{ pony.name }}</li>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { RaceModel } from '@/models/RaceModel';
import fromNow from '@/utils/FromNow';

export default defineComponent({
  props: {
    raceModel: {
      type: Object as PropType<RaceModel>,
      required: true
    }
  },
  setup(props) {
    const startInstant = computed<string>(() => fromNow(props.raceModel.startInstant));
    return {
      startInstant
    };
  }
});
</script>
