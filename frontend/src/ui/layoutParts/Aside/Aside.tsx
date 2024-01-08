import { ButtonOutline } from '../../buttons/ButtonOutline'
import { Hanko } from '../../generic/Hanko'
import { Logo } from '../../generic/Logo'
import { navButton as buttonData } from '../../../statics/uiContent'
import { themebgColors } from '../../../statics/colors'
import { Sheet, SheetContent } from '../../shadcn/Sheet'
import { Dispatch, SetStateAction } from 'react'
import { UserButton } from '@clerk/clerk-react'

type Props = {
  setIsNavOpen: Dispatch<SetStateAction<boolean>>
  isNavOpen: boolean
}

export const Aside = ({ setIsNavOpen, isNavOpen }: Props) => {
  const buttons = buttonData.map((button) => (
    <ButtonOutline
      name={button.name}
      bg={button.bgColor}
      key={button.name}
      path={button.path}
      borderColor='border-none'
    />
  ))

  return (
    <Sheet onOpenChange={setIsNavOpen} open={isNavOpen}>
      <SheetContent className='bg-amber-50 py-20'>
        <div className='flex h-full flex-col items-center justify-between'>
          <div className=' flex flex-col items-center gap-8 py-20'>
            <Hanko />
            <div className='mx-auto flex w-fit flex-col gap-3 py-4'>{buttons}</div>
          </div>
          <UserButton
            afterSignOutUrl='/sign-in'
            appearance={{
              elements: {
                userButtonBox: 'w-16 h-16',
                avatarBox: 'w-full h-full border-2 border-amber-100 shadow',
              },
            }}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}
