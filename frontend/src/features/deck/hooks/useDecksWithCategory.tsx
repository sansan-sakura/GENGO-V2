import { useAuth } from '@clerk/clerk-react'
import { useQuery } from '@tanstack/react-query'
import { ALL_DECK_URL, DECK_WITH_CATEGOY_URL } from '../../../statics/fetchUrls'
import fetch from 'isomorphic-fetch'
export function useDecksWithCategory(categoryId: string, query: string) {
  const { getToken } = useAuth()
  const {
    isPending,
    data: decksWithQuery,
    error,
  } = useQuery({
    queryKey: ['decks', { categoryId, query }],
    queryFn: async () => {
      try {
        //TODO: add categoryId to url
        const res = await fetch(
          categoryId === 'all'
            ? ALL_DECK_URL(query)
            : DECK_WITH_CATEGOY_URL(categoryId, query),
          {
            headers: {
              Authorization: `Bearer ${await getToken()}`,
            },
          },
        )

        console.log(res)
        const data = await res.json()
        if (data.status === 'fail' || data.status === 'error') {
          throw new Error(data.message)
        }
        return data
      } catch (err: any) {
        throw new Error("Couldn't get decks")
      }
    },
  })
  return { isPending, decksWithQuery, error }
}
