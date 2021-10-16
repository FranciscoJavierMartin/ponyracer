<template>
  <figure @click="clicked">
    <img :src="ponyImageUrl" :alt="ponyModel.name" />
    <figcaption>{{ ponyModel.name }}</figcaption>
  </figure>
</template>

<script setup lang="ts">
import { computed, ComputedRef, defineProps, defineEmits } from 'vue';
import { PonyModel } from '@/models/PonyModel';

const props: Readonly<{ ponyModel: PonyModel }> =
  defineProps<{ ponyModel: PonyModel }>();
const emit = defineEmits<{ (e: 'ponySelected'): void }>();

const ponyImageUrl: ComputedRef<string> = computed<string>(
  () => `/images/pony-${props.ponyModel.color.toLowerCase()}.gif`
);

function clicked(): void {
  emit('ponySelected');
}
</script>

<style scoped>
figure {
  margin: 3px;
  padding: 3px;
  font-size: 12px;
}

img {
  height: 50px;
}
</style>
