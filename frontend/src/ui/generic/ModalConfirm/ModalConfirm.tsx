import { Dialog, DialogContent, DialogHeader } from '../../shadcn/Dialog'
import { useRecoilState } from 'recoil'
import { modalConfirmIdState } from '../../../atoms/commonAtoms'
import { ButtonSubmit } from '../../buttons/Button/ButtonSubmit'
import { Button } from '../../shadcn/Button'

type Props = {
  onClick?: () => void
  header?: string
  id: string
  isError?: boolean
  isLoading?: boolean
}

export const ModalConfirm = ({ onClick, header, id, isError, isLoading }: Props) => {
  const [modalConfirmId, setModalConfirmId] = useRecoilState(modalConfirmIdState)
  return (
    <Dialog
      open={modalConfirmId === id}
      onOpenChange={() => {
        modalConfirmId !== '' && setModalConfirmId('')
      }}
    >
      <DialogContent>
        <DialogHeader className='text-xl font-semibold'>{header}</DialogHeader>
        <div className='flex justify-center gap-2'>
          <Button variant='outline' onClick={() => setModalConfirmId('')}>
            Cancel
          </Button>
          <ButtonSubmit
            onClick={onClick}
            isError={isError}
            isloading={isLoading}
            varient='destructive'
          >
            Confirm
          </ButtonSubmit>
        </div>
      </DialogContent>
    </Dialog>
  )
}
