<script lang="ts" setup>
</script>
<template>
  <aside class="px-5 py-8 bg-sidebar h-full w-full relative">
    <NuxtLink class="mb-10 block" to="/">
      <NuxtImg class="mx-auto mt-4" src="/logo.svg" width="140px"/>
      <button class="absolute top-2 right-3 transition-colors hover:text-primary">
        <Icon name="line-md:logout" size="20px"/>
      </button>
    </NuxtLink>
    <LayoutMenu/>
  </aside>
</template>
