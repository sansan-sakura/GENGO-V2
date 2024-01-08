import { ContentFrame } from '../ui/layoutParts/ContentFrame'
import { welcomeText as text } from '../statics/texts'
import { Button } from '../ui/buttons/Button'
import { useUser } from '@clerk/clerk-react'

export const IndexPage = () => {
  const { isSignedIn } = useUser()
  return (
    <section className='min-h-screen overflow-y-hidden'>
      <div className='mx-auto mt-[300px] w-[90%] min-w-80 max-w-[600px] rounded-lg bg-amber-50'>
        <ContentFrame>
          <div className='px-10 pb-5'>
            <h2 className='mb-2 text-center text-3xl text-blue-dark md:mb-4 md:text-4xl'>
              Hi there <span className='text-2xl md:text-3xl'>📕</span>
            </h2>
            <div className='mb-4 text-base leading-10 md:mb-10 md:text-lg'>
              <p className='text-blue-dark'>{text.en.text}</p>
            </div>
            <Button
              type='link'
              path={isSignedIn ? '/dashboard' : '/sign-in'}
              bgColor='bg-blue-dark'
              fontColor='text-amber-100'
              borderColor='border-amber-100'
              text='start'
            />
          </div>
        </ContentFrame>
      </div>
    </section>
  )
}
