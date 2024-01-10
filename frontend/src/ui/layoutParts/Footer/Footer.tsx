import { Link } from 'react-router-dom'
import { Hanko } from '../../generic/Hanko'

export const Footer = () => {
  return (
    <footer className={`mt-12 border-t border-t-stone-100 px-6 py-6 md:px-12 `}>
      <div className='mx-auto max-w-[700px]'>
        <div className='mb-2 flex gap-6 text-sm'>
          <Link to='/about'>
            <p className='border-b-4 border-b-transparent text-sm transition duration-200 hover:border-b-red-dark sm:text-base'>
              About
            </p>
          </Link>
          <Link to='/contact'>
            <p
              className='border-b-4 
          border-b-transparent text-sm transition duration-200 hover:border-b-blue-dark sm:text-base'
            >
              Contact
            </p>
          </Link>
        </div>
        <div className='flex  items-end justify-end gap-5'>
          <small className='text-start text-xs sm:text-center sm:text-sm'>
            GENGO was created by Sakura
          </small>

          <Hanko size='xs' src='/sakura.webp' />
        </div>
      </div>
    </footer>
  )
}
