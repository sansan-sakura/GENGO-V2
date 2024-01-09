import { useAuth } from '@clerk/clerk-react'
import { getDecksWithCategopry } from '../../../services/apiDeck'
import { useQuery } from '@tanstack/react-query'
export function useDecksWithCategory(categoryId: string, query: string) {
  const { getToken, isLoaded, isSignedIn } = useAuth()
  const token = getToken()
  const {
    isPending,
    data: decksWithQuery,
    error,
  } = useQuery({
    queryKey: ['decks', { categoryId, query }],
    queryFn: () => getDecksWithCategopry(categoryId, query, token),
  })
  return { isPending, decksWithQuery, error }
}
