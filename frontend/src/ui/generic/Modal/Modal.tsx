import { ReactNode } from 'react'
import { Dialog, DialogContent, DialogHeader } from '../../shadcn/Dialog'
import { useRecoilState } from 'recoil'
import { modalState } from '../../../atoms/commonAtoms'

type Props = {
  children: ReactNode
  header?: string
}

export const Modal = ({ children, header }: Props) => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalState)
  return (
    <Dialog open={isModalOpen} onOpenChange={() => setIsModalOpen((prev) => !prev)}>
      <DialogContent>
        <DialogHeader className='text-xl font-semibold'>{header}</DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
