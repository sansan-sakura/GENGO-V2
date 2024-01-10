import { useQueryClient, useMutation } from '@tanstack/react-query'

import { createFlashCard } from '../../../services/apiFlashcard'
import { useToast } from '../../../ui/shadcn/use-toast'
import { useAuth } from '@clerk/clerk-react'
import { CreateFlashCard } from '../../../types/flashcardTypes'

export function useCreateFlashcard() {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const { getToken, isLoaded, isSignedIn } = useAuth()
  const token = getToken()
  const {
    mutate: createFlashcard,
    isPending: isCreating,
    isError,
  } = useMutation({
    mutationFn: (body: CreateFlashCard) => createFlashCard(body, token),
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
