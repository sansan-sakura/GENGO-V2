import { useQueryClient, useMutation } from '@tanstack/react-query'
import { createCategory as createCategoryApi } from '../../../services/apiCategory'
import { useAuth } from '@clerk/clerk-react'
import { NewCategory } from '../../../types/flashcardTypes'
import { useToast } from '../../../ui/shadcn/use-toast'

export function useCreateCategory() {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const { getToken, isLoaded, isSignedIn } = useAuth()
  const token = getToken()
  const { mutate: createCategory, isPending: isCreating } = useMutation({
    mutationFn: (newCategory: NewCategory) => createCategoryApi(newCategory, token),
    onSuccess: () => {
      toast({
        title: 'New category is created',
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

  return { isCreating, createCategory }
}
