import { getCategories } from '../../../services/apiCategory'
import { useQuery } from '@tanstack/react-query'
import { CategoryType } from '../../../types/flashcardTypes'
import { useAuth } from '@clerk/clerk-react'
import { CATEGORY_URL } from '../../../statics/fetchUrls'
export function useCategory() {
  const { getToken } = useAuth()
  const token = getToken()
  const { isPending, data, error } = useQuery({
    queryKey: ['category'],
    queryFn: async () => {
      try {
        const res = await fetch(CATEGORY_URL, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            'Content-Type': 'application/json',
          },
        })
        const data = await res.json()
        if (data.status === 'fail' || data.status === 'error') {
          throw new Error(data.message)
        }
        console.log(data)
        return data
      } catch (err: any) {
        console.log(err)
      }
    },
  })
  const categories = data?.data?.categories as CategoryType[]
  return { isPending, categories, error }
}
