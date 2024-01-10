import { Dispatch, SetStateAction, useState } from 'react'
import { useCategory } from '../category/useCategory'
import { Input } from '../../../ui/shadcn/Input'
import { FaSquareCheck } from 'react-icons/fa6'
import { BiEditAlt } from 'react-icons/bi'
import { useEditCategory } from '../category/useEditCategory'

export const UpdateCategoryField = () => {
  const [isEditing, setIsEditing] = useState('')

  //   const { isPending, categories: fetchedCategory, error } = useCategory()
  //   if (isPending || error) return

  const categories = [
    { category: 'English', _id: '1' },
    { category: 'Math', _id: '2' },
    { category: 'German', _id: '3 ' },
    { category: 'German', _id: '4 ' },
    { category: 'German', _id: '5 ' },
    { category: 'German', _id: '6 ' },
    { category: 'German', _id: '7 ' },
  ]
  return (
    <div className=' max-h-[300px] overflow-y-scroll'>
      <ul className='flex flex-col items-center gap-1'>
        {categories.map((item) => {
          const { category, _id } = item
          return (
            <li className='flex min-h-[46px] items-center gap-4 px-2 py-1 text-sm font-semibold'>
              {isEditing === _id ? (
                <InputItem defaultValue={category} onEditing={setIsEditing} id={_id} />
              ) : (
                <>
                  <p className='h-fit'>{category}</p>
                  <button onClick={() => setIsEditing(_id)}>
                    <BiEditAlt className='text-base text-stone-400 transition-colors duration-300 hover:text-stone-700' />
                  </button>
                </>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function InputItem({
  defaultValue,
  onEditing,
  id,
}: {
  id: string | number
  defaultValue: string
  onEditing: Dispatch<SetStateAction<string>>
}) {
  const [updatedCategory, setUpdatedCategory] = useState(defaultValue)
  const { isEditing, editCategory, isError } = useEditCategory()
  const handleCategoryUpdate = () => {
    if (updatedCategory === '') return

    const newCategory = { id, newData: { category: updatedCategory } }
    editCategory(newCategory)
    onEditing('')
    setUpdatedCategory('')
  }

  return (
    <>
      <Input
        onChange={(e) => setUpdatedCategory(e.target.value)}
        value={updatedCategory}
      />
      <button onClick={handleCategoryUpdate}>
        <FaSquareCheck className=' items-stretch text-3xl text-red-dark' />
      </button>
    </>
  )
}
