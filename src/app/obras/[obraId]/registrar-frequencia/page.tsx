'use client'
import { BackIcon } from '@/components/Icons'
import Skeleton from '@/components/Skeleton'
import { useHttpGet, useHttpPost } from '@/hook/api'
import { useRouter } from 'next/navigation'

import Select from '@/components/ReactSelect'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import ButtonSubmit from '@/components/ButtonSubmit'
import { DropDownObras, DropDownUser } from '@/components/DropDown'
import TextInput from '@/components/Input'

type Props = {
  params: { obraId: string }
}
type FormValues = {
  name: string
  worker: string
}
type TObr = {
  work: string
}

export default function Register({ params }: Props) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>()
  const [error, setError] = useState('')
  const [loading, setIsLoading] = useState(false)
  const router = useRouter()
  const [obra, setObra] = useState()
  const {
    data: works,
    error: errorRequest,
    isLoading
  } = useHttpGet<TObr[]>(`/api/obras/${params.obraId}`)

  function handleRoute() {
    router.back()
  }

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log(data)
      setIsLoading(true)
      setError('')
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const response = await useHttpPost<FormValues>({
        url: '/api/register',
        data
      })

      console.log(data)

      //   router.replace('/app')
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
              Registro de Diária - Funcionário
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
          <div className='w-full flex'>
            <TextInput
              name='work'
              defaultValue='Obra 1'
              disabled={true}
              control={control}
            />
          </div>
          <div className='w-full flex mt-2'>
            <DropDownUser
              title={'Selecione o Funcionario'}
              control={control}
              name='worker'
            />
          </div>
          <div className='flex mt-3'>
            <div className='w-full md:w-full mb-6 md:mb-0'>
              <ButtonSubmit text='Salvar' type='submit' loading={loading} />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
