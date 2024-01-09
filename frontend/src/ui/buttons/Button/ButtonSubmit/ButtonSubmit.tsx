import { ReactNode } from 'react'
import { Button } from '../../../shadcn/Button'
import { Loader2 } from 'lucide-react'

type Props = {
  children: ReactNode
  onClick?: () => void
  isloading?: boolean
}

export const ButtonSubmit = ({ children, onClick, isloading }: Props) => {
  return (
    <Button onClick={onClick} className='mx-auto min-w-[100px]' type='submit'>
      {isloading ? <Loader2 className=' h-4 w-4 animate-spin' /> : children}
    </Button>
  )
}
