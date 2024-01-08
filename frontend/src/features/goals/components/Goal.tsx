// import { useUser } from '../../../../hooks/useUser'

import ErrorBoundary from '../../../ui/generic/ErrorBoundary'
import { Spinner } from '../../../ui/generic/Spinner'
import { Skeleton } from '../../../ui/shadcn/Skelton'
import { GoalInputField } from './GoalInput'

export const Goals = () => {
  //   const { isPending, data } = useUser()
  //   if (isPending) return <Spinner />
  //   const goals = data.data.data
  //   console.log('goals')
  return (
    <ErrorBoundary fallback={<p>error</p>}>
      <div className='mb-16 w-full'>
        <h2 className='mb-12 w-full text-center text-3xl text-red-dark '>My Goals</h2>

        <div className='mx-auto my-3 flex w-10/12 flex-col gap-14 gap-y-6 md:grid-cols-2'>
          <div className='w-full '>
            <GoalInputField
              //   storedValue={goals.todayGoal}
              label="Today's Goal"
              objKey='todayGoal'
            />
          </div>
          <div className='w-full '>
            <GoalInputField
              //   storedValue={goals.monthlyGoal}
              label='Monthly Goal'
              objKey='monthlyGoal'
            />
          </div>
          <div className='w-full '>
            <GoalInputField
              //   storedValue={goals.yearlyGoal}
              label='Yearly Goal'
              objKey='yealyGoal'
            />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  )
}
