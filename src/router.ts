// Hacemos los imports
import { initHome } from "./pages/home";
import { initGame } from "./pages/game";
import { initResults } from "./pages/results";

const routes = [
	// Creamos nuestro array de rutas
	{
		path: /\/home/, // Hacemos una expresion regular para que valide /ruta
		page: initHome, // Ejecutamos el codigo de la pagina correspondiente
	},
	{
		path: /\/game/,
		page: initGame,
	},
	{
		path: /\/results/,
		page: initResults,
	},
];

let containerEl: Element; // Creamos una variable que es de tipo Element

export function navigate(path: any) {
	// Exportamos la funcion navigate que recibe un path
	history.pushState({}, "", path); // Creamos el pushState y le pasamos los 3 argumentos requeridos (1. Estado, 2. Un titulo, 3. La url)

	containerEl.innerHTML = ""; // Limpiamos el dom del container recibido

	const test = routes.find((r) => r.path.test(path)); // Hacemos un test de la expresion regular. Este test lo hacemos recorriendo el array de routes hasta encontrar el que pase el test de la expresion regular con path como argumento

	if (test) {
		// Si test nos retorna un true
		const page = test.page(); // Le decimos a lo que nos retorna el test que ejecute la pagina
		containerEl.appendChild(page); // Y al container le hacemos un appendChild con el page como argumento
	} else {
		// En caso contrario
		containerEl.innerHTML = `<h4>Oh no, parece que te has perdido 😰. La ruta que estabas buscando no existe.</h4>`;
	}
}

// Creamos una funcion que iniciara nuestro router. Recibira un container, sobre el que luego hara los cambios en el dom
export function initRouter(container: Element) {
	containerEl = container; // Inicializamos la variable containerEl a container

	window.onpopstate = () => {
		// Al evento popstate le asignamos una funcion (este evento funciona para que cuando el usuario quiera devolverse, pueda renderizarse de nuevo los componentes)
		navigate(window.location.pathname); // Y ejecuta navigate en la location deseada
	};

	// Hacemos un ternario que valida si el usuario esta en el path "/". Si es asi, retorna "home". En caso contrario, retorna el location.pathname
	const path = window.location.pathname === "/" ? "/home" : window.location.pathname;
	navigate(path);
}