import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { deleteDeck as deleteDeckApi } from '../../../services/apiDeck'
import { useAuth } from '@clerk/clerk-react'
import { useToast } from '../../../ui/shadcn/use-toast'
import { DECK_BY_ID_URL } from '../../../statics/fetchUrls'

export function useDeleteDeck() {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const { getToken } = useAuth()
  const {
    isPending: isDeleting,
    mutate: deleteDeck,
    isError,
  } = useMutation({
    mutationFn: async (id: number | string) => {
      try {
        const res = await fetch(DECK_BY_ID_URL(id), {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            'Content-Type': 'application/json',
          },
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
