<script lang="ts" setup>
import { useMutation, useQuery } from '@tanstack/vue-query'
import { v4 as uuid } from 'uuid'
import { COLLECTION_CUSTOMERS, DB_ID, STORAGE_ID } from '~/app.constants'
import type { Customer } from '~/components/types/deals.types'

interface InputFileEvent extends Event {
  target: HTMLInputElement
}

interface CustomerFormState
  extends Pick<Customer, 'avatar_url' | 'email' | 'name' | 'from_source'> {}

useSeoMeta({
  title: `Редактирование компании`,
})

const route = useRoute()
const customerId = route.params.id as string

const { handleSubmit, defineField, setFieldValue, setValues, values } =
  useForm<CustomerFormState>()

const { data, isSuccess } = useQuery({
  queryKey: ['get customer', customerId],
  queryFn: () => DB.getDocument(DB_ID, COLLECTION_CUSTOMERS, customerId),
})

watch(isSuccess, () => {
  const initialData = data.value as unknown as CustomerFormState
  setValues({
    email: initialData.email,
    avatar_url: initialData.avatar_url,
    from_source: initialData.from_source || '',
    name: initialData.name,
  })
})

const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')
const [fromSource, fromSourceAttrs] = defineField('from_source')

const { mutate, isPending } = useMutation({
  mutationKey: ['update customer', customerId],
  mutationFn: (data) =>
    DB.updateDocument(DB_ID, COLLECTION_CUSTOMERS, customerId, data),
})

const { mutate: uploadImage, isPending: isUploadImagePending } = useMutation({
  mutationKey: ['upload image'],
  mutationFn: (file: File) => storage.createFile(STORAGE_ID, uuid(), file),
  onSuccess(data) {
    const response = storage.getFileDownload(STORAGE_ID, data.$id)
    setFieldValue('avatar_url', response.href)
  },
})

const onSubmit = handleSubmit(values => {
  mutate(values)
})
</script>

<template>
  <div class="p-10">
    <h1 class="font-bold text-2xl mb-10">
      Edit {{ (data as unknown as CustomerFormState)?.name }}
    </h1>
    
    <form class="form" @submit="onSubmit">
      <UiInput
        v-model="name"
        class="input"
        placeholder="Наименование"
        type="text"
        v-bind="nameAttrs"
      />
      
      <UiInput
        v-model="email"
        class="input"
        placeholder="Email"
        type="text"
        v-bind="emailAttrs"
      />
      <UiInput
        v-model="fromSource"
        class="input"
        placeholder="Откуда пришел?"
        type="text"
        v-bind="fromSourceAttrs"
      />
      
      <img
        v-if="values.avatar_url || isUploadImagePending"
        :src="values.avatar_url"
        alt=""
        class="rounded-full my-4"
        height="50"
        width="50"
      />
      <div class="grid w-full max-w-sm items-center gap-1.5 input">
        <label>
          <span class="text-sm mb-2">Logo</span>
          <UiInput
            :disabled="isUploadImagePending"
            :onchange="(e:InputFileEvent) => e?.target?.files?.length && uploadImage(e.target.files?.[0])"
            type="file"
          />
        </label>
      </div>
      
      <UiButton :disabled="isPending" class="mt-3" variant="secondary">
        {{ isPending ? 'Загрузка...' : 'Сохранить' }}
      </UiButton>
    </form>
  </div>
</template>

<style scoped>
.input {
  @apply border-[#161c26] mb-4 placeholder:text-[#748092] focus:border-border transition-colors;
}
</style>
