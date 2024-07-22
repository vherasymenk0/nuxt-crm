import { useMutation } from '@tanstack/vue-query'
import { v4 as uuid } from 'uuid'
import { COLLECTION_COMMENTS, DB_ID } from '~/app.constants'
import { SLIDEOVER_KEY } from '~/utils/keys'
import type { Slideover } from '~/components/kanban/slideover/useSlideover'

export function useCreateComment({ refetch }: { refetch: () => void }) {
  const { state } = inject(SLIDEOVER_KEY) as Slideover
  const commentRef = ref<string>()

  const { mutate } = useMutation({
    mutationKey: ['add comments', commentRef.value],
    mutationFn: () =>
      DB.createDocument(DB_ID, COLLECTION_COMMENTS, uuid(), {
        text: commentRef.value,
        deal: state.card?.id || '',
      }),
    onSuccess: () => {
      refetch()
      commentRef.value = ''
    },
  })

  const writeComment = () => {
    if (!commentRef.value) return
    mutate()
  }

  return {
    writeComment,
    commentRef,
  }
}
