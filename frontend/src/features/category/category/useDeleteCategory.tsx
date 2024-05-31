import { useMutation, useQueryClient } from '@tanstack/react-query'

import { CATEGORY_ID_URL } from '../../../statics/fetchUrls'
import { useAuth } from '@clerk/clerk-react'
import { useToast } from '../../../ui/shadcn/use-toast'

export function useDeleteCategory() {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const { getToken } = useAuth()
  const { isPending: isDeleting, mutate: deleteCategory } = useMutation({
    mutationFn: async (id: number | string) => {
      try {
        const res = await fetch(CATEGORY_ID_URL(id), {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            'Content-Type': 'application/json',
          },
        })
        const data = await res.json()
        if (data.status !== 'success') throw new Error(data.message)
        console.log(data)
        return data
      } catch (err: any) {
        throw new Error(err.message)
      }
    },
    onSuccess: () => {
      toast({
        title: 'Category successfully deleted',
      })
      queryClient.invalidateQueries({
        queryKey: ['category'],
        type: 'active',
      })
    },
    onError: (err) =>
      toast({
        variant: 'destructive',
        title: err.message,
        description: 'There was a problem with your request.',
      }),
  })
  return { isDeleting, deleteCategory }
}
