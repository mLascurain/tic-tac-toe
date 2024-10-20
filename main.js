const turnos = {
  turnoActual: "X", // Comenzamos con 'X'

  // Método para alternar el turno
  alternarTurno() {
    this.turnoActual = this.turnoActual === "X" ? "O" : "X";
  },

  // Método para obtener el jugador actual
  obtenerTurno() {
    return this.turnoActual;
  },
};

const combinacionesGanadoras = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const gestionarTablero = () => {
  let tablero = Array(9).fill(null); // Inicializa el tablero vacío
  const tableroDOM = document.getElementById("tablero");

  const mostrarTablero = () => {
    tableroDOM.innerHTML = "";
    tablero.forEach((valor, index) => {
      const celda = document.createElement("div");
      celda.classList.add("celda");
      celda.textContent = valor ? valor : "";
      celda.addEventListener("click", () => {
        actualizarTablero(index, turnos.obtenerTurno());
        mostrarTablero();
      });
      tableroDOM.appendChild(celda);
    });
  };

  // Actualizar el tablero
  const actualizarTablero = (index, turno) => {
    if (tablero[index] === null) {
      tablero[index] = turno; // Actualiza la celda si está vacía
      const { chequiarGanador, chequiarEmpate } = gestionarJuego();

      // Verificar si hay un ganador
      const ganador = chequiarGanador(tablero);
      if (ganador) {
        alert(`¡El jugador ${ganador} ha ganado!`);
        resetearTablero();
        return;
      }

      // Verificar si hay empate
      if (chequiarEmpate(tablero)) {
        alert("¡Empate!");
        resetearTablero();
        return;
      }

      // Alternar el turno si no hay ganador ni empate
      turnos.alternarTurno();
    } else {
      console.log("La celda ya está ocupada");
    }
  };

  // Resetear el tablero
  const resetearTablero = () => {
    tablero = Array(9).fill(null); // Reinicia el tablero
    mostrarTablero(); // Asegura que se actualice el DOM después de resetear
  };

  return {
    mostrarTablero,
    actualizarTablero,
    resetearTablero,
  };
};

const gestionarJuego = () => {
  const chequiarGanador = (board) => {
    for (const combination of combinacionesGanadoras) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; // Retorna el ganador ('X' o 'O')
      }
    }
    return null;
  };

  const chequiarEmpate = (board) => {
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        // Cambiado para verificar celdas 'null'
        return false; // Si hay al menos una celda vacía, no es empate
      }
    }
    return true; // Todas las celdas están llenas, es empate
  };

  return { chequiarGanador, chequiarEmpate };
};

const miTablero = gestionarTablero();
miTablero.mostrarTablero(); // Muestra el tablero en la página
