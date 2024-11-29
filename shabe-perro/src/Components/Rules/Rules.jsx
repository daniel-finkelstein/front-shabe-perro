
import Nav from './../Navbar/Navbar';


const Rules = () => {
  return (
    <>
    <header>
      <Nav title='Reglas'/>
    </header>

    <div className="white-box">
      <h1>El juego</h1>

      <p>
        Este es un juego de estrategia, en el cual 2 jugadores avanzan en un tablero al territorio de otro y cuando se encuentran, se enfrentan en una pelea de Card-Jitsu para determinar quién avanza y quién retrocede a la base de su territorio. El objetivo del juego es llegar 4 veces a la base del oponente, es decir, ganando 4 puntos. El jugador cuenta con cartas de Card-Jitsu y de poder en su inventario, lo que implica que parte clave del juego es hacer uso estratégico de estos recursos (aparte de las monedas que se pueden usar para comprarlos).
      </p>

      <h2>Definiciones</h2>

      <p>Se define:</p>
      <ol>
        <li>Tipos de Carta Pingüino:</li>
        <ul>
          <li>Fuego.</li>
          <li>Agua.</li>
          <li>Nieve.</li>
        </ul>
        <li>Valores de Carta Pingüino:</li>
        <ul>
          <li>Baja: de valor entre 1 y 4, incluidos.</li>
          <li>Media: de valor entre 5 y 8, incluidos.</li>
          <li>Alta: de valor entre 9 y 12, incluidos.</li>
        </ul>
        <li>Tipos de celdas:</li>
        <ul>
          <li>Botín: entrega al jugador un múltiplo aleatorio de 10 monedas entre 10 y 50.</li>
          <li>Cofre: entrega al jugador una Carta Pingüino aleatoria.</li>
        </ul>
        <li>Tipos de Carta de Poder:</li>
        <ul>
          <li>Hurto: permite al jugador robarle la mejor carta al oponente (carta con puntaje más alto). En caso de quedar el oponente con menos de 10 cartas, se le añade aleatoriamente una baja o media.</li>
          <li>Hurto estratégico: permite al jugador robarle la mejor carta de cierto tipo al oponente. En caso de quedar el oponente con menos de 10 cartas, se le añade aleatoriamente una baja o media.</li>
          <li>Robin Hood: resta a la mitad la cantidad de monedas al jugador con más monedas.</li>
          <li>Winter is coming: convierte en hielo todas las cartas de agua del oponente.</li>
          <li>Arca de Noé: convierte en agua todas las cartas de fuego del oponente.</li>
          <li>Cero absoluto: convierte en fuego todas las cartas de hielo del oponente.</li>
          <li>Ventisca: mueve a ambos jugadores 5 casillas hacia el inicio del oponente.</li>
          <li>Mago: permite al jugador lanzar 2 dados en durante los siguientes 3 turnos.</li>
        </ul>
      </ol>

      <h2>Comienzo</h2>

      <p>Se denomina a un jugador como Jugador 1 y al otro como Jugador 2, los que comienzan el las celdas 0 y N-1 del tablero, respectivamente, con N = el número de celdas del tablero. A estas celdas se le llaman base del jugador. Luego, se reparten 10 cartas a cada jugador:</p>
      <ul>
        <li>4 bajas.</li>
        <li>4 medias.</li>
        <li>2 altas.</li>
      </ul>
      <p>El primer turno lo tiene el Jugador 1.</p>

      <h2>Turnos</h2>

      <p>Por cada turno, el jugador tira uno (o dos) dados, y avanza como máximo tal cantidad de celdas. En caso de caer en una celda Botín o Cofre, recibe el premio respectivo. En caso de caer en la base del oponente (celda 0 o N-1, dependiendo del número del jugador), gana un punto y vuelve a su base. En caso de toparse con el oponente (cae en la celda actual del oponente o se lo encontró al avanzar), entonces comienza la batalla.</p>

      <p>En cada turno, el jugador puede comprar cartas, tanto de Pingüino como de Poder, bajo los siguientes precios:</p>

      <ul>
        <li>Pingüino (Baja): 50.</li>
        <li>Pingüino (Media): 100.</li>
        <li>Pingüino (Alta): 250.</li>
        <li>Poder: 500.</li>
      </ul>

      <p>Además, durante el turno, el jugador puede usar las Cartas de Poder a su disposición, o eliminar Cartas Pingüino, siempre y cuando mantenga a disposición un mínimo de 10 y un máximo de 15 Cartas Pingüino en mano. Solo puede utilizar una Carta de Poder por turno.</p>

      <h2>Batallas</h2>

      <p>La batalla comienza cuando se encuentran ambos jugadores en el tablero (excepto en las bases de cada jugador). Antes de la batalla, ambos jugadores escogen 5 de sus Cartas Pingüino a llevar al combate.</p>

      <p>Reglas de la batalla:</p>

      <ul>
        <li>Se juega por encuentros (rondas). En cada encuentro, el jugador escoge una de las Cartas Pingüino disponibles que hubo elegido previamente al inicio de la batalla.</li>
        <li>Cualquier Carta de tipo fuego le gana a cualquiera de nieve.</li>
        <li>Cualquier Carta de tipo nieve le gana a cualquier Carta de agua.</li>
        <li>Cualquier Carta de tipo agua le gana a cualquier Carta de fuego.</li>
        <li>Si las Cartas son del mismo tipo, gana aquel con la Carta más alta.</li>
        <li>En caso de empate (Carta de mismo valor y tipo) se sigue con el siguiente encuentro.</li>
        <li>Una vez utilizada una Carta Pingüino en un encuentro, no puede ser utilizada para otro encuentro en la misma batalla.</li>
        <li>Gana el mejor de 3 encuentros.</li>
        <li>En caso de empate luego de los 5 encuentros, se procede a un deathmatch en donde ambos jugadores escogen una Carta Pingüino de su inventario y batallan con ella (Esto sigue hasta que alguno gane).</li>
        <li>No se permite el uso de Cartas de Poder durante batalla.</li>
      </ul>

      <p>Al ganar una batalla, el jugador gana 100 monedas.</p>

      <p>Al perder una batalla:</p>
      <ul>
        <li>Pierde las 5 Cartas Pingüino escogidas para la batalla.</li>
        <li>Vuelve a su base.</li>
        <li>Se le añaden Cartas Pingüino aleatorias de valor Bajo o Medio hasta alcanzar las 10 en inventario.</li>
      </ul>

      <p>Al término de una batalla, el jugador que la comenzó termina su turno.</p>
      
      <h2>Término del juego</h2>
      <p>El juego se termina cuando un jugador alcanza los 4 puntos, es decir, llegó 4 veces a la base del oponente.</p>
    </div>
    </>
  );
};

export default Rules;
