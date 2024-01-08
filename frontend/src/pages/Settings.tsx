import { UserProfile } from '@clerk/clerk-react'

export const SettingsPage = () => {
  return (
    <div className='flex items-center pt-20 '>
      <UserProfile
        path='/settings'
        appearance={{
          variables: {
            colorPrimary: '#E55039',
            colorTextSecondary: '#000',
            fontWeight: {
              normal: '400',
              medium: '600',
              bold: '700',
            },
          },
          elements: {
            rootBox: 'h-10/12 max-h-[800px]',
            card: 'h-10/12 max-h-[800px] mt-6 shadow-lg  bg-amber-50',
            headerTitle: 'text-2xl text-blue-dark',
          },
        }}
      />
    </div>
  )
}
