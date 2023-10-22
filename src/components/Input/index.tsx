import React from 'react'
import { Controller } from 'react-hook-form'

type MaskFunction = (e: string) => string

export interface ITextInput extends React.HTMLProps<HTMLInputElement> {
  maxLength?: number
  name: string
  control?: any
  error?: string | undefined
  mask?: MaskFunction
  addClass?: string
}
const TextInput: React.FC<ITextInput> = ({
  maxLength,
  disabled = false,
  name,
  defaultValue = '',
  control,
  error,
  type,
  addClass,
  mask
}) => {
  return (
    <div className='flex justify-center w-full my-1'>
      <Controller
        name={name}
        control={control || ''}
        defaultValue={defaultValue}
        render={({ field }) => (
          <div className='flex flex-col w-full'>
            <input
              className={`appearance-none p-4 block shadow bg-gray-100 rounded w-full max-w-md focus:outline-gray-300 dark:bg-gray-600 dark:text-dark-primary disabled:text-gray-400 disabled:bg-zinc-200 ${addClass}`}
              disabled={disabled}
              maxLength={maxLength}
              type={type}
              value={mask ? mask(field.value) : field.value}
              onChange={(e) => {
                field.onChange(e.target.value)
              }}
            />
            {error && (
              <p className='text-red-400 text-sm block mt-2'>{error}</p>
            )}
          </div>
        )}
      />
    </div>
  )
}

export default TextInput
