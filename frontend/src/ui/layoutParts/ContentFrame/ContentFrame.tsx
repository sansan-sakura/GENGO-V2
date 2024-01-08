import { ReactNode } from 'react'

export const ContentFrame = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex w-full flex-col items-center rounded-lg  px-2 py-3 shadow-lg md:p-6 lg:p-8'>
      {children}
    </div>
  )
}
