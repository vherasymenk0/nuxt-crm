<script lang="ts" setup>
import { useIsLoadingStore } from '~/store/isLoading'
import { useAuthStore } from '~/store/auth.store'

const isLoadingStore = useIsLoadingStore()
const authStore = useAuthStore()
const router = useRouter()

onMounted(async () => {
  try {
    const user = await account.get()
    if (user) authStore.set(user)
  } catch (e) {
    await router.push('/login')
  } finally {
    isLoadingStore.set(false)
  }
})
</script>

<template>
  <LayoutLoader v-if="isLoadingStore.isLoading"/>
  <section v-else :class="{'grid grid-cols-[1fr_6fr]': authStore.isAuth}" class="max-h-screen">
    <LayoutSidebar v-if="authStore.isAuth"/>
    <div>
      <slot/>
    </div>
  </section>
</template>
