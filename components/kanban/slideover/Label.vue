<script lang="ts" setup>
withDefaults(defineProps<{ text?: string }>(), { text: '' })
</script>

<template>
  <div class="mb-3">
    <label v-if="text" class="opacity-75 mb-0.5 block text-xxs">
      {{ text }}
    </label>
    <div class="text-base">
      <slot/>
    </div>
  </div>
</template>
