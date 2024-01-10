import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { updateCategory } from '../../../services/apiCategory'
import { useToast } from '../../../ui/shadcn/use-toast'
import { useAuth } from '@clerk/clerk-react'

export function useEditCategory() {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const { getToken, isLoaded, isSignedIn } = useAuth()
  const token = getToken()
  const {
    mutate: editCategory,
    isPending: isEditing,
    isError,
  } = useMutation({
    mutationFn: ({
      id,
      newData,
    }: {
      id: number | string
      newData: { category: string }
    }) => updateCategory(id, newData, token),
    onSuccess: () => {
      toast({
        title: 'Category successfully updated',
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
  return { isEditing, editCategory, isError }
}
