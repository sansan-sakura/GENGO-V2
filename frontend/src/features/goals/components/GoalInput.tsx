import { useState } from 'react'
import CheckIcon from '@mui/icons-material/Check'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline'
import { FaSquareCheck } from 'react-icons/fa6'

// import { useEditUser } from '../../../../hooks/useEditUser'
// import { User } from '../../../../types/userType'
import { Label } from '../../../ui/shadcn/Label'
import { Input } from '../../../ui/shadcn/Input'
import { BiEditAlt } from 'react-icons/bi'

export const GoalInputField = ({
  storedValue,
  label,
  objKey,
  centerText = true,
}: {
  storedValue?: string
  label: string
  objKey: string
  centerText?: boolean
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(storedValue)
  //   const { editUser } = useEditUser()

  //   const handleUpdateGoal = () => {
  //     if (objKey !== 'password' && (value === '' || value === storedValue)) return
  //     if (objKey === 'password' && value.length < 8)
  //       return alert('Password should be longer than 8 letters')

  //     if (objKey === 'name' && value.length < 3)
  //       return alert('Name should be longer than 3 letters')
  //     const newGoal = { [objKey]: value } as User

  //     editUser(newGoal)
  //   }

  return (
    <div className='mx-auto w-full max-w-[600px] break-words'>
      {isEditing ? (
        <div
          className={`flex flex-col ${
            centerText ? 'items-center justify-center' : ''
          } relative gap-4`}
        >
          <Label
            className='text-base font-bold uppercase leading-normal'
            htmlFor={objKey}
          >
            {label}
          </Label>
          <div className='flex gap-2'>
            <Input
              defaultValue={value}
              className='text-center text-lg'
              onChange={(e) => setValue(e.target.value)}
            />
            <button
              onClick={() => {
                setIsEditing((prev) => !prev)
                // handleUpdateGoal()
              }}
            >
              <FaSquareCheck className=' items-stretch text-3xl text-red-dark' />
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`flex flex-col ${centerText ? 'justify-center text-center' : ''} `}
        >
          <div
            className={`flex w-full items-center gap-2  ${
              centerText ? 'justify-center' : ''
            }`}
          >
            <Label className='text-base font-bold uppercase leading-normal'>
              {label}
            </Label>
            <button onClick={() => setIsEditing((prev) => !prev)}>
              <BiEditAlt className='text-base text-stone-400 transition-colors duration-300 hover:text-stone-700' />
            </button>
          </div>
          <p className='break-word mt-4 text-lg ' onClick={() => console.log('edit')}>
            {value}
          </p>
        </div>
      )}
    </div>
  )
}
