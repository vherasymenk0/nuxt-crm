<script lang="ts" setup>
import { SLIDEOVER_KEY } from '~/utils/keys'
import type { Slideover } from '~/components/kanban/slideover/useSlideover'

const { state } = inject(SLIDEOVER_KEY) as Slideover
</script>

<template>
  <div>
    <USlideover v-model="state.isOpen">
      <UCard
        :ui="{
					body: { base: 'flex-1' },
					background: 'bg-sidebar',
					divide: 'divide-y divide-border',
				}"
        class="flex flex-col flex-1 overflow-y-auto bg-sidebar"
      >
        <template #header>
          <KanbanSlideoverHeader/>
        </template>
        <KanbanSlideoverComments/>
      </UCard>
    </USlideover>
  </div>
</template>
