'use client'
import { BackIcon } from '@/components/Icons'
import Skeleton from '@/components/Skeleton'
import { useHttpGet } from '@/hook/api'
import { useRouter } from 'next/navigation'

export default function DadosFuncionario() {
  const { data, error, isLoading } = useHttpGet<any[]>(`/api/funcionarios`)
  const router = useRouter()
  function handleRoute() {
    router.back()
  }

  return (
    <div className='container max-w-lg flex flex-col items-center mx-auto p-3'>
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          <div className='flex flex-col items-center justify-center w-full mx-auto'>
            <div className='flex justify-between w-full px-4 py-5 mb-2 bg-white border rounded-md shadow sm:px-6 dark:bg-gray-800'>
              <div className='flex-1'>
                <h3 className='text-lg font-medium leading-6 text-gray-900 dark:text-white'>
                  Funcionário
                </h3>
                <p className='max-w-2xl mt-1 text-sm text-gray-500 dark:text-gray-200'>
                  Nome
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
          </div>
        </>
      )}
    </div>
  )
}
