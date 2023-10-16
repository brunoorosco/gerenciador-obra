'use client'
import { BackIcon } from '@/components/Icons'
import { useHttpGet } from '@/hook/api'
import { useRouter } from 'next/navigation'

export default function Obras() {
  const router = useRouter()
  const { data, error, isLoading } = useHttpGet<any[]>(`/api/obras`)
  function handleRoute() {
    router.back()
  }
  return (
    <div className='container max-w-lg flex flex-col items-center mx-auto p-3'>
      <div className='flex w-full px-4 py-5 mb-2 bg-white border rounded-md shadow sm:px-6 dark:bg-gray-800'>
        <div className='flex-1'>
          <h3 className='text-lg font-medium leading-6 text-gray-900 dark:text-white'>
            Obras
          </h3>
          <p className='mt-1 text-sm text-gray-500 dark:text-gray-200'>
            Andamento e Encerradas.
          </p>
        </div>
        <div className='flex text-right'>
          <a
            onClick={() => {
              handleRoute()
            }}
            className='cursor-pointer'
          >
            <BackIcon />
            <span className='text-xs'>Voltar</span>
          </a>
        </div>
      </div>
      <ul className='flex flex-col w-full'>
        {data?.map((obra: any, index: number) => (
          <li className='flex flex-row mb-2 border-gray-400' key={index}>
            <div className='transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4'>
              <div className='w-full pl-1 md:mr-16'>
                <div className='font-medium dark:text-white'>{obra.work}</div>
                <div className='dark:text-gray-200'>
                  <span className='text-xs text-gray-600'>Valor da Obra </span>
                  <span className='text-xs font-semibold'>
                    {obra.priceWork}
                  </span>
                </div>
                <div className='dark:text-gray-200'>
                  <span className='text-xs text-gray-600'>Gastos da Obra </span>
                  <span className='text-xs font-semibold'>
                    {obra.workExpense || 'R$ -'}
                  </span>
                </div>
              </div>
              <div className='w-40 pl-1 md:mr-10'>
                <div className='font-semibold dark:text-white'>Total</div>

                <div className='text-xs font-semibold text-gray-600 dark:text-gray-200'>
                  {obra.totalWork}
                </div>
              </div>
              <button className='flex justify-end w-10 text-right'>
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
    </div>
  )
}
