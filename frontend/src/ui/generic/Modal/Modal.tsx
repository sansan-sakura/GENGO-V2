import { ReactNode } from 'react'
import { Dialog, DialogContent, DialogHeader } from '../../shadcn/Dialog'
import { useRecoilState } from 'recoil'
import { modalIDstate, modalState } from '../../../atoms/commonAtoms'

type Props = {
  children: ReactNode
  header?: string
  id: string
}

export const Modal = ({ children, header, id }: Props) => {
  const [modalId, setModalId] = useRecoilState(modalIDstate)
  return (
    <Dialog
      open={modalId === id}
      onOpenChange={() => {
        modalId !== '' && setModalId('')
      }}
    >
      <DialogContent>
        <DialogHeader className='text-xl font-semibold'>{header}</DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
