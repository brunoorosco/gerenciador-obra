import { useState } from 'react'
import { Loading } from '../Loading'
import React from 'react'

export interface IButtonSubmit {
  value?: string
  type: 'submit' | 'reset'
  onClick?: (event: string) => void
  disabled?: boolean
  text: string
  loading?: boolean
}
const ButtonSubmit: React.FC<IButtonSubmit> = ({
  type,
  disabled = false,
  text,
  loading
}) => {
  return (
    <button
      type={type}
      className={`p-4 text-1xl text-center border font-semibold w-full rounded shadow hover:opacity-80 
                      bg-[#5897ee] min-w-full ${
                        loading
                          ? 'cursor-not-allowed opacity-85'
                          : 'bg-[#5897ee]'
                      }`}
      disabled={disabled}
    >
      <div> {loading ? <Loading /> : text}</div>
    </button>
  )
}

export default ButtonSubmit
