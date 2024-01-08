import { Link, useNavigate } from 'react-router-dom'
import { Hanko } from '../../generic/Hanko'
import { useRecoilState } from 'recoil'
import { currentUserState } from '../../../atoms/userAtoms'
// import { Spinner } from "@ui/generic/Spinner";
// import { themebgColors } from "../../statics/colors";
// import { useUser } from "../../hooks/useUser";

export const Footer = () => {
  const [currentUser, setUser] = useRecoilState(currentUserState)
  // const { isPending, data } = useUser();
  const navigate = useNavigate()

  const handleLogOut = () => {
    localStorage.removeItem('userName')
    localStorage.removeItem('accessToken')
    setUser({ name: '', login: false })
    navigate('/')
  }
  // if (isPending) return <Spinner />;

  // const theme = data.data.data.theme;

  return (
    <footer className={`px-8 py-4`}>
      <div className='mb-14 flex gap-6 text-sm'>
        <Link to='/about'>
          <p className='border-b-4 border-b-transparent text-sm transition duration-200 hover:border-b-red-light sm:text-base'>
            About
          </p>
        </Link>
        <Link to='/contact'>
          <p
            className='border-b-4 
          border-b-transparent text-sm transition duration-200 hover:border-b-yellow-light sm:text-base'
          >
            Contact
          </p>
        </Link>

        {/* <button
          onClick={currentUser.login ? handleLogOut : () => navigate("/login")}
          className="transition 
          border-b-transparent duration-200 border-b-4 hover:border-b-sky-default block text-sm sm:text-base"
        >
          {currentUser.login ? "Log out" : "Log in"}
        </button> */}
      </div>
      <div className='flex  items-end justify-end gap-5'>
        <small className='text-start text-xs sm:text-center sm:text-sm'>
          GENGO was created by Sakura
        </small>

        <Hanko size='sm' src='/sakura.webp' />
      </div>
    </footer>
  )
}
