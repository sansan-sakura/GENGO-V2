import { useState, useEffect } from 'react'
// import { Label } from '../Flashcard/Label'

import { CardType } from '../../../types/flashcardTypes'
import { Spinner } from '../../../ui/generic/Spinner'
import { labels, labelsColors } from '../../../statics/colors'

import { Button } from '../../../ui/shadcn/Button'
import { Progress } from '../../../ui/shadcn/Progress'
import { PopoverCustom } from '../../../ui/generic/Popover/PopoverCustom'
import { useRecoilState } from 'recoil'
import { modalIDstate } from '../../../atoms/commonAtoms'
import { Modal } from '../../../ui/generic/Modal'
import { InputCreateFlashcard } from '../../flashcard'
import { InputUpdateFlashcard } from '../../flashcard/components/InputUpdateFlashcard'
import { useParams } from 'react-router-dom'
import { useDeck } from '../hooks/useDeck'
import { useEditFlashcard } from '../../flashcard/hooks/useEditFlashcard'

const status = ['easy', 'okay', 'hard', 'very hard']
export const Deck = ({ cards }: { cards?: Array<CardType> }) => {
  const [progress, setProgress] = useState(0)
  const [isChecked, setIsChecked] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentCard, setCurrentCard] = useState<CardType>()
  const [isFinished, setIsFinished] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalId, setModalId] = useRecoilState(modalIDstate)
  const { id: deckId } = useParams()

  const { isLoading, deck, error } = useDeck(deckId)
  const { isEditing, editFlashcard, isError: isEditError } = useEditFlashcard()
  useEffect(() => {
    if (deck?.cards.length === 0) return
    setCurrentCard(deck.cards[currentIndex])
  }, [deck?.cards, setCurrentCard, currentIndex])

  useEffect(() => {
    setProgress(((currentIndex + 1) / deck?.cards.length) * 100)
  }, [currentIndex, setProgress, deck?.cards.length])

  const handleClick = (id: string, status: string) => {
    if (deck?.cards.length === currentIndex + 1) setIsFinished(true)
    if (deck?.cards.length > currentIndex + 1) setCurrentIndex((prev) => prev + 1)
    setIsChecked(false)
    editFlashcard({ id, newData: { status } })
  }

  const handlePlayAgain = () => {
    setCurrentIndex(0)
    setIsFinished(false)
  }

  if (isLoading) return <Spinner />
  if (error) return <p>Something went wrong</p>

  if (deck?.cards.length === 0)
    return (
      <div className='flex flex-col items-center justify-center'>
        <h3 className='text-lg font-bold'>Please add flashcards🤖</h3>
        <p className='mt-2 text-center'>Deck is empty</p>
      </div>
    )

  if (isFinished)
    return (
      <div className='flex h-full flex-col items-center justify-center gap-10 text-center'>
        <p className='text-lg font-semibold text-blue-dark sm:text-2xl'>
          This deck has no more cards to review
        </p>

        <Button variant='blue' size='lg' onClick={handlePlayAgain}>
          Again
        </Button>
      </div>
    )

  return (
    <>
      <div className='relative flex  h-full flex-col items-center'>
        <Progress value={progress} />
        <div className='flex h-full w-fit flex-col items-center justify-center gap-14'>
          {currentCard && (
            <>
              {!isChecked ? (
                <>
                  <h3 className='text-lg  sm:text-2xl'>{currentCard.question}</h3>
                  <Button
                    onClick={() => setIsChecked(true)}
                    variant={'blue'}
                    className='mx-auto uppercase text-white'
                  >
                    Check
                  </Button>
                </>
              ) : (
                <>
                  <h3 className=' text-lg sm:text-2xl'>{currentCard.answer}</h3>
                  <div className='text-end'>
                    <div className='flex gap-2'>
                      {status.map((item) => (
                        <Button
                          onClick={() => handleClick(currentCard._id ?? '', item)}
                          variant={'blue'}
                          className='mx-auto uppercase  text-white'
                        >
                          {item}
                        </Button>
                      ))}
                    </div>
                    <p className='mt-1 text-xs'>last status: {currentCard.status}</p>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <PopoverCustom>
          <div className='grid items-center gap-2 font-semibold text-blue-dark'>
            <button
              className='transition-none hover:brightness-150'
              onClick={() => setModalId('modal/addFlashcard')}
            >
              Add Flashcard
            </button>
            <button
              onClick={() => setModalId('modal/updateFlashcard')}
              className='transition-none hover:brightness-150'
            >
              Edit Flashcard
            </button>
          </div>
        </PopoverCustom>
      </div>

      {modalId === 'modal/addFlashcard' && (
        <Modal header='Add New Flashcard' id='modal/addFlashcard'>
          <InputCreateFlashcard deckId={deckId ?? ''} />
        </Modal>
      )}
      {modalId === 'modal/updateFlashcard' && (
        <Modal header='Add New Flashcard' id='modal/updateFlashcard'>
          <InputUpdateFlashcard cards={deck?.cards ?? []} />
        </Modal>
      )}
    </>
  )
}
