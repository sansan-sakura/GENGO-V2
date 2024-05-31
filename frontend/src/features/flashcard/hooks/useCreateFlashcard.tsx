import { useQueryClient, useMutation } from '@tanstack/react-query'

import { useToast } from '../../../ui/shadcn/use-toast'
import { useAuth } from '@clerk/clerk-react'
import { CreateFlashCard } from '../../../types/flashcardTypes'
import { FLASHCARD_CREATE_URL } from '../../../statics/fetchUrls'

export function useCreateFlashcard() {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const { getToken } = useAuth()

  const {
    mutate: createFlashcard,
    isPending: isCreating,
    isError,
  } = useMutation({
    mutationFn: async (body: CreateFlashCard) => {
      try {
        const res = await fetch(FLASHCARD_CREATE_URL, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        })
        const data = await res.json()
        if (data.status === 'fail' || data.status === 'error') {
          alert(data.message)
          throw new Error(data.message)
        }
        return data
      } catch (err: any) {
        throw new Error(err.message)
      }
    },
    onSuccess: () => {
      toast({
        title: 'Flashcard succesfully created',
      })
      queryClient.invalidateQueries({ queryKey: ['deck'] })
    },
    onError: (err) =>
      toast({
        variant: 'destructive',
        title: err.message,
        // title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
      }),
  })

  return { isCreating, createFlashcard, isError }
}
