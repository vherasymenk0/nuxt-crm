<script lang="ts" setup>
import { useAuthStore } from '~/store/auth.store'
import { useIsLoadingStore } from '~/store/isLoading'

const authStore = useAuthStore()
const isLoadingStore = useIsLoadingStore()
const router = useRouter()
const logout = async () => {
  isLoadingStore.set(true)
  await account.deleteSession('current')
  authStore.clear()
  await router.push('/login')
  isLoadingStore.set(false)
}
</script>
<template>
  <aside class="px-5 py-8 bg-sidebar h-full w-full relative">
    <NuxtLink class="mb-10 block" to="/">
      <NuxtImg alt="Logo" class="mx-auto mt-4" src="/logo.svg" width="140px"/>
      <button class="absolute top-2 right-3 transition-colors hover:text-primary" @click="logout">
        <Icon name="line-md:logout" size="20px"/>
      </button>
    </NuxtLink>
    <LayoutMenu/>
  </aside>
</template>
