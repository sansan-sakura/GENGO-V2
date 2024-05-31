import { ReactNode, useEffect } from 'react'
import { Button } from '../../../shadcn/Button'
import { Loader2 } from 'lucide-react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import {
  modalConfirmIdState,
  modalIDstate,
  subModalIdState,
} from '../../../../atoms/commonAtoms'

type Props = {
  children: ReactNode
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  isloading?: boolean
  isError?: boolean
  varient?: 'outline' | 'destructive' | 'red' | 'link' | 'ghost' | 'link' //TODO: define specific type string
  size?: 'sm' | 'lg' | 'icon'
  className?: string
}

export const ButtonSubmit = ({
  children,
  onClick,
  isloading,
  isError,
  varient,
  size,
  className,
}: Props) => {
  const [modalId, setModalId] = useRecoilState(modalIDstate)
  const [modalConfirmId, setModalConfirmId] = useRecoilState(modalConfirmIdState)
  const [subModalId, setSubModalId] = useRecoilState(subModalIdState)

  const closeModalOnSubmit = () => {
    modalId !== '' && setModalId('')
    modalConfirmId !== '' && setModalConfirmId('')
    subModalId !== '' && setSubModalId('')
    console.log(subModalId, subModalId !== '')
  }

  useEffect(() => {
    if (isloading || isError) {
      const closeModal = setInterval(closeModalOnSubmit, 1000)
      return () => clearInterval(closeModal)
    }
  }, [isloading, isError])

  return (
    <Button
      onClick={onClick}
      className={`min-w-[100px] uppercase ${className}`}
      type='submit'
      variant={varient || 'blue'}
      size={size}
    >
      {isloading ? <Loader2 className=' h-4 w-4 animate-spin' /> : children}
    </Button>
  )
}
