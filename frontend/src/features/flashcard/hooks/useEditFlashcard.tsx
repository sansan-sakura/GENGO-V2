import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '../../../ui/shadcn/use-toast'
import { useAuth } from '@clerk/clerk-react'
import { FLASHCARD_BY_ID_URL } from '../../../statics/fetchUrls'

export function useEditFlashcard() {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const { getToken } = useAuth()

  const {
    mutate: editFlashcard,
    isPending: isEditing,
    isError,
  } = useMutation({
    mutationFn: async ({
      id,
      newData,
    }: {
      id: string
      newData: { question?: string; answer?: string; status?: string }
    }) => {
      if (id === undefined) return

      try {
        const res = await fetch(FLASHCARD_BY_ID_URL(id), {
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
      // toast({ title: 'Flashcard successfully edited ' })
      queryClient.invalidateQueries({ queryKey: ['deck'] })
    },
    onError: (err) =>
      toast({
        variant: 'destructive',
        title: err.message,
        description: 'There was a problem with your request.',
      }),
  })
  return { isEditing, editFlashcard, isError }
}
