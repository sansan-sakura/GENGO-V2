import { useQueryClient, useMutation } from '@tanstack/react-query'
import { createCategory as createCategoryApi } from '../../../services/apiCategory'
import { useAuth } from '@clerk/clerk-react'
import { NewCategory } from '../../../types/flashcardTypes'
import { useToast } from '../../../ui/shadcn/use-toast'
import { CATEGORY_URL } from '../../../statics/fetchUrls'

export function useCreateCategory() {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const { getToken, isLoaded, isSignedIn } = useAuth()
  const token = getToken()
  const {
    mutate: createCategory,
    isPending: isCreating,
    isError,
  } = useMutation({
    mutationFn: async (newCategory: NewCategory) => {
      try {
        const res = await fetch(CATEGORY_URL, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newCategory),
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
        title: 'A New category is created',
      })

      queryClient.invalidateQueries({ queryKey: ['category'] })
    },
    onError: (err) =>
      toast({
        variant: 'destructive',
        title: err.message,
        // title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
      }),
  })

  return { isCreating, createCategory, isError }
}
