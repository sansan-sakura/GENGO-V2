import { ContentFrame } from '../ui/layoutParts/ContentFrame'
import { VscGithub } from 'react-icons/vsc'
import { PiLinkedinLogo } from 'react-icons/pi'
import { contactText } from '../statics/texts'

export const ContactPage = () => {
  return (
    <div className='rounded-lg bg-amber-50'>
      <ContentFrame>
        <div className='flex flex-col items-center px-6 py-5  '>
          <h3 className='mb-4 text-2xl text-red-dark sm:text-3xl'>Contact:</h3>
          <p className='border-b border-b-red-dark px-6 pb-5'>{contactText.en.text}</p>
          <address className='grid gap-2 pt-6 text-sm sm:text-base'>
            <h2 className='text-semibold text-center text-lg'>Sakura Tanaka</h2>
            <a
              href='to:sito6496@gmail.com'
              className='transition-all duration-300 hover:translate-y-0.5 hover:invert-[0.3] '
            >
              <p>Email : sito6496@gmail.com</p>
            </a>
          </address>
          <div className='mt-8 flex gap-8'>
            <a
              href='https://github.com/sansan-sakura'
              target='_blank'
              rel='noopener noreferrer'
            >
              <VscGithub className='text-3xl invert-[0.1]  transition-all duration-300 hover:translate-y-0.5 hover:invert-[0.3] sm:text-4xl' />
            </a>
            <a
              href='https://www.linkedin.com/in/sakura-tanaka-251a36247/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <PiLinkedinLogo className='text-3xl invert-[0.1]   transition-all duration-300 hover:translate-y-0.5 hover:invert-[0.3] sm:text-4xl' />
            </a>
          </div>
        </div>
      </ContentFrame>
    </div>
  )
}
