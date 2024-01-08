import { Input } from '../../../ui/shadcn/Input'
import { Label } from '../../../ui/shadcn/Label'
import { Toaster } from '../../../ui/shadcn/toaster'
import { ButtonSubmit } from '../../../ui/buttons/Button/ButtonSubmit'

import { SelectCategory } from '../../../ui/generic/SelectCategory'

export const InputEditDeck = () => {
  return (
    <>
      <Toaster />
      <form className='flex flex-col items-center gap-10'>
        <div className='flex w-full flex-col gap-2'>
          <Label>Title</Label>
          <Input />
        </div>
        <SelectCategory />
        <ButtonSubmit>Submit</ButtonSubmit>
      </form>
    </>
  )
}
