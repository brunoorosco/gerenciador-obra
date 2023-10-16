export default async function Obras() {
	const result = await fetch('http://localhost:3000/api/obras')
	const data = await result.json()
	return (
		<div className="">
			<div className="container flex flex-col items-center w-full mx-auto p-3">
				<div className="w-full px-4 py-5 mb-2 bg-white border rounded-md shadow sm:px-6 dark:bg-gray-800">
					<h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
						Obras
					</h3>
					<p className="w-full mt-1 text-sm text-gray-500 dark:text-gray-200">
						Todas as Obras em Andamento e Encerradas.
					</p>
				</div>
				<ul className="flex flex-col">
					{data.map((obra: any) => (
						<li className="flex flex-row mb-2 border-gray-400">
							<div className="transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
								<div className="flex flex-col items-center justify-center w-10 h-10 mr-4">
									<a href="#" className="relative block">
										<img
											alt="profil"
											src="/images/person/6.jpg"
											className="mx-auto object-cover rounded-full h-10 w-10 "
										/>
									</a>
								</div>
								<div className="w-full pl-1 md:mr-16">
									<div className="font-medium dark:text-white">{obra.work}</div>
									<div className="text-sm text-gray-600 dark:text-gray-200">
										Valor da Obra {obra.priceWork}
									</div>
									<div className="text-sm text-gray-600 dark:text-gray-200">
										Gastos da Obra {obra.workExpense}
									</div>
								</div>
								<div className="w-24 pl-1 md:mr-10">
									<div className="font-semibold dark:text-white">Total</div>

									<div className="text-xs text-gray-600 dark:text-gray-200">
										{obra.totalWork}
									</div>
								</div>
								<button className="flex justify-end w-10 text-right">
									<svg
										width={12}
										fill="currentColor"
										height={12}
										className="text-gray-500 hover:text-gray-800 dark:hover:text-white dark:text-gray-200"
										viewBox="0 0 1792 1792"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
									</svg>
								</button>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}
