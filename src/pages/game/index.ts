import { state } from '../../state'

// Inicializa la vista principal del juego con un solo registro de jugada por ronda
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

    // Obtenemos los elementos con querySelector
    const text = div.querySelector("p");
    const button = div.querySelector("button-el");
    const allSelections = div.querySelectorAll("selection-el");

    // Variable local que almacena la última jugada hasta el final
    let lastSelectedMove = "";

    button?.addEventListener("click", () => { // Escuchamos el evento de click
        const counter = document.createElement("counter-el"); //Creamos el counter
        counter.setAttribute("count", "3"); // Le damos la cuenta
        counter.setAttribute("route", "results"); // Y le damos result como ruta

        state.setState({ play: { user: "", machine: "" } }); // Establecemos el estado en vacio apenas se hace click

        button.replaceWith(counter); // Reemplazamos el boton con el counter
        text?.remove(); // Y removemos el text

        // Solo actualiza variable y estilos visuales, NO registra la ronda aquí
        const handleSelection = (e: any) => {
            const selectedMove = e.detail.selection; // Obtenemos el detail.selection

            allSelections.forEach((element) => { // Por cada elemento de allSelections
                const image = element.shadowRoot?.querySelector("img"); // Obtenemos el shadow y la imagen

                if (!image) return; // Si la imagen no es true, se termina la funcion
                image.style.transform = "scale(1)"; // Le damos estilos a todas las imagenes
                image.style.opacity = "0.5";

                if (element.getAttribute("image") === selectedMove) { // Y a la imagen seleccionada le hacemos un estilo diferente
                    image.style.transform = "scale(1.5)";
                    image.style.opacity = "1";
                }
            });

            lastSelectedMove = selectedMove; // Establecemos el lastSelectedMove con el valor de selectedMove
        };

        div.addEventListener("selection-info", handleSelection); // Ejecutamos la funcion handleSelection en el evento selection-info

        // Solo al terminar el contador se registra la jugada y se elimina el listener
        counter.addEventListener("counter-finished", () => {
            state.setMoves(lastSelectedMove); // Le pasamos a setMoves el lastSelectedMove
            div.removeEventListener("selection-info", handleSelection); // Y removemos el eventListener
        });
    });

    div.appendChild(style);

    return div; // retorna el nodo creado
}