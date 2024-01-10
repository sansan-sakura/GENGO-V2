import React, { ReactNode } from 'react'
import { PopoverContent, PopoverTrigger, Popover } from '../../shadcn/Popover'
import { IoAddSharp } from 'react-icons/io5'

export const PopoverCustom = ({ children }: { children: ReactNode }) => {
  return (
    <Popover>
      <PopoverTrigger className='fixed bottom-14 right-10 z-10 rounded-full bg-amber-50 p-4 shadow-[3px_10px_16px_4px_rgba(0,0,0,0.1)] sm:bottom-16 sm:right-16 md:absolute md:bottom-2 md:right-0 lg:-right-12'>
        <IoAddSharp className='text-2xl' />
      </PopoverTrigger>
      <PopoverContent sideOffset={-150} align='center' className=''>
        {children}
      </PopoverContent>
    </Popover>
  )
}
