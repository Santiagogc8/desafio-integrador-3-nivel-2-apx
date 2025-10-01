import { state } from "../../state";
import { navigate } from "../../router";

export function initResults() {
    const lastState = state.getState(); // Obtenemos el estado actualizado

    // Hacemos el calculo de puntajes utilizando el state global y haciendo un filtro de la longitud del array devuelto
    const userScore = lastState.history.filter((e: { score: string }) => e.score === 'ganaste').length;
    const machineScore = lastState.history.filter((e: { score: string }) => e.score === 'perdiste').length;

	const div = document.createElement("div"); // Creamos el div

    // Si el lastState en la propiedad play y user es diferente a vacio (el usuario si jugo)
	if (lastState.play.user !== "") {
		// Le hacemos el innerHTML con las imagenes, scores y ganador
        div.innerHTML = `
            <selection-el image="${lastState.play.machine}" class="machine-play"></selection-el>
            <selection-el image="${lastState.play.user}" class="user-play"></selection-el>
            <div class='result'>
                <star-result score='${state.whoWins(lastState.play)}'></star-result>
                <div class='history'>
                    <p>Score</p>
                    <p>Tu: ${userScore}</p>
                    <p>Maquina: ${machineScore}</p>
                </div>
                <button-el>Volver a jugar</button-el>
            </div>
        `;

		setTimeout(() => { // Establecemos un timeout de 2 segundos
			const result = div.querySelector(".result") as HTMLElement; // Seleccionamos el .result
			result.style.display = "flex"; // Y le cambiamos el style a flex

            setTimeout(()=>{ // Luego como guiño (si el usuario va perdiendo por 10 de diferencia)
                if(machineScore - userScore === 10){
                    alert('La maquina te esta padriando maestro, tomate un respiro'); // Enviamos un mensaje
                }
            }, 1000);

		}, 2000);

        div.querySelector('button-el')?.addEventListener('click', ()=>{ // Y escuchamos el evento de click del button-el
            navigate('/game'); // Con game como ruta
        })
	} else { // Si el usuario no hizo seleccion, muestra un fallback
		div.innerHTML = `
            <div class='result__fallback'>
                <h4>Vaya, parece que no has jugado</h4>
                <button-el>Llevame al juego!</button-el>
            </div>
        `;

		const button = div.querySelector("button-el");
		button?.addEventListener("click", () => { // Y hacemos el mismo evento de click para el boton
			navigate("/game");
		});
	}

	const style = document.createElement("style");

	const backgroundColors: { [key: string]: string } = {
		// Establecemos un mapa con los colores de fondo por cada valor
		ganaste: "var(--win-bg)",
		perdiste: "var(--loose-bg)",
		empate: "var(--draw-bg)",
	};

	style.innerHTML = `
        .machine-play{
            position: absolute;
            top: -20px;
            width: 300px;
            height: 400px;
            left: 50%;
            transform: translateX(-50%) rotate(180deg);
        }

        .user-play{
            position: absolute;
            bottom: -20px;
            width: 300px;
            height: 400px;
            left: 50%;
            transform: translateX(-50%);
        }

        .result__fallback{
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 40px;
        }

        button-el{
            width: 340px;
        }

        h4{
            text-align: center;
            font-size: 40px;
        }

        .result{
            background-color: ${backgroundColors[state.whoWins(lastState.play).toLocaleLowerCase()]};
            position: absolute;
            inset: 0;
            display: none;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 20px;
        }

        .history{
            width: 259px;
            background-color: white;
            border: 10px solid black;
            border-radius: 10px;
            padding: 20px;
            font-family: 'Odibee Sans', sans-serif;
        }

        .history p{
            font-size: 45px;
            text-align: end;
        }

        .history p:first-child{
            font-size: 55px;
            text-align: center;
            margin-bottom: 15px;
        }
    `;

	//* En .result (css), establecemos el color de fondo con el mapeo del objeto en la posicion extraida de state.whoWins en minuscula

	div.appendChild(style);

	return div; // retorna el nodo creado
}