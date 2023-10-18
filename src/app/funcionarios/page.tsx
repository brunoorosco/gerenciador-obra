'use client'
import Skeleton from '@/components/Skeleton'
import { useHttpGet } from '@/hook/api'

export default function Funcionarios() {
  const { data, isLoading } = useHttpGet<any[]>(`/api/funcionarios`)

  return (
    <>
      {isLoading ? (
        <Skeleton />
      ) : (
        <ul className='flex flex-col w-full'>
          {data?.map((funcionario: any, index: number) => (
            <li className='flex flex-row mb-2 border-gray-400' key={index}>
              <div className='transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4'>
                <div className='w-full pl-1'>
                  <div className='font-medium dark:text-white'>
                    {funcionario.name}
                  </div>
                  <div className='text-sm text-gray-600 dark:text-gray-200'>
                    {funcionario.office}
                  </div>
                  <div className='dark:text-white text-sm'>
                    <span>Diária </span>
                    <span className='text-gray-600 dark:text-gray-200'>
                      {funcionario.priceDay}
                    </span>
                  </div>
                </div>
                <button className='flex justify-end w-24 text-right'>
                  <svg
                    width={12}
                    fill='currentColor'
                    height={12}
                    className='text-gray-500 hover:text-gray-800 dark:hover:text-white dark:text-gray-200'
                    viewBox='0 0 1792 1792'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z'></path>
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
