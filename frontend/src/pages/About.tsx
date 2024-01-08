import { Hanko } from '../ui/generic/Hanko'
import { ContentFrame } from '../ui/layoutParts/ContentFrame'
import { aboutText } from '../statics/texts'

export const AboutPage = () => {
  return (
    <section>
      <div className='w-fit rounded-lg bg-amber-50'>
        <ContentFrame>
          <div className='px-10 py-5 '>
            <h3 className='text-center font-display text-4xl font-semibold text-red-dark'>
              GENGO
            </h3>
            <div className='mt-6 w-10/12 max-w-[500px] text-sm leading-6 text-stone-700 sm:mt-8 sm:text-base sm:leading-7 '>
              {aboutText.en.text}
            </div>
            <div className='flex w-full justify-end'>
              <Hanko src='/sakura.webp' size='sm' />
            </div>
          </div>
        </ContentFrame>
      </div>
    </section>
  )
}
