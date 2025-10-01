interface Play {
    user: string,
    machine: string;
}

const state = { // Creamos nuestro state
    data: { // Creamos un data que guardara los elementos en un objeto
        history: [] as any[], // Que dentro tendra un array de plays
        play: { // Y la play del momento
            user: "",
            machine: ""
        } as Play
    }, 
    listeners: [] as any[], // Creamos el array de listeners
    initLocalStorage(){ // Creamos un metodo que inicializara el localStorage
        // Obtenemos la data del localStorage, si es null, usa un objeto vacío '{}' por defecto
        const localData = localStorage.getItem('state');
        
        if (localData) {
            // Si hay data, la parseamos
            const parsedData = JSON.parse(localData);
            
            // 3. Fusionamos los datos cargados con el estado inicial. Esto asegura que `this.data` use el historial guardado.
            this.data = {
                ...this.data, // Mantiene la estructura base (como 'play')
                ...parsedData // Sobreescribe con los valores guardados ('history')
            };
        }
    },
    getState(){ // Creamos el metodo getState que retornara la data actual
        return this.data
    },
    setState(newState: any){ // Creamos el metodo setState que recibe un nuevo state de cualquier tipo
        this.data = {...this.data, ...newState}; // Establecemos a data con una copia de data y el nuevo estado fusionados

        // Ahora necesitamos de un algoritmo que nos renderice de nuevo todos los elementos. Por lo que hacemos un for que por cada callback de listeners
        for (const callback of this.listeners){
            callback(this.data); // Y ejecutamos cada callback con la data dentro. Asi nos ahorramos llamar a getState todo el tiempo
        }

        this.setLocalStorage(this.getState());
    }, 
    subscribe(callback: (arg: any) => any){ 
        // Ahora debemos de hacer un suscribe, que añade un nuevo callback a la lista de 'listeners' para que sea ejecutado cada vez que el estado cambie
        this.listeners.push(callback);

        return () => { // Rertornamos una funcion
            // Que hace un filtro de los listeners para que no sean igual al callback y se llamen dos veces
            this.listeners = this.listeners.filter(listener => listener !== callback);
        }
    },
    setMoves(move: string){ // Creamos un metodo para que nos permita establecer la jugada del usuario
        const moveMap: { [key: number]: string } = { // Creamos un mapa que contiene los posibles movimientos
            0: 'piedra',
            1: 'papel',
            2: 'tijeras'
        }

        const thisPlay = {
            user: move, //  Establecemos el movimiento del usuario
            machine: moveMap[Math.floor(Math.random() * 3)] // Mantenemos el movimiento de la máquina (si ya se había generado)
        }

        const score = this.whoWins(thisPlay).toLocaleLowerCase(); // Establecemos el whoWins en minuscula en una variable

        // Y copiamos el historial actual con la nueva jugada del usuario y el score (saber si gano o no)
        const history = [...this.getState().history, {...thisPlay, score}];

        this.setState({ // Establecemos el estado nuevo en play
            play: thisPlay,
            history: history
        });
    },
    whoWins(moves: any){ // Creamos un metodo que nos dira quien gano la ronda
        const rules: { [key: string]: string } = { // Creamos un mapa que
            tijeras: 'papel', // Establece que tijeras gana a papel
            papel: 'piedra', // Papel gana a piedra
            piedra: 'tijeras' // Y piedra gana a tijeras
        }

        if(moves.user === moves.machine){ // Si las jugadas de los dos son iguales
            return 'Empate'; // Retornamos 'Empate'
        }

        if(moves.machine === rules[moves.user]){ // Si la jugada de machine es lo mismo a lo que pierde contra lo que jugo el usuario
            return 'Ganaste'; // Retorna 'Ganaste'
        }

        return 'Perdiste'; // Si nada se cumplio, retorna 'Perdiste'
    }, 
    setLocalStorage(info: any){
        localStorage.setItem('state', JSON.stringify(info))
    }
}

state.initLocalStorage(); // Iniciamos el localStorage

export { state }