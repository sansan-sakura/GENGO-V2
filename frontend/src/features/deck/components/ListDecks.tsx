import { Modal } from '../../../ui/generic/Modal'
import { useRecoilState } from 'recoil'
import { modalIDstate, modalState } from '../../../atoms/commonAtoms'
import { CardDeck } from './CardDeck'
import { SelectCategory } from '../../../ui/generic/SelectCategory'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../../ui/shadcn/Pagination'
import { PopoverCustom } from '../../../ui/generic/Popover/PopoverCustom'
import { InputCreateCategory } from '../../category/components/InputCreateCategory'
import { InputCreateDeck } from './InputCreateDeck'
import { UpdateCategoryField } from '../../category/components/UpdateCategoryField'
export const ListDecks = () => {
  const [modalId, setModalId] = useRecoilState(modalIDstate)
  return (
    <>
      <div className='relative mx-auto flex h-full w-fit flex-col items-center justify-around gap-12 lg:gap-16'>
        <div className='flex w-full justify-between'>
          <h1 className='text-2xl font-semibold uppercase text-blue-dark'>Decks</h1>
          <div>
            <p className='mb-1 text-xs font-semibold'>Filter By Category</p>
            <SelectCategory />
          </div>
        </div>
        <div className='w-fitgrid-cols-1 mx-auto grid gap-x-10  gap-y-10 md:grid-cols-2 lg:gap-x-20'>
          <CardDeck />
          <CardDeck />
          <CardDeck />
          <CardDeck />
        </div>
        <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href='#' />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href='#'>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href='#' />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

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
