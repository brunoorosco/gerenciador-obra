'use client'
import { BackIcon } from '@/components/Icons'
import { useHttpPost } from '@/hook/api'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm, useFormState } from 'react-hook-form'
import ButtonSubmit from '@/components/ButtonSubmit'
import { DropDownObras, DropDownUser } from '@/components/DropDown'
import TextInput from '@/components/Input'
import Alert from '@/components/Alert'

type Props = {
  params: { obraId: string }
}
type FormValues = {
  work: string
  worker: string
  date: string
}

export default function Register({ params }: Props) {
  const { control, handleSubmit, formState, setError, reset } =
    useForm<FormValues>()
  const [errorUser, setErrorUser] = useState(false)
  const [loading, setIsLoading] = useState(false)
  const router = useRouter()
  const [errorsForm, setErrosForm] = useState(true)
  const [alert, setAlert] = useState(false)
  const [dataAtual, setDataAtual] = useState(
    new Date().toISOString().slice(0, 10)
  )

  function handleRoute() {
    router.back()
  }

  const onSubmit = handleSubmit(async (data: FormValues) => {
    try {
      isError(data)
      setIsLoading(true)
      console.log(errorUser, errorsForm)
      if (!errorUser && !errorsForm) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const response = await useHttpPost<FormValues>({
          url: '/api/register',
          data
        })

        if (response.length > 0) {
          setAlert(true)
          setTimeout(() => setAlert(false), 3000)
        }
        //   router.replace('/app')
      }
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log('[LOGIN_ERROR]: ', error)
    }
  })

  const isError = (data: FormValues) => {
    setErrosForm(true)
    if (data.work == '' || data.work == undefined) {
      setError('work', {
        type: 'manual',
        message: 'Selecione uma obra!'
      })
    } else {
      setErrosForm(false)
    }
    setErrorUser(true)
    if (data.worker === undefined) {
      setErrorUser(true)
    } else {
      const hasTrue = Object.values(data?.worker).some(
        (value: any) => value === true
      )
      hasTrue ? setErrorUser(false) : setErrorUser(true)
    }
  }

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
          {alert && (
            <Alert title='Sucesso!' type='Success'>
              Salvo com sucesso
            </Alert>
          )}
          <div className='w-full flex mt-2'>
            <DropDownObras
              control={control}
              title={'Selecione uma Obra'}
              name='work'
              errors={formState.errors}
            />
          </div>
          <div className='w-full flex'>
            <TextInput
              name='date'
              defaultValue={dataAtual}
              control={control}
              required
              type='date'
              addClass='text-center'
            />
          </div>
          <div className='w-full flex'>
            <DropDownUser
              title={'Selecione o Funcionário'}
              control={control}
              name='worker'
              errors={errorUser}
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
