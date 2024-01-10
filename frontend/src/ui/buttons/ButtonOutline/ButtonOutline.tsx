import { Link } from 'react-router-dom'

export const ButtonOutline = ({
  name,
  bg,
  path = '#',
  type = 'link',
  defaultBg = 'bg-white',
  borderColor = 'border-black',
  textColor = 'text-black',
}: {
  name: string
  bg: string
  path?: string
  type?: string
  defaultBg?: string
  borderColor?: string
  textColor?: string
}) => {
  const styleLink =
    'group relative block h-10 w-[140px] sm:h-14 sm:w-[180px] shadow-md mx-auto rounded-sm transparent'

  if (type === 'a') {
    return (
      <a href={path} className={styleLink}>
        <span
          className={`absolute inset-0 border-2 border-dashed ${borderColor} transparent inline overflow-hidden rounded-sm ${bg}`}
        ></span>

        <div
          className={`relative flex h-full transform items-center justify-center  rounded-sm border bg-amber-50 ${borderColor} ${defaultBg}  transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2`}
        >
          <div className='p-1.5 transition-opacity group-hover:absolute lg:p-2 '>
            <p
              className={`text-center text-sm font-medium sm:text-lg lg:text-[22px] ${textColor}`}
            >
              {name}
            </p>
          </div>
        </div>
      </a>
    )
  }

  return (
    <Link to={path} className={styleLink}>
      <span
        className={`absolute inset-0 border-2 border-dashed ${borderColor} transparent inline overflow-hidden rounded-sm ${bg}`}
      ></span>

      <div
        className={`relative flex h-full  transform items-center  justify-center rounded-sm border   ${borderColor} ${defaultBg} overflow-hidden transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2`}
      >
        <div className='flex h-full w-full items-center justify-center bg-amber-50 p-1.5 transition-opacity group-hover:absolute lg:p-2'>
          <p
            className={`text-center text-sm font-medium sm:text-lg lg:text-[22px] ${textColor}`}
          >
            {name}
          </p>
        </div>
      </div>
    </Link>
  )
}
