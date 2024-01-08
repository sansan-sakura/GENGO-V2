import { useEffect, useRef, useState } from 'react'
// import { getDate, showTime } from "@/utils/helpers";
// import { SearchInput } from "../SearchInput/SearchInput";
// import { currentUserState } from "@/atoms/userAtoms";
import { useRecoilValue } from 'recoil'
// import { useUser } from "../../hooks/useUser";
// import { Spinner } from "../Spinner";
import { themeColors, themeTextColors, themebgColors } from '../../../statics/colors'
import { Aside } from '../Aside/Aside'
import { RxHamburgerMenu } from 'react-icons/rx'

import { Logo } from '../../generic/Logo'
import { Hanko } from '../../generic/Hanko'
export const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false)
  return (
    <>
      {isNavOpen && <Aside setIsNavOpen={setIsNavOpen} isNavOpen={isNavOpen} />}
      <header className='mb-10 w-screen border-b border-b-stone-100 '>
        <div className='mx-auto flex w-full max-w-[1200px] items-center justify-between px-4 py-6  sm:py-8 md:justify-around'>
          <div className='flex items-center gap-2'>
            <Hanko size='sm' />
            <Logo />
          </div>
          <button onClick={() => setIsNavOpen(true)}>
            <RxHamburgerMenu className='h-8 w-8' />
          </button>
        </div>
      </header>
    </>
  )
}
