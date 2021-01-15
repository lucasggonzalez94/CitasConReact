import {Fragment, useState, useEffect} from 'react'
import Formulario from './components/Formulario'
import Cita from './components/Cita'

function App() {

	// Citas en localstorage
	let citasIniciales = JSON.parse(localStorage.getItem('citas'))
	if (!citasIniciales) {
		citasIniciales = []
	}

	// Arreglo de citas
	const [citas, guardarCitas] = useState(citasIniciales)

	// UseEffect para realizar ciertas operaciones cuando el state cambia
	useEffect(() => {
		// console.log('Documento listo! o algo paso con las citas')
		let citasIniciales = JSON.parse(localStorage.getItem('citas'))

		if (citasIniciales) {
			localStorage.setItem('citas', JSON.stringify(citas))
		}else {
			localStorage.setItem('citas', JSON.stringify([]))
		}
	}, [citas]) // Cada vez que el state de citas cambie se ejecuta el useEffect

	// Funcion que tome las citas actuales y agregue la nueva
	const crearCita = cita => {
		guardarCitas([ ...citas, cita ])
	}

	// Funcion que elimina una cita por su id
	const eliminarCita = id => {
		const nuevasCitas = citas.filter(cita => cita.id !== id)
		guardarCitas(nuevasCitas)
	}

	// Mensaje condicional
	const titulo = citas.length === 0 ? 'Agrega una cita' : 'Administra tus citas'

	return (
		<Fragment>
			<h1>Administrador de Pacientes</h1>

			<div className="container">
				<div className="row">
					<div className="one-half column">
						<Formulario
							crearCita={crearCita}
						/>
					</div>
					<div className="one-half column">
						<h2>{titulo}</h2>
						{citas.map(cita => (
							<Cita
								key={cita.id}
								cita={cita}
								eliminarCita={eliminarCita}
							/>
						))}
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default App;