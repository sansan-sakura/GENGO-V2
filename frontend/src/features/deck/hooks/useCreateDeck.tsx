import { useQueryClient, useMutation } from '@tanstack/react-query'
import { createDeck as createDeckApi } from '../../../services/apiDeck'
import { useAuth } from '@clerk/clerk-react'
import { NewDeckType } from '../../../types/flashcardTypes'
import { useToast } from '../../../ui/shadcn/use-toast'

export function useCreateDeck() {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const { getToken, isLoaded, isSignedIn } = useAuth()
  const token = getToken()
  const {
    mutate: createDeck,
    isPending: isCreating,
    isError,
  } = useMutation({
    mutationFn: (body: NewDeckType) => createDeckApi(body, token),
    onSuccess: () => {
      toast({
        title: 'A New Deck is created',
      })
      queryClient.invalidateQueries({ queryKey: ['decks'] })
    },
    onError: (err) =>
      toast({
        variant: 'destructive',
        title: err.message,
        // title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
      }),
  })

  return { isCreating, createDeck, isError }
}
