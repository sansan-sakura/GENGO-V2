import { Outlet } from 'react-router-dom'
const delays = [
  'animation-delay-100',
  'animation-delay-200',
  'animation-delay-300',
  'animation-delay-400',
  'animation-delay-500',
  'animation-delay-600',
  'animation-delay-700',
]

export default function AuthLayout() {
  return (
    <div className=''>
      <div className='absolute -top-[600px] left-5 overflow-hidden sm:left-10 md:left-20'>
        {Array.from({ length: 5 }, (_, i) => (
          <h1
            key={Math.random() * (10 * i)}
            className={`h-fit animate-move font-display text-7xl font-bold text-red-light md:text-[100px] ${delays[i]}`}
          >
            GENGO
          </h1>
        ))}
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
