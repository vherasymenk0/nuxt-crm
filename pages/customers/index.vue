<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query'
import { COLLECTION_CUSTOMERS, DB_ID } from '~/app.constants'
import type { Customer } from '~/components/types/deals.types'

useSeoMeta({
  title: 'CRM System',
})

const { data, isLoading } = useQuery<Customer[]>({
  queryKey: ['customers'],
  queryFn: () => DB.listDocuments(DB_ID, COLLECTION_CUSTOMERS) as unknown as Customer[],
})

</script>

<template>
  <div class="p-10">
    <h1 class="font-bold text-2xl mb-10">Our clients</h1>
    <div v-if="isLoading">Loading...</div>
    <UiTable v-else>
      <UiTableHeader>
        <UiTableRow>
          <UiTableHead class="w-[100px]">Image</UiTableHead>
          <UiTableHead class="w-[200px]">Name</UiTableHead>
          <UiTableHead class="w-[200px]">Email</UiTableHead>
          <UiTableHead>Source</UiTableHead>
        </UiTableRow>
      </UiTableHeader>
      <UiTableBody>
        <UiTableRow
          v-for="customer in data.documents"
          :key="customer.$id"
        >
          <UiTableCell>
            <NuxtLink :href="`/customers/edit/${customer.$id}`">
              <NuxtImg
                :alt="customer.name"
                :src="customer.avatar_url"
                class="rounded-full"
                height="50"
                width="50"
              />
            </NuxtLink>
          </UiTableCell>
          <UiTableCell class="font-medium">
            {{ customer.name }}
          </UiTableCell>
          <UiTableCell>{{ customer.email }}</UiTableCell>
          <UiTableCell>{{ customer.from_source }}</UiTableCell>
        </UiTableRow>
      </UiTableBody>
    </UiTable>
  </div>
</template>
