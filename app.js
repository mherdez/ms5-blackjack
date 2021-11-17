

(() => {
   
// REFERENCIAS HTML
const btnNuevoJuego     = document.querySelector('#nuevoJuego');
const btnPedirCarta     = document.querySelector('#pedirCarta');
const btnDetener        = document.querySelector('#detenerJuego');

const cartaJugador      = document.querySelector('.cartasJugador');
const cartaComputadora  = document.querySelector('.cartasComputadora');
const puntosJugador     = document.querySelectorAll('small')[0];
const puntosComputadora = document.querySelectorAll('small')[1];


// VARIABLES
let mazo = [];
let totalPuntosJugador     = 0;
let totalPuntosComputadora = 0;
let n = 0;

// EVENTOS CLICK
btnNuevoJuego.addEventListener('click', () => {
   console.clear();
   cartaJugador.innerHTML     = '';
   cartaComputadora.innerHTML = '';
   mazo = [];
   crearMazo();
   totalPuntosJugador = 0;
   puntosJugador.textContent = totalPuntosJugador;
   totalPuntosComputadora = 0;
   puntosComputadora.textContent = totalPuntosComputadora;
   btnEnabled();
})

btnPedirCarta.addEventListener('click', () => {
   const valor = darCarta();
   const carta = document.createElement('img');
   carta.src   = `./assets/cartas/${valor}.png`;
   cartaJugador.appendChild(carta); 
   totalPuntosJugador += valorCarta(valor);
   puntosJugador.textContent = totalPuntosJugador;
   if( totalPuntosJugador > 21 ) {
      btnDisabled();
      turnoComputadora();
   }
})

btnDetener.addEventListener('click', () => {
      btnDisabled()
      turnoComputadora();
})

// FUNCIONES
const crearMazo = () => {
   const especiales = ['A','J','Q','K'];
   const palo       = ['H','S','D','C'];

   for(let n=2; n <= 10; n++) {
      for(let p of palo) {
         mazo.push(n+p);
      }
   }
   for(let e of especiales) {
      for(let p of palo) {
         mazo.push(e+p);
      }
   }

   mazo = _.shuffle(mazo);
   // console.log(mazo);
}
const darCarta = () => {
   return mazo.shift();
}
const valorCarta = (carta) => {
   let valor = carta.substring(0,carta.length - 1 );
   if(isNaN(valor)) {
      valor = (valor === 'A') ? 11 : 10;  // operador ternario
   } else {
      valor *= 1; // valor = valor * 1
   }
   return valor;
}
const btnDisabled = () => {
   btnPedirCarta.setAttribute('disabled', true);
   btnPedirCarta.classList.remove('btnAzul');
   btnPedirCarta.classList.add('btnDisabled');
   btnDetener.setAttribute('disabled', true);
   btnDetener.classList.remove('btnAzul');
   btnDetener.classList.add('btnDisabled');
}
const btnEnabled = () => {
   btnPedirCarta.removeAttribute('disabled');
   btnPedirCarta.classList.remove('btnDisabled');
   btnPedirCarta.classList.add('btnAzul');
   btnDetener.removeAttribute('disabled');
   btnDetener.classList.remove('btnDisabled');
   btnDetener.classList.add('btnAzul');
}
const turnoComputadora = () => {
   let mensajeGanador = ''
   do {
      pedirCartaComputadora(); 
      
      if( totalPuntosJugador > 21 ) {
         mensajeGanador = 'La Computadora Gana'
         break;
      } else {
         if( totalPuntosComputadora >= totalPuntosJugador && totalPuntosComputadora <= 21) {
            mensajeGanador = 'La Computadora Gana'
            break
         }  
         if(totalPuntosComputadora > 21){
            mensajeGanador = 'El jugador Gana'
         }
      }
   } while( totalPuntosComputadora <= 21 )
   const tiempo = setTimeout( () => {
      alert(mensajeGanador)
   }, 500 )
   
}
const pedirCartaComputadora = () => {
   const valor = darCarta();
   const carta = document.createElement('img');
   carta.src   = `./assets/cartas/${valor}.png`;
   cartaComputadora.append(carta)
   totalPuntosComputadora += valorCarta(valor);
   puntosComputadora.textContent = totalPuntosComputadora;
}

// PROCESOS INICIALES
crearMazo();

})()
