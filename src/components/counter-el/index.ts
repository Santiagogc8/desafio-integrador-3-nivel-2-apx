import {navigate} from '../../router';
import { state } from '../../state'

class CounterEl extends HTMLElement {
	// Creamos un customElement para el contador
	shadow: ShadowRoot; // Le decimos que tendra shadow
	interval: any; // Y un interval

	static get observedAttributes() {
		return ["count"]; // Observamos el atributo 'count' con el metodo observedAttributes de los customElements
	}

	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: "open" }); // Inicializamos el shadow
		this.render();
	}

	render() {
		// Creamos el metodo render
		// Limpiamos el contenido anterior
		this.shadow.innerHTML = "";

		// Creamos el div, un span y el style
		const div = document.createElement("div");
        const span = document.createElement('span');
        const style = document.createElement("style");
        

        // Le agregamos un svg al div (para hacer el contador)
        div.innerHTML = `
            <svg class="progress-ring" viewBox="0 0 100 100">
                <circle
                    class="ring-bg"
                    cx="50" cy="50" r="45"
                ></circle>
                <circle
                    class="ring-progress"
                    cx="50" cy="50" r="45"
                    stroke-dasharray="283"
                    stroke-dashoffset="0"
                ></circle>
            </svg>
        `;

        div.appendChild(span); // Le agregamos el span al div

		let seconds: number = parseInt(this.getAttribute("count")!) || 0; // E inicializamos a seconds con el valor obtenido del atributo count o 0

		const updateCounter = () => {
            // Actualiza el número visible
            span.textContent = `${seconds}`;

            if (seconds < 0) { // Cuando sea menor a 0
                div.style.display = 'none'; // Lo dejamos de mostrar
                clearInterval(this.interval); // Y terminamos el intervalo
                navigate('/' + this.getAttribute('route'))
            }
            
            seconds--; // Cambiamos el numero del contador
        };

		style.innerHTML = `
            div {
                width: 200px;
                height: 200px;
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
            }

            span {
                position: absolute;
                font-size: 100px;
                font-weight: 700;
                z-index: 2;
                color: black;
            }
            
            .progress-ring {
                position: absolute;
                width: 100%;
                height: 100%;
                transform: rotate(-90deg); 
            }
            
            .ring-bg {
                fill: none;
                stroke: #e0e0e0;
                stroke-width: 10;
            }

            .ring-progress {
                fill: none;
                stroke: black;
                stroke-width: 10;
                stroke-dasharray: 283;
                stroke-dashoffset: 0; 
                animation: sweep 1s linear infinite;
            }

            @keyframes sweep {
                from {
                    stroke-dashoffset: 0;
                }

                to {
                    stroke-dashoffset: 283; 
                }
            }
        `;

		this.shadow.appendChild(style);
		this.shadow.appendChild(div);

        updateCounter(); 
        // Iniciamos el intervalo para que se ejecute cada 1s
        this.interval = setInterval(updateCounter, 1000);
	}

    // Ejecutamos el metodo attributeChangedCallback
	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		if (name === "count") {
			clearInterval(this.interval); // Limpia el intervalo anterior
			this.render(); // Vuelve a renderizar con el nuevo valor
		}
	}

	disconnectedCallback() { // Y ejecuta el metodo disconnectedCallback para que no se ejecute en segundo plano el intervalo
		clearInterval(this.interval);
	}
}

customElements.define("counter-el", CounterEl);