import { useEffect, useRef, useState } from 'react'
// import { getDate, showTime } from "@/utils/helpers";
// import { SearchInput } from "../SearchInput/SearchInput";
// import { currentUserState } from "@/atoms/userAtoms";
import { useRecoilValue } from 'recoil'
// import { useUser } from "../../hooks/useUser";
// import { Spinner } from "../Spinner";
import { themeColors, themeTextColors, themebgColors } from '@/statics/colors'
import { Aside } from '../Aside/Aside'
import { RxHamburgerMenu } from 'react-icons/rx'
import { UserButton } from '@clerk/clerk-react'
import { Logo } from '../../generic/Logo'
import { Hanko } from '../../generic/Hanko'
export const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false)
  // const currentUser = useRecoilValue(currentUserState);
  // const [time, setTime] = useState(showTime());
  // const { isPending, data } = useUser();

  // const {
  //   current: [weekDay, date],
  // } = useRef(getDate());

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     const timeNow = showTime();
  //     setTime(timeNow);
  //   }, 60000);

  //   return () => clearInterval(timer);
  // });

  // if (isPending) return <Spinner />;

  // const theme = data.data.data.theme;

  return (
    <>
      {isNavOpen && <Aside setIsNavOpen={setIsNavOpen} isNavOpen={isNavOpen} />}
      <header className='w-screen'>
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
