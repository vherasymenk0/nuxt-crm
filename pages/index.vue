<script lang="ts" setup>
import type { Card, Column } from '~/components/kanban/kanban.types'
import { useKanbanQuery } from '~/components/kanban/useKanbanQuery'
import { numToCurrency } from '~/utils/numToCurrency'
import dayjs from 'dayjs'

useSeoMeta({
  title: 'Home'
})

const dragCard = ref<Card | null>(null)
const sourceColumn = ref<Column | null>(null)
const { data, isLoading, refetch } = useKanbanQuery()

</script>
<template>
  <div class="p-10">
    <h1 class="font-bold text-2xl mb-10">CRM System</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div class="grid grid-cols-5 gap-16">
        <div v-for="(col, idx) in data" :key="col.id">
          <div class="bg-slate-700 rounded py-1 px-5 mb-5 text-center">
            {{ col.name }}
          </div>
          <div>
            <KanbanCreateDeal :refetch="refetch" :status="col.id"/>
            <UiCard v-for="(card, cardIdx) in col.items" :key="card.id+cardIdx" class="mb-3" draggable="true">
              <UiCardHeader role="button">
                <UiCardTitle>{{ card.name }}</UiCardTitle>
                <UiCardDescription class="mt-2 block">{{ numToCurrency(card.price) }}</UiCardDescription>
              </UiCardHeader>
              <UiCardContent class="text-xs">Company {{ card.companyName }}</UiCardContent>
              <UiCardFooter>{{ dayjs(card.$createdAt).format('DD MMMM YYYY') }}</UiCardFooter>
            </UiCard>
          </div>
        </div>
      </div>
    
    </div>
  </div>
</template>
