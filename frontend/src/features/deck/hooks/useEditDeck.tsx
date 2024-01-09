import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { updateDeck } from '../../../services/apiDeck'
import { NewDeckType } from '../../../types/flashcardTypes'
import { useAuth } from '@clerk/clerk-react'

export function useEditDeck() {
  const queryClient = useQueryClient()
  const { getToken, isLoaded, isSignedIn } = useAuth()
  const token = getToken()
  const { mutate: editDeck, isPending: isEditing } = useMutation({
    mutationFn: ({ id, newData }: { id: number | string; newData: NewDeckType }) =>
      updateDeck(id, newData, token),
    onSuccess: () => {
      toast.success('Deck successfully edited ')
      queryClient.invalidateQueries({ queryKey: ['decks'] })
    },
    onError: (err) => toast.error(err.message),
  })
  return { isEditing, editDeck }
}
