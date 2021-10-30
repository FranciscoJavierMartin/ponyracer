<template>
  <Alert v-if="error" variant="danger">
    A problem occurred during the live.
  </Alert>
  <h1>{{ raceModel.name }}</h1>
  <div v-if="raceModel.status === 'FINISHED'">
    <div v-if="!winners.length">The race is over.</div>
    <div v-else>
      <Alert v-if="betWon" variant="success">You won your bet!</Alert>
      <Alert v-else-if="raceModel.betPonyId && !betWon" variant="warning">
        You lost your bet.
      </Alert>
      <div>Most Valuable Ponies</div>
      <div class="row">
        <div
          class="col"
          v-for="winner of winners"
          :key="winner.id"
          :class="{ selected: winner.id === raceModel.betPonyId }"
        >
          <Pony :ponyModel="winner" />
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="raceModel.status === 'PENDING'">
    <p>The race will start {{ startInstant }}</p>
    <div class="row">
      <div
        class="col"
        v-for="pony of raceModel.ponies"
        :key="pony.id"
        :class="{ selected: pony.id === raceModel.betPonyId }"
      >
        <Pony :ponyModel="pony" />
      </div>
    </div>
  </div>
  <div v-else-if="raceModel.status === 'RUNNING'">
    <div style="margin-left: 95%; margin-bottom: 5px">
      <span class="fa flag" style="font-size: x-large" />
    </div>
    <div style="width: 95%; border-right: 3px dotted lightgray">
      <div
        v-for="pony of runningPonies"
        :key="pony.id"
        :style="{ marginLeft: `${pony.position - 5}%` }"
        :class="{ selected: pony.id === raceModel.betPonyId }"
        style="transition: all linear 1s"
      >
        <Pony :ponyModel="pony" isRunning />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ComputedRef, onUnmounted, ref, Ref } from 'vue';
import { useRoute } from 'vue-router';
import Pony from '@/components/Pony.vue';
import fromNow from '@/utils/FromNow';
import { Connection, useWsService } from '@/composables/WsService';
import { useRaceService } from '@/composables/RaceService';
import { LiveRaceModel, RaceModel } from '@/models/RaceModel';
import { PonyWithPositionModel } from '@/models/PonyModel';

let connection: Connection | null = null;
onUnmounted(() => connection?.disconnect());

const raceService = useRaceService();
const route = useRoute();
const raceId = +route.params.raceId;
const raceModel: Ref<RaceModel> = ref<RaceModel>(await raceService.get(raceId));
const startInstant: ComputedRef<string> = computed<string>(() =>
  fromNow(raceModel.value.startInstant)
);

const runningPonies: Ref<Array<PonyWithPositionModel>> = ref<
  Array<PonyWithPositionModel>
>([]);
const winners: ComputedRef<Array<PonyWithPositionModel>> = computed<
  Array<PonyWithPositionModel>
>(() => runningPonies.value.filter((pony) => pony.position >= 100));
const betWon: ComputedRef<boolean> = computed<boolean>(
  () =>
    raceModel.value.status === 'FINISHED' &&
    winners.value.some((pony) => pony.id === raceModel.value.betPonyId)
);

const wsService = useWsService();
const error: Ref<boolean> = ref<boolean>(false);

if (raceModel.value.status !== 'FINISHED') {
  try {
    connection = wsService.connect<LiveRaceModel>(
      `/race/${raceId}`,
      (liveRace: LiveRaceModel) => {
        runningPonies.value = liveRace.ponies;
        raceModel.value.status = liveRace.status;
        if (raceModel.value.status === 'FINISHED') {
          connection!.disconnect();
        }
      }
    );
  } catch {
    error.value = true;
  }
}
</script>

<style scoped>
.selected {
  border-left: 3px solid green;
}
</style>
