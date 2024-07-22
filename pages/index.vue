<script lang="ts" setup>
import type { Card, Column } from '~/components/kanban/kanban.types'
import { useKanbanQuery } from '~/components/kanban/useKanbanQuery'
import { numToCurrency } from '~/utils/numToCurrency'
import dayjs from 'dayjs'
import { useMutation } from '@tanstack/vue-query'
import { COLLECTION_DEALS, DB_ID } from '~/app.constants'
import type { EnumStatus } from '~/components/types/deals.types'
import type { DefaultError } from '@tanstack/query-core'
import { generateColumnGradient } from '~/components/kanban/generate-gradient'
import { useSlideover } from '~/components/kanban/slideover/useSlideover'

useSeoMeta({
  title: 'Home'
})

type TypeMutationVariables = {
  docId: string
  status?: EnumStatus
}

const dragCardRef = ref<Card | null>(null)
const sourceColumnRef = ref<Column | null>(null)
const { data, isLoading, refetch } = useKanbanQuery()
const { set } = useSlideover()


const { mutate } = useMutation<any, DefaultError, TypeMutationVariables>({
  mutationKey: ['move card'],
  mutationFn: (data) =>
    DB.updateDocument(DB_ID, COLLECTION_DEALS, data.docId, { status: data.status }),
  onSuccess: () => {
    refetch()
  },
})

function handleDragStart(card: Card, column: Column) {
  dragCardRef.value = card
  sourceColumnRef.value = column
}

function handleDragOver(event: DragEvent) {
  event.preventDefault()
}

function handleDrop(targetColumn: Column) {
  if (dragCardRef.value && sourceColumnRef.value) {
    mutate({ docId: dragCardRef.value.id, status: targetColumn.id })
  }
}

</script>
<template>
  <div class="p-10">
    <h1 class="font-bold text-2xl mb-10">CRM System</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div class="grid grid-cols-5 gap-16">
        <div
          v-for="(column, index) in data"
          :key="column.id"
          class="min-h-screen"
          @dragover="handleDragOver"
          @drop="() => handleDrop(column)"
        >
          <div
            :style="generateColumnGradient(index, data.length)"
            class="rounded bg-slate-700 py-1 px-5 mb-2 text-center"
          >
            {{ column.name }}
          </div>
          <div>
            <KanbanCreateDeal :refetch="refetch" :status="column.id"/>
            <UiCard
              v-for="card in column.items"
              :key="card.id"
              class="mb-5"
              draggable="true"
              role="button"
              @click="set(card)"
              @dragstart="() => handleDragStart(card, column)"
            >
              <UiCardHeader>
                <UiCardTitle>{{ card.name }}</UiCardTitle>
                <UiCardDescription class="mt-2 block">{{
                    numToCurrency(card.price)
                  }}
                </UiCardDescription>
              </UiCardHeader>
              <UiCardContent class="text-xs">
                {{ card.companyName }}
              </UiCardContent
              >
              <UiCardFooter>
                {{ dayjs(card.$createdAt).format('DD MMMM YYYY') }}
              </UiCardFooter>
            </UiCard>
          </div>
        </div>
      </div>
      <KanbanSlideover/>
    </div>
  </div>
</template>
