import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useToast } from '../../../ui/shadcn/use-toast'
import { useAuth } from '@clerk/clerk-react'
import { CATEGORY_ID_URL } from '../../../statics/fetchUrls'

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
    mutationFn: async ({
      id,
      newData,
    }: {
      id: number | string
      newData: { category: string }
    }) => {
      try {
        const res = await fetch(CATEGORY_ID_URL(id), {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newData),
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
        title: 'Category successfully updated',
      })
      queryClient.invalidateQueries({ queryKey: ['category'] })
    },
    onError: (err) =>
      toast({
        variant: 'destructive',
        title: err.message,
        description: 'There was a problem with your request.',
      }),
  })
  return { isEditing, editCategory, isError }
}
