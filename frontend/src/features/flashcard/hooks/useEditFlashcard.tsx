import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { updateFlashCard } from '../../../services/apiFlashcard'
import { useToast } from '../../../ui/shadcn/use-toast'
import { useAuth } from '@clerk/clerk-react'

export function useEditFlashcard() {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const { getToken, isLoaded, isSignedIn } = useAuth()
  const token = getToken()
  const {
    mutate: editFlashcard,
    isPending: isEditing,
    isError,
  } = useMutation({
    mutationFn: ({
      id,
      newData,
    }: {
      id: string
      newData: { question: string; answer: string }
    }) => updateFlashCard(id, newData, token),
    onSuccess: () => {
      toast({ title: 'Flashcard successfully edited ' })
      queryClient.invalidateQueries({ queryKey: ['deck'] })
    },
    onError: (err) =>
      toast({
        variant: 'destructive',
        title: err.message,
        // title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
      }),
  })
  return { isEditing, editFlashcard, isError }
}
