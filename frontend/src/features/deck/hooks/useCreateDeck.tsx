import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { createDeck as createDeckApi } from '../../../services/apiDeck'
import { useAuth } from '@clerk/clerk-react'
import { NewDeckType } from '../../../types/flashcardTypes'

export function useCreateDeck() {
  const queryClient = useQueryClient()
  const { getToken, isLoaded, isSignedIn } = useAuth()
  const token = getToken()
  const { mutate: createDeck, isPending: isCreating } = useMutation({
    mutationFn: (body: NewDeckType) => createDeckApi(body, token),
    onSuccess: () => {
      toast.success('new deck is created')
      queryClient.invalidateQueries({ queryKey: ['decks'] })
    },
    onError: (err) => toast.error(err.message),
  })

  return { isCreating, createDeck }
}
