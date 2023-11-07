'use client'
import { BackIcon } from '@/components/Icons'
import { useHttpGet } from '@/hook/api'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import ButtonSubmit from '@/components/ButtonSubmit'
import TextInput from '@/components/Input'
import Skeleton from '@/components/Skeleton'

type Props = {
  params: { obraId: string }
}
type FormValues = {
  dataInicio: string
  dataFim: string
}

export default function Fechamento({ params }: Props) {
  const { control, handleSubmit, formState, setError } = useForm<FormValues>()
  const [errorUser, setErrorUser] = useState(false)
  const [loading, setIsLoading] = useState(false)
  const router = useRouter()
  const [errorsForm, setErrosForm] = useState(true)

  const dataRetro = new Date()
  dataRetro.setDate(dataRetro.getDate() - 15)

  const dataRetroISO = dataRetro.toISOString().split('T')[0]
  const [dataFim, setDataFim] = useState(new Date().toISOString().slice(0, 10))
  const [workers, setWorkes] = useState([])

  function handleRoute() {
    router.back()
  }

  const onSubmit = handleSubmit(async (data: FormValues) => {
    try {
      setIsLoading(true)
      console.log(data)

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const response = await fetch(
        `/api/fechamento?dataInicio=${data.dataInicio}&dataFim=${data.dataFim}`
      )

      setWorkes(await response.json())
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log('[LOGIN_ERROR]: ', error)
    }
  })

  return (
    <div className='container max-w-lg flex flex-col items-center mx-auto p-3'>
      <div className='flex flex-col items-center justify-center w-full mx-auto'>
        <div className='flex justify-between w-full px-4 py-5 mb-2 bg-white border rounded-md shadow sm:px-6 dark:bg-gray-800'>
          <div className='flex-1'>
            <h3 className='text-lg font-medium leading-6 text-gray-900 dark:text-white'>
              Fechamento - Quinzena
            </h3>
            <p className='max-w-2xl mt-1 text-sm text-gray-500 dark:text-gray-200'></p>
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
        <form className='max-md:w-full mt-5 px-1' onSubmit={onSubmit}>
          <div className='w-full flex gap-3'>
            <TextInput
              name='dataInicio'
              defaultValue={dataRetroISO}
              control={control}
              required
              type='date'
              addClass='text-center'
            />
            <TextInput
              name='dataFim'
              defaultValue={dataFim}
              control={control}
              required
              type='date'
              addClass='text-center'
            />
          </div>
          <div className='flex mt-3'>
            <div className='w-full md:w-full mb-6 md:mb-0'>
              {/* <a onClick={onSubmit}>Buscar</a> */}
              <ButtonSubmit text='Buscar' type='submit' loading={loading} />
            </div>
          </div>
        </form>
        <>
          {loading ? (
            <Skeleton />
          ) : (
            <ul className='flex flex-col w-full px-2'>
              {workers?.map((worker: any, index: number) => (
                <li className='flex flex-row mb-2 border-gray-400' key={index}>
                  <div className='transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4'>
                    <div className='w-full pl-1'>
                      <div className='font-medium dark:text-white'>
                        {worker.worker}
                      </div>
                      <div className='dark:text-white text-sm'>
                        <span>Total a receber: </span>
                        <span className='font-semibold text-zinc-700 dark:text-gray-200'>
                          {worker.payment}
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
      </div>
    </div>
  )
}
