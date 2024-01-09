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
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalState)
  const [modalId, setModalId] = useRecoilState(modalIDstate)
  return (
    <Dialog
      open={isModalOpen && modalId === id}
      onOpenChange={() => {
        setIsModalOpen((prev) => !prev)
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
