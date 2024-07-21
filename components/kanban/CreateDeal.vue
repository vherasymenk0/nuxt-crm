<script lang="ts" setup="">
import { useMutation } from '@tanstack/vue-query'
import { v4 as uuid } from 'uuid'
import { COLLECTION_DEALS, DB_ID } from '~/app.constants'
import type { Deal } from '~/components/types/deals.types'

interface DealFormState extends Pick<Deal, 'name' | 'price'> {
  customer: {
    email: string
    name: string
  }
  status: string
}

interface Props {
  status: string
  refetch?: () => void
}

const props = defineProps<Props>()

const { handleSubmit, defineField, handleReset } = useForm<DealFormState>({
  initialValues: {
    status: props.status,
  },
})
const isOpenForm = ref(false)
const [name, nameAttrs] = defineField('name')
const [price, priceAttrs] = defineField('price')
const [customerEmail, customerEmailAttrs] = defineField('customer.email')
const [customerName, customerNameAttrs] = defineField('customer.name')

const { mutate, isPending } = useMutation({
  mutationKey: ['create a new deal'],
  mutationFn: (data) =>
    DB.createDocument(DB_ID, COLLECTION_DEALS, uuid(), data),
  onSuccess() {
    props.refetch?.()
    handleReset()
  },
})

const onSubmit = handleSubmit(values => {
  const dto = {
    ...values,
    price: Number(price.value),
  }
  mutate(dto)
})
</script>

<template>
  <div class="text-center mb-2">
    <button
      class="transition-all opacity-20 hover:opacity-100 hover:text-[#a252c8]"
      @click="isOpenForm = !isOpenForm"
    >
      <Icon
        v-if="isOpenForm"
        class="fade-in-100 fade-out-0"
        name="radix-icons:arrow-up"
        size="35"
      />
      <Icon
        v-else
        class="fade-in-100 fade-out-0"
        name="radix-icons:plus-circled"
        size="35"
      />
    </button>
  </div>
  <form v-if="isOpenForm" class="form" @submit="onSubmit">
    <UiInput
      v-model="name"
      class="input"
      placeholder="Name"
      type="text"
      v-bind="nameAttrs"
    />
    <UiInput
      v-model="price"
      class="input"
      placeholder="Cost"
      type="text"
      v-bind="priceAttrs"
    />
    <UiInput
      v-model="customerEmail"
      class="input"
      placeholder="Email"
      type="text"
      v-bind="customerEmailAttrs"
    />
    <UiInput
      v-model="customerName"
      class="input"
      placeholder="Company"
      type="text"
      v-bind="customerNameAttrs"
    />
    
    <button :disabled="isPending" class="btn">
      {{ isPending ? 'Loading...' : 'Add' }}
    </button>
  </form>
</template>

<style scoped>
.input {
  @apply border-[#161c26] mb-2 placeholder:text-[#748092] focus:border-border transition-colors;
}

.btn {
  @apply text-xs border py-1 px-2 rounded border-[#161c26] hover:border-[#482c65] transition-colors text-[#aebed5] hover:text-white;
}

.form {
  @apply mb-3 block;
  animation: show 0.3s ease-in-out;
}

@keyframes show {
  from {
    @apply border-[#a252c83d];
    transform: translateY(-35px);
    opacity: 0.4;
  }
  90% {
    @apply border-[#a252c83d];
  }
  to {
    @apply border-transparent;
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
