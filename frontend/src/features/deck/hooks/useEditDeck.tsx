import { useMutation, useQueryClient } from '@tanstack/react-query'
import { NewDeckType } from '../../../types/flashcardTypes'
import { useToast } from '../../../ui/shadcn/use-toast'
import { useAuth } from '@clerk/clerk-react'
import { DECK_BY_ID_URL } from '../../../statics/fetchUrls'

export function useEditDeck(bookmark = false) {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const { getToken } = useAuth()
  const {
    mutate: editDeck,
    isPending: isEditing,
    isError,
  } = useMutation({
    mutationFn: async ({
      id,
      newData,
    }: {
      id: number | string
      newData: NewDeckType
    }) => {
      try {
        const res = await fetch(DECK_BY_ID_URL(id), {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newData),
        })

        const data = await res.json()
        if (data.status !== 'success') throw new Error(data.message)
        console.log(data)
        return data
      } catch (err: any) {
        throw new Error(err.message)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['decks'] })
      console.log('success')

      toast({
        title: 'Deck succesfully updated 🌸',
      })
    },
    onError: (err) =>
      toast({
        variant: 'destructive',
        title: err.message,
        description: 'There was a problem with your request.',
      }),
  })
  return { isEditing, editDeck, isError }
}
