import { useQueryClient, useMutation } from '@tanstack/react-query'
import { createDeck as createDeckApi } from '../../../services/apiDeck'
import { useAuth } from '@clerk/clerk-react'
import { NewDeckType } from '../../../types/flashcardTypes'
import { useToast } from '../../../ui/shadcn/use-toast'
import { DECK_CREATE_URL } from '../../../statics/fetchUrls'
import axios from 'axios'
import fetch from 'isomorphic-fetch'

export function useCreateDeck() {
  console.log('client')
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const { getToken } = useAuth()

  const {
    mutate: createDeck,
    isPending: isCreating,
    isError,
  } = useMutation({
    mutationKey: ['decks'],
    mutationFn: (body: NewDeckType) => {
      const fetchData = async () => {
        try {
          console.log('test')
          const res = await fetch('http://localhost:8080/api/v1/deck', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${await getToken()}`,
              mode: 'cors',
            },
            body: JSON.stringify(body),
          })

          const data = await res.json()
          console.log(data)
          return data
        } catch (err: any) {
          console.error(err)
          throw new Error(err.message)
        }
      }
      return fetchData()
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
        // title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
      }),
  })

  return { isCreating, createDeck, isError }
}
