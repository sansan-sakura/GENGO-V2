import { ReactNode, useEffect } from 'react'
import { Button } from '../../../shadcn/Button'
import { Loader2 } from 'lucide-react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { modalConfirmIdState, modalIDstate } from '../../../../atoms/commonAtoms'

type Props = {
  children: ReactNode
  onClick?: () => void
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

  const closeModalOnSubmit = () => {
    modalId !== '' && setModalId('')
    modalConfirmId !== '' && setModalConfirmId('')
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
      className={`min-w-[100px] ${className}`}
      type='submit'
      variant={varient ?? null}
      size={size}
    >
      {isloading ? <Loader2 className=' h-4 w-4 animate-spin' /> : children}
    </Button>
  )
}
