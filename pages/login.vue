<script lang="ts" setup>
import { useIsLoadingStore } from '~/store/isLoading'
import { useAuthStore } from '~/store/auth.store'
import { v4 as uuid } from 'uuid'

useSeoMeta({
  title: 'Login'
})

const email = ref('')
const password = ref('')
const name = ref('')

const isLoadingStore = useIsLoadingStore()
const authStore = useAuthStore()
const router = useRouter()

const login = async () => {
  isLoadingStore.set(true)
  await account.createEmailPasswordSession(email.value, password.value)
  const response = await account.get()
  
  if (response) {
    authStore.set({
      email: response.email,
      status: response.status,
      name: response.name,
    })
  }
  
  email.value = ''
  password.value = ''
  name.value = ''
  
  await router.push('/')
  isLoadingStore.set(false)
}

const register = async () => {
  await account.create(uuid(), email.value, password.value)
  await login()
}

</script>
<template>
  <div class="flex flex-item justify-center items-center min-h-screen w-full">
    <div class="rounded bg-sidebar w-1/4 p-5 h-max">
      <h1 class="text-2xl font-bold text-center mb-5">login</h1>
      <form>
        <UiInput v-model="email" class="mb-3" placeholder="Email" type="email"/>
        <UiInput v-model="password" class="mb-3" placeholder="Password" type="password"/>
        <UiInput v-model="name" class="mb-3" placeholder="Name" type="text"/>
        <div class="flex items-center justify-center gap-5">
          <UiButton type="button" @click="login">Login</UiButton>
          <UiButton type="button" @click="register">Register</UiButton>
        </div>
      </form>
    </div>
  </div>
</template>
<style scoped>

</style>
