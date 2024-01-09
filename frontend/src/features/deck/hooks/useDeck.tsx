import { useAuth } from '@clerk/clerk-react'
import { getDeck } from '../../../services/apiDeck'
import { useQuery } from '@tanstack/react-query'
export function useDeck(id: number | string | undefined) {
  const { getToken, isLoaded, isSignedIn } = useAuth()
  const token = getToken()
  const {
    isLoading,
    data: deck,
    error,
  } = useQuery({
    queryKey: ['deck'],
    queryFn: () => getDeck(id, token),
  })
  return { isLoading, deck, error }
}
