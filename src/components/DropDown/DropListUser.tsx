import { useHttpGet } from '@/hook/api'
import { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import { filtered } from './function'
import Skeleton from '../Skeleton'

type DropdownProps = {
  title: string
  name: string
  error?: string | undefined
  control: any
}
type TFunc = {
  name: string
  office: string
  priceDay: string
}

export function DropDownUser({ title, name, control, error }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [items, setItems] = useState<string[]>()
  const { data: workers, isLoading } = useHttpGet<TFunc[]>(`/api/funcionarios`)
  // const response = await fetch('/api/funcionarios', {
  //   cache: 'no-store'
  // })

  useEffect(() => {
    if (workers) {
      const filteredItems = filtered(workers, 'name')
      setItems(filteredItems)
    }
  }, [workers])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className='w-full flex flex-col my-2'>
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          <a
            className='bg-gray-300  p-4 rounded-t w-full dark:bg-zinc-700 dark:text-gray-300'
            onClick={toggleDropdown}
          >
            {title}
          </a>
          {isOpen && (
            <div className='flex flex-col p-3 bg-slate-100 text-zinc-600 dark:bg-zinc-400 '>
              {items?.map((item: any) => (
                <label key={item} className='flex items-center mb-3 space-x-3'>
                  <Controller
                    name={`${name}.${item}`}
                    control={control}
                    render={({ field }) => (
                      <input
                        className='form-tick bg-white bg-check h-6 w-6 border-gray-300 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none'
                        type='checkbox'
                        {...field}
                      />
                    )}
                  />
                  <span className='font-normal text-gray-700 dark:text-white'>
                    {item}
                  </span>
                </label>
              ))}
            </div>
          )}
          {error && <p className='text-red-400 text-sm block mt-2'>{error}</p>}
        </>
      )}
    </div>
  )
}
