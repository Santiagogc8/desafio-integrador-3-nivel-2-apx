import { state } from '../../state'

export function initGame() {
	const div = document.createElement("div");

	div.classList.add("welcome__container");
	div.innerHTML = `
            <p>Presiona jugar y elige: piedra, papel o tijera antes de que pasen los 3 segundos.</p>
            <button-el>¡Jugar!</button-el>
            <div class='selection__container'>
                <selection-el image="tijeras"></selection-el>
                <selection-el image="piedra"></selection-el>
                <selection-el image="papel"></selection-el>
            </div>
        `;

	const style = document.createElement("style");

	style.innerHTML = `
            .welcome__container{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                min-width: 322px;
                max-width: 336px;
                margin: 0 auto;
                position: relative;
                padding-bottom: 98px;
            }
    
            p{
                font-size: 40px;
                margin-bottom: 48px;
                text-align: center;
                font-weight: 600;
            }
    
            span{
                color: #91CCAF;
            }
    
            button-el{
                width: 100%;
            }
    
            .selection__container{
                position: absolute;
                bottom: -30px;
                display: flex;
                gap: clamp(46px, 8vw, 65px);
                z-index: 2;
            }

            selection-el{
                width: clamp(57px, 8vw, 97px);
            }

            selection-el:last-child{
                width: clamp(65px, 9vw, 115px);
            }
        `;

	const text = div.querySelector("p");
	const button = div.querySelector("button-el");
	const allSelections = div.querySelectorAll("selection-el");

    button?.addEventListener("click", () => {
		// Crea el nuevo elemento <counter-el>
		const counter = document.createElement("counter-el");
		counter.setAttribute("count", "3"); // Le damos el atributo count
		counter.setAttribute("route", "results"); // Le damos el route

        state.setState({ // Establecemos el estado en nada apenas se haga click en el boton de jugar. Con eso, en caso de que el usuario no elija nada, mande un string vacio
            play: { user: "", machine: "" }
        });

		// Reemplazamos el botón con el contador
		button.replaceWith(counter);

		// Eliminamos el párrafo del dom
		text?.remove();

		div.addEventListener("selection-info", (e: any) => { // Escuchamos el customEvent selection-info
			const selectedMove = e.detail.selection; // Guardamos la seleccion del usuario en una variable

			// De todas las selecciones, hacemos un forEach en el que por cada elemento
			allSelections.forEach((element) => {
				const image = element.shadowRoot?.querySelector("img"); // Selecciona la imagen del elemento

				// Lógica para des-enfatizar a todos (incluido el seleccionado)
				image!.style.transform = "scale(1)";
				image!.style.opacity = "0.5";

				// Si el atributo image del elemento es igual a selectedMove
				if (element.getAttribute("image") === selectedMove) {
					image!.style.transform = "scale(1.5)"; // Le aplicamos diferentes estilos
					image!.style.opacity = "1";
				}
			});

            state.setMoves(selectedMove);
		});
	});

	div.appendChild(style);

	return div; // retorna el nodo creado
}