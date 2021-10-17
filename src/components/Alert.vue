<template>
  <div :class="alertClasses">
    <slot />
    <button
      v-if="dismissible"
      type="button"
      class="btn-close"
      aria-label="Close"
      @click="dismiss"
    ></button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ComputedRef, computed } from 'vue';
const props = defineProps<{
  variant:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark';
  dismissible?: boolean;
}>();
const emit = defineEmits<{ (e: 'dismissed'): void }>();

const alertClasses: ComputedRef<string> = computed<string>(
  () => `alert alert-${props.variant}`
);

function dismiss(): void {
  emit('dismissed');
}
</script>
