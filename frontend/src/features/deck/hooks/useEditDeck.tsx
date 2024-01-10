import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { updateDeck } from '../../../services/apiDeck'
import { NewDeckType } from '../../../types/flashcardTypes'
import { useAuth } from '@clerk/clerk-react'
import { useToast } from '../../../ui/shadcn/use-toast'

export function useEditDeck({ bookmark = false }: { bookmark?: boolean }) {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const { getToken, isLoaded, isSignedIn } = useAuth()
  const token = getToken()
  const {
    mutate: editDeck,
    isPending: isEditing,
    isError,
  } = useMutation({
    mutationFn: ({ id, newData }: { id: number | string; newData: NewDeckType }) =>
      updateDeck(id, newData, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['decks'] })
      !bookmark &&
        toast({
          title: 'Deck succesfully updated 🌸',
        })
    },
    onError: (err) =>
      !bookmark &&
      toast({
        variant: 'destructive',
        title: err.message,
        // title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
      }),
  })
  return { isEditing, editDeck, isError }
}
