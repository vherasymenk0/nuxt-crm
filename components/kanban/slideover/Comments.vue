<script lang="ts" setup>
import dayjs from 'dayjs'
import { useComments } from './useComments'
import { useCreateComment } from './useCreateComment'

const { data, refetch, isLoading } = useComments()
const { commentRef, writeComment } = useCreateComment({ refetch })

</script>

<template>
  <UiInput
    v-model="commentRef"
    placeholder="Comment"
    @keyup.enter="writeComment"
  />
  <UiSkeleton v-if="isLoading" class="w-full h-[76px] rounded mt-5"/>
  <div v-else-if="data">
    <div
      v-for="comment in data?.comments"
      :key="comment.$id"
      class="flex items-start mt-5"
    >
      <Icon class="mr-3 mt-1" name="radix-icons:chat-bubble" size="20"/>
      <div class="border-border bg-black/20 rounded p-3 w-full">
        <div class="mb-2 text-xxs text-gray-400">
          at {{ dayjs(comment.$createdAt).format('HH:mm dddd DD MMMM YYYY') }}
        </div>
        <p>{{ comment.text }}</p>
      </div>
    </div>
  </div>
</template>
