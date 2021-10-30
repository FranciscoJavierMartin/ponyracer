<template>
  <h1>{{ raceModel.name }}</h1>
  <p>{{ startInstant }}</p>
  <RouterLink
    :to="{ name: 'live', params: { raceId: raceModel.id } }"
    class="btn btn-large btn-primary"
  >
    Watch live!
  </RouterLink>
  <Alert
    v-if="betFailed"
    variant="danger"
    dismissible
    @dismissed="betFailed = false"
    >The race is already started or finished</Alert
  >
  <div class="py-2">CLick to bet on your favorite pony</div>
  <div class="row">
    <div
      class="col"
      v-for="pony of raceModel.ponies"
      :key="pony.id"
      :class="{ selected: isPonySelected(pony) }"
    >
      <Pony :ponyModel="pony" @ponySelected="placeOrCancelBet(pony)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, computed, ComputedRef } from 'vue';
import { useRoute } from 'vue-router';
import Pony from '@/components/Pony.vue';
import fromNow from '@/utils/FromNow';
import { useRaceService } from '@/composables/RaceService';
import { RaceModel } from '@/models/RaceModel';
import { PonyModel } from '@/models/PonyModel';

const route = useRoute();
const raceId = +route.params.raceId;

const betFailed: Ref<boolean> = ref<boolean>(false);
const raceService = useRaceService();
const raceModel: Ref<RaceModel> = ref<RaceModel>(await raceService.get(raceId));
const startInstant: ComputedRef<string> = computed<string>(() =>
  fromNow(raceModel.value!.startInstant)
);

function isPonySelected(pony: PonyModel): boolean {
  return pony.id === raceModel.value.betPonyId;
}

async function placeOrCancelBet(pony: PonyModel) {
  betFailed.value = false;
  try {
    if (!isPonySelected(pony)) {
      raceModel.value = await raceService.bet(raceId, pony.id);
    } else {
      await raceService.cancelBet(raceId);
      raceModel.value.betPonyId = null;
    }
  } catch {
    betFailed.value = true;
  }
}
</script>

<style scoped>
.selected {
  border: 3px solid green;
  border-radius: 10px;
}
</style>
