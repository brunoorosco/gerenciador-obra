import { useHttpGet } from '@/hook/api'
import { useEffect, useState } from 'react'
import { filtered } from './function'
import Skeleton from '../Skeleton'
import { Controller } from 'react-hook-form'

type DropdownProps = {
  title: string
  name: string
  errors: any
  control: any
}
type TObr = {
  work: string
}

export function DropDownObras({ control, name, errors, title }: DropdownProps) {
  const [items, setItems] = useState<string[]>()

  const {
    data: works,
    error: errorRequest,
    isLoading
  } = useHttpGet<TObr[]>(`/api/obras`)

  useEffect(() => {
    if (works) {
      const filteredItems = filtered(works, 'work')
      setItems(filteredItems)
    }
  }, [works])

  return (
    <div className='w-full flex flex-col my-2'>
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <select
                defaultValue={title}
                {...field}
                className='bg-gray-100  p-4 rounded-t w-full dark:bg-zinc-700 dark:text-gray-300 open:w-11'
              >
                <option disabled>{title}</option>
                {items?.map((item: any) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            )}
          />
          {errors[name] && (
            <p className='text-red-400 text-sm block mt-2'>
              {errors[name].message}
            </p>
          )}
        </>
      )}
    </div>
  )
}
