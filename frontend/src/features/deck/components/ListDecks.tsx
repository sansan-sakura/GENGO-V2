import { Modal } from '../../../ui/generic/Modal'
import { useRecoilState } from 'recoil'
import { modalIDstate } from '../../../atoms/commonAtoms'
import { CardDeck } from './CardDeck'
import { SelectCategory } from '../../../ui/generic/SelectCategory'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../../ui/shadcn/Pagination'
import { PopoverCustom } from '../../../ui/generic/Popover/PopoverCustom'
import { InputCreateCategory } from '../../category/components/InputCreateCategory'
import { InputCreateDeck } from './InputCreateDeck'
import { UpdateCategoryField } from '../../category/components/UpdateCategoryField'
import { useDecksWithCategory } from '../hooks/useDecksWithCategory'
import { Spinner } from '../../../ui/generic/Spinner'
import { useCallback, useEffect, useState } from 'react'
import {
  ALL_DECK_DATES_URL,
  DECK_WITH_DATE_CATEGOY_URL,
} from '../../../statics/fetchUrls'
import { useAuth } from '@clerk/clerk-react'

const NUM_ITEMS_PER_PAGE = 6
export const ListDecks = () => {
  const [modalId, setModalId] = useRecoilState(modalIDstate)
  const [currentCategory, setCurrentCategory] = useState('all')
  const [query, setQuery] = useState('')
  const [totalCards, setTotalCards] = useState(0)
  const { isPending, decksWithQuery, error } = useDecksWithCategory(
    currentCategory,
    query,
  )
  const [currentPage, setCurrentPage] = useState(1)
  const { getToken } = useAuth()

  // get total number of decks  for pagination
  const countNumOfDecks = useCallback(async () => {
    try {
      const res = await fetch(
        currentCategory === 'all'
          ? ALL_DECK_DATES_URL(query)
          : DECK_WITH_DATE_CATEGOY_URL(currentCategory, query),
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            'Content-Type': 'application/json',
          },
        },
      )
      const data = await res.json()

      if (data.status === 'fail' || data.status === 'error') {
        throw new Error(data.message)
      }

      return data
    } catch (err: any) {
      throw new Error("Couldn't get dates")
    }
  }, [query, currentCategory])

  useEffect(() => {
    ;(async () => {
      const numofDecks = await countNumOfDecks()
      console.log(numofDecks)
      setTotalCards(numofDecks?.results ?? 0)
    })()
  }, [query, currentCategory, decksWithQuery])

  useEffect(() => {
    setQuery(`/?page=${currentPage}`)
  }, [currentPage])

  useEffect(() => {
    setCurrentPage(1)
  }, [query, currentCategory])

  console.log(query, currentCategory)

  if (isPending) return <Spinner />
  if (error) return <p>Something went wrong while fetching decks</p>

  const handleNext = () => {
    if (currentPage >= totalCards / NUM_ITEMS_PER_PAGE) return
    setCurrentPage(currentPage + 1)
  }
  const handlePrevious = () => {
    if (currentPage <= 1) return
    setCurrentPage(currentPage - 1)
  }

  return (
    <>
      <div className='relative mx-auto grid h-full w-full max-w-[900px] grid-rows-[auto_1fr_auto] items-center gap-12 lg:gap-16'>
        <div className='flex min-w-full justify-between'>
          <h1 className='text-2xl font-semibold uppercase text-blue-dark'>Decks</h1>
          <div>
            <p className='mb-1 text-xs font-semibold'>Filter By Category</p>
            <SelectCategory
              onChange={(value) => setCurrentCategory(value)}
              defaultValue={currentCategory}
            />
          </div>
        </div>
        <div className='mx-auto grid h-full w-fit grid-cols-1  gap-x-10 gap-y-10 md:grid-cols-2 lg:gap-x-20'>
          {decksWithQuery?.data?.deck.map((deck: any) => (
            <CardDeck key={deck._id} card={deck} />
          ))}
        </div>

        {/* pagination */}
        <div>
          {totalCards > NUM_ITEMS_PER_PAGE && (
            <Pagination>
              <PaginationContent>
                <PaginationPrevious onClick={handlePrevious} />

                <PaginationItem>{currentPage}</PaginationItem>

                <PaginationNext onClick={handleNext} />
              </PaginationContent>
            </Pagination>
          )}
        </div>

        {/* Pop up to open modals */}
        <PopoverCustom>
          <div className='grid items-center gap-2 font-semibold text-blue-dark'>
            <button
              className='transition-none hover:brightness-150'
              onClick={() => {
                setModalId('createDeck')
              }}
            >
              Add Deck
            </button>
            <button
              className='transition-none hover:brightness-150'
              onClick={() => {
                setModalId('createCategory')
              }}
            >
              Add Category
            </button>
            <button
              className='transition-none hover:brightness-150'
              onClick={() => {
                setModalId('updateCategory')
              }}
            >
              Edit Category
            </button>
          </div>
        </PopoverCustom>
      </div>

      {/* Modals --create deck and category, update category-- */}
      {modalId === 'createDeck' && (
        <Modal header='Create a Deck' id='createDeck'>
          <InputCreateDeck />
        </Modal>
      )}
      {modalId === 'createCategory' && (
        <Modal header='Create a Category' id='createCategory'>
          <InputCreateCategory />
        </Modal>
      )}
      {modalId === 'updateCategory' && (
        <Modal
          header='Update Category'
          id='updateCategory'
          customContentClass='max-w-[360px]'
        >
          <UpdateCategoryField />
        </Modal>
      )}
    </>
  )
}
