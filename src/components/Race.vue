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

<script setup lang="ts">
import { computed, ComputedRef, defineProps } from 'vue';
import Pony from '@/components/Pony.vue';
import { RaceModel } from '@/models/RaceModel';
import fromNow from '@/utils/FromNow';

const props: Readonly<{ raceModel: RaceModel }> =
  defineProps<{ raceModel: RaceModel }>();
const startInstant: ComputedRef<string> = computed<string>(() =>
  fromNow(props.raceModel.startInstant)
);
</script>
