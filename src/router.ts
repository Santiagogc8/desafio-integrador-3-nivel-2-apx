// Hacemos los imports
import { initHome } from "./pages/home";
import { initGame } from "./pages/game";
import { initResults } from "./pages/results";

// AÑADIMOS LA RUTA BASE DEL REPOSITORIO DE GITHUB PAGES
const BASE_PATH = "/desafio-integrador-3-nivel-2-apx"; 

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
    // Agregamos el BASE_PATH al pushState
	history.pushState({}, "", BASE_PATH + path); 

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
        // Limpiamos la ruta al usar popstate
        const cleanPath = window.location.pathname.replace(BASE_PATH, "") || "/";
		navigate(cleanPath); // Y ejecuta navigate en la location deseada
	};

	// Limpiamos la ruta al cargar la página
	const cleanPath = window.location.pathname.replace(BASE_PATH, "") || "/";

	// Hacemos un ternario que valida si la ruta limpia es "/", para llevar al home. En caso contrario, usa la ruta limpia
	const path = cleanPath === "/" ? "/home" : cleanPath;
	navigate(path);
}