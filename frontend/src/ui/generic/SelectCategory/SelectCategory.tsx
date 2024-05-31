import { Dispatch, SetStateAction } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../../ui/shadcn/Select'

import { useCategory } from '../../../features/category/category/useCategory'

type Props = {
  onChange?: Dispatch<SetStateAction<string>>
  defaultValue?: string
}
export const SelectCategory = ({ onChange, defaultValue }: Props) => {
  const { isPending, categories, error } = useCategory()
  if (isPending || error) return
  return (
    <Select onValueChange={onChange} defaultValue={defaultValue}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Select a Category' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Category</SelectLabel>
          <SelectItem value='all'>All</SelectItem>
          {categories.map((item) => (
            <SelectItem value={item._id} key={item._id}>
              {item.category}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
