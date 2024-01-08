import { useState } from 'react'

import { Link } from 'react-router-dom'
import { TbEdit } from 'react-icons/tb'
import { AiFillDelete } from 'react-icons/ai'
import { GiBookmarklet } from 'react-icons/gi'
import { MdOutlineEdit } from 'react-icons/md'
import { InputEditDeck } from './InputEditDeck'
import { Modal } from '../../../ui/generic/Modal'

// import { CategoryLabel } from '../Category/CategoryLabel'
import { DeckType } from '../../../types/flashcardTypes'

// import { DeleteBtn } from '../../../../ui/DeleteBtn'
// import { useDeleteDeck } from '../../hooks/deck/useDeleteDeck'
// import { CheckButton } from '../../../../ui/CheckButton'
// import { useEditDeck } from '../../hooks/deck/useEditDeck'
// import { useChooseCategoryColor } from '../../hooks/category/useChooseCategoryColor'

import { bgColors } from '../../../statics/colors'
import { Toaster } from '../../../ui/shadcn/toaster'
import { Dialog } from '@radix-ui/react-dialog'

export const CardDeck = ({ card, index }: { card?: DeckType; index?: number }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  // const { deleteDeck } = useDeleteDeck()

  // const cardCategory = card?.category?.category

  // const categoryBgColor = useChooseCategoryColor(cardCategory)

  // const handelDeleteDeck = () => {
  //   if (card._id === undefined) return
  //   const confirmDelete = confirm('Are you sure to delete this deck?')
  //   if (!confirmDelete) return null
  //   deleteDeck(card._id)
  // }

  // const { editDeck } = useEditDeck()

  // const handleChecked = () => {
  //   const id = card._id
  //   if (id === undefined) return
  //   const newData = { isChecked: !card.isChecked }
  //   editDeck({ id, newData })
  // }

  return (
    <>
      <div className='relative h-fit w-fit'>
        <Toaster />
        <div className='ease absolute -right-5 top-5 z-10 flex h-10 w-5 items-center justify-center rounded-br-md rounded-tr-md bg-yellow-default text-white transition duration-100 hover:brightness-95'>
          {/* <EditBtn handleEdit={() => setIsModalOpen(true)} color='#fff' size='16px' /> */}
          <MdOutlineEdit />
        </div>
        <div className='ease absolute -right-5 bottom-[70px] z-10 flex h-10 w-5 items-center justify-center rounded-br-md rounded-tr-md bg-red-default text-white transition duration-100 hover:brightness-95'>
          {/* <DeleteBtn handleDelete={handelDeleteDeck} color='#fff' size='16px' /> */}
          <AiFillDelete />
        </div>
        <div
          className={`ease
        absolute -right-5 bottom-5 z-10 flex h-10 w-5 items-center justify-center rounded-br-md rounded-tr-md bg-blue-dark text-white transition duration-100 hover:brightness-95`}
        >
          <GiBookmarklet />
          {/* <CheckButton
          handleCheck={handleChecked}
          color='#fff'
          size='16px'
          isChecked={card.isChecked}
        /> */}
        </div>

        <Link
          // to={`/deck/${card._id}`}
          to='#'
          className='group relative block  h-44 w-[280px] rounded-sm shadow-xl sm:w-[310px] xl:w-[360px]'
        >
          <div className='absolute -top-5 right-3 w-fit rounded-t-sm bg-red-light px-2 pb-[3px] pt-1 text-xs transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1'>
            Lang
          </div>
          <span
            className={`absolute inset-0 rounded-sm border-[0.5px] border-dashed border-black`}
          ></span>

          <div className='relative h-full transform rounded-sm border-[0.5px] border-black bg-amber-50 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1'>
            <div className='flex h-full flex-col justify-between p-2 transition-opacity sm:p-6 lg:p-4'>
              {/* <h2 className='text-xl font-medium sm:text-2xl'>{card.title}</h2> */}
              <h2 className='text-xl font-medium sm:text-2xl'>English</h2>
              <div className='flex justify-between'>
                {/* <small>{card?.cards?.length} cards</small>
              <small>created at: {card.createdAt.toString().split('T')[0]}</small> */}
                <small className='text-xs'>8 cards</small>
                <small className='text-xs'>created at: 02.01</small>
              </div>
            </div>
          </div>
        </Link>
        <Modal header='Edit Deck'>
          <InputEditDeck />
        </Modal>
      </div>
    </>
  )
}
