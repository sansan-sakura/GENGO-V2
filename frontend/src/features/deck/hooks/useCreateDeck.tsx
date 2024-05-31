import { useQueryClient, useMutation } from '@tanstack/react-query'

import { useAuth } from '@clerk/clerk-react'
import { NewDeckType } from '../../../types/flashcardTypes'
import { useToast } from '../../../ui/shadcn/use-toast'
import { DECK_CREATE_URL } from '../../../statics/fetchUrls'

import fetch from 'isomorphic-fetch'

export function useCreateDeck() {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const { getToken } = useAuth()

  const {
    mutate: createDeck,
    isPending: isCreating,
    isError,
  } = useMutation({
    mutationKey: ['decks'],
    mutationFn: async (body: NewDeckType) => {
      try {
        const res = await fetch(DECK_CREATE_URL, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
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
      toast({
        title: 'A New Deck is created',
      })
      queryClient.invalidateQueries({ queryKey: ['decks'] })
    },
    onError: (err) =>
      toast({
        variant: 'destructive',
        title: err.message,
        description: 'There was a problem with your request.',
      }),
  })

  return { isCreating, createDeck, isError }
}
