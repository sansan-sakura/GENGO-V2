import { Link } from 'react-router-dom'
import { Button } from '../ui/shadcn/Button'

export const DashboardPage = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <h1 className='mb-4 font-display text-4xl text-blue-dark'>Welcome to Gengo!</h1>

      <Button asChild size={'lg'}>
        <Link to='/decks'>Start </Link>
      </Button>

      <div className='grid max-h-[400px] max-w-[600px] gap-4 overflow-scroll px-2 py-4 [&>blockquote]:rounded [&>blockquote]:bg-slate-100 [&>blockquote]:px-3 [&>blockquote]:py-4 [&>blockquote]:text-sm [&>blockquote]:italic'>
        <blockquote>
          “The limits of my language mean the limits of my world.” Ludwig Wittgenstein
        </blockquote>
        <blockquote>
          “One language sets you in a corridor for life. Two languages open every door
          along the way.” Frank Smith
        </blockquote>
        <blockquote>
          “Language is the road map of a culture. It tells you where its people come from
          and where they are going.” Rita Mae Brown
        </blockquote>
        <blockquote>
          “He who knows no foreign languages knows nothing of his own.” Johann Wolfgang
          von Goethe
        </blockquote>
        <blockquote>
          “You can never understand one language until you understand at least two.”
          Geoffrey Willans
        </blockquote>
        <blockquote>
          “If you talk to a man in a language he understands, that goes to his head. If
          you talk to him in his own language, that goes to his heart.” Nelson Mandela
        </blockquote>
        <blockquote>
          “To have another language is to possess a second soul.” Charlemagne “Change your
          language and you change your thoughts.” Karl Albrecht
        </blockquote>
      </div>
    </div>
  )
}
