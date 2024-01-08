import { ReactNode } from 'react'
import { Button } from '../../../shadcn/Button'

type Props = {
  children: ReactNode
  onClick?: () => void
}

export const ButtonSubmit = ({ children, onClick }: Props) => {
  return (
    <Button onClick={onClick} className='mx-auto'>
      {children}
    </Button>
  )
}
