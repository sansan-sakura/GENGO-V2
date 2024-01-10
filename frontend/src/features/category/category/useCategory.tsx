import { getCategories } from '../../../services/apiCategory'
import { useQuery } from '@tanstack/react-query'
import { CategoryType } from '../../../types/flashcardTypes'
import { useAuth } from '@clerk/clerk-react'
export function useCategory() {
  const { getToken, isLoaded, isSignedIn } = useAuth()
  const token = getToken()
  const { isPending, data, error } = useQuery({
    queryKey: ['category'],
    queryFn: () => getCategories(token),
  })
  const categories = data?.data?.categories as CategoryType[]
  return { isPending, categories, error }
}
