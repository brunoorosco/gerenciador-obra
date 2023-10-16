'use client'

import { useRouter } from 'next/navigation'

const menuItem = [
  { id: 1, text: 'Funcionários', link: '/funcionarios' },
  { id: 2, text: 'Obras', link: '/obras' },
  {
    id: 3,
    text: 'Registro de Frequência',
    link: '/funcionarios/1/registrar-frequencia'
  },
  { id: 4, text: 'Outros', link: '/outros' }
]
export default function Home() {
  const router = useRouter()
  function handleNavigate(link: string) {
    router.push(link)
  }
  return (
    <main className='grid-cols-1 grid md:grid-cols-4 mt-3 md:min-h-screen max-w-xl mx-auto items-center px-3 text-center gap-5 box-border '>
      {menuItem.map((menu: any) => (
        <div
          onClick={() => handleNavigate(`${menu.link}`)}
          className='bg-slate-50 rounded-md shadow-sm cursor-pointer h-28 flex flex-col justify-center items-center dark:bg-gray-800'
          key={menu.id}
        >
          <p className='font-semibold'>{menu.text}</p>
        </div>
      ))}
    </main>
  )
}
