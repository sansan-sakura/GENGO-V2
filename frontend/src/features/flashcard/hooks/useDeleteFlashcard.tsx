import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { deleteFlashCard } from '../../../services/apiFlashcard'
import { useAuth } from '@clerk/clerk-react'
import { useToast } from '../../../ui/shadcn/use-toast'

export function useDeleteFlashcard() {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const { getToken, isLoaded, isSignedIn } = useAuth()
  const token = getToken()
  const { isPending: isDeleting, mutate: deleteFlashcard } = useMutation({
    mutationFn: (id: number | string | undefined) => deleteFlashCard(id, token),
    onSuccess: () => {
      toast({
        title: 'Flashcard succesfully created',
      })
      queryClient.invalidateQueries({
        queryKey: ['deck'],
      })
    },
    onError: (err) =>
      toast({
        variant: 'destructive',
        title: err.message,
        // title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
      }),
  })
  return { isDeleting, deleteFlashcard }
}
