<script lang="ts" setup>
import dayjs from 'dayjs'
import { SLIDEOVER_KEY } from '~/utils/keys'
import type { Slideover } from '~/components/kanban/slideover/useSlideover'

const { state } = inject(SLIDEOVER_KEY) as Slideover

</script>

<template>
  <div class="border-border bg-black/20 rounded p-3">
    <div class="uppercase bold text-lg mb-4">About the deal</div>
    <KanbanSlideoverLabel text="Name">
      <h2>
        {{ state.card?.name }}
      </h2>
    </KanbanSlideoverLabel>
    <KanbanSlideoverLabel text="Cost">
      {{ numToCurrency(state.card?.price || 0) }}
    </KanbanSlideoverLabel>
    <KanbanSlideoverLabel text="Status">
      <UiBadge variant="outline">
        {{ state.card?.status }}
      </UiBadge>
    </KanbanSlideoverLabel>
    <KanbanSlideoverLabel text="Client">
      {{ state.card?.companyName }}
    </KanbanSlideoverLabel>
    <KanbanSlideoverLabel text="Date of creation">
      {{ dayjs(state.card?.$createdAt).format('DD MMMM YYYY') }}
    </KanbanSlideoverLabel>
  </div>
</template>
