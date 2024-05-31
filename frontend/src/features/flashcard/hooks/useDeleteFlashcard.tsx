import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@clerk/clerk-react'
import { useToast } from '../../../ui/shadcn/use-toast'
import { FLASHCARD_BY_ID_URL } from '../../../statics/fetchUrls'

export function useDeleteFlashcard() {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const { getToken } = useAuth()

  const { isPending: isDeleting, mutate: deleteFlashcard } = useMutation({
    mutationFn: async (id: number | string | undefined) => {
      if (id === undefined) return

      try {
        const res = await fetch(FLASHCARD_BY_ID_URL(id), {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${await getToken()}` },
        })
        const data = await res.json()
        if (data.status !== 'success') throw new Error(data.message)
        return data
      } catch (err: any) {
        throw new Error(err.message)
      }
    },
    onSuccess: () => {
      toast({
        title: 'Flashcard succesfully created',
      })
      queryClient.invalidateQueries({
        queryKey: ['deck'],
      })
    },
    onError: (err) =>
      toast({
        variant: 'destructive',
        title: err.message,
        // title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
      }),
  })
  return { isDeleting, deleteFlashcard }
}
