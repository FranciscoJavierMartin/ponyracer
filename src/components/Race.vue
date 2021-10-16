<template>
  <div>
    <h2>{{ raceModel.name }}</h2>
    <p>{{ startInstant }}</p>
    <div class="row">
      <div class="col" v-for="pony in raceModel.ponies" :key="pony.id">
        <Pony :ponyModel="pony" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, PropType } from 'vue';
import Pony from '@/components/Pony.vue';
import { RaceModel } from '@/models/RaceModel';
import fromNow from '@/utils/FromNow';

export default defineComponent({
  components: {
    Pony,
  },
  props: {
    raceModel: {
      type: Object as PropType<RaceModel>,
      required: true,
    },
  },
  setup(props) {
    const startInstant: ComputedRef<string> = computed<string>(() =>
      fromNow(props.raceModel.startInstant)
    );
    return {
      startInstant,
    };
  },
});
</script>
