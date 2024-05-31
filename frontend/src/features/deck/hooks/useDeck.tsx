import { useAuth } from '@clerk/clerk-react'
import { useQuery } from '@tanstack/react-query'
import { DECK_BY_ID_URL } from '../../../statics/fetchUrls'
export function useDeck(id: number | string | undefined) {
  const { getToken } = useAuth()
  const {
    isLoading,
    data: deck,
    error,
  } = useQuery({
    queryKey: ['deck'],
    queryFn: async () => {
      console.log('fett')
      if (id === undefined) return
      try {
        const res = await fetch(DECK_BY_ID_URL(id), {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            'Content-Type': 'application/json',
          },
        })
        const data = await res.json()
        if (data.status === 'fail' || data.status === 'error') {
          alert(data.message)
          throw new Error(data.message)
        }
        console.log(data, 'data')
        return data
      } catch (err: any) {
        throw new Error("Couldn't get a deck")
      }
    },
  })
  return { isLoading, deck, error }
}
