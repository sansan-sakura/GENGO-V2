import { InputEditDeck } from './InputEditDeck'
import { Modal } from '../../../ui/generic/Modal'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { modalState } from '../../../atoms/commonAtoms'
import { CardDeck } from './CardDeck'
import { SelectCategory } from '../../../ui/generic/SelectCategory'
import { IoAddSharp } from 'react-icons/io5'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../../ui/shadcn/Pagination'
import { Popover, PopoverContent, PopoverTrigger } from '../../../ui/shadcn/Popover'
import { PopoverCustom } from '../../../ui/generic/Popover/PopoverCustom'
export const ListDecks = () => {
  const setIsModalOpen = useSetRecoilState(modalState)
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
            <button className='transition-none hover:brightness-150'>Add Category</button>
            <button className='transition-none hover:brightness-150'>Add Deck</button>
          </div>
        </PopoverCustom>
      </div>
      <Modal header='Create Deck'>
        <InputEditDeck />
      </Modal>
      <Modal header='Create a Category'>
        <InputEditDeck />
      </Modal>
    </>
  )
}
