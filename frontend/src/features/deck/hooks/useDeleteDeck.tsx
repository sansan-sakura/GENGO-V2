import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { deleteDeck as deleteDeckApi } from '../../../services/apiDeck'
import { useAuth } from '@clerk/clerk-react'
import { useToast } from '../../../ui/shadcn/use-toast'

export function useDeleteDeck() {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const { getToken, isLoaded, isSignedIn } = useAuth()
  const token = getToken()
  const {
    isPending: isDeleting,
    mutate: deleteDeck,
    isError,
  } = useMutation({
    mutationFn: (id: number | string) => deleteDeckApi(id, token),
    onSuccess: () => {
      toast({
        title: 'Succesdully deleted!',
      })
      queryClient.invalidateQueries({
        queryKey: ['decks'],
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
  return { isDeleting, deleteDeck, isError }
}
