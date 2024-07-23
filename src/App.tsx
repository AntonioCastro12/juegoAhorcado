import "./App.css";
import { letters } from "./helpers/letters";
import { HangImage } from "./components/HangImage"; 
import { useEffect, useState } from "react";
import { getRandomWord } from "./helpers/getRandomWord";

function App() {

  const [word, setWord] = useState(getRandomWord ())
  const [hiddenWord, setHiddenWord] = useState('_ '.repeat(word.length))
  const [ attempts, setAttempts] = useState(0);
  const[ lose, setLose] = useState(false);
  const[ won, setWon] = useState(false);

  //Determinar si la persona perdio 
  useEffect( () => {
    if ( attempts >= 9){
      setLose( true );
    }
  }, [attempts] )

  // Determinar si la persona gano 

  useEffect(()=>{
    // console.log( hiddenWord );
    const currentHiddenWord = hiddenWord.split( ' ' ).join('');
    if (currentHiddenWord === word){
      setWon( true );

    }
     

  },[ hiddenWord])



  const checkLetter = ( letter:string) =>{
    if( lose ) return;
    if( won ) return;

    if ( !word.includes(letter)){
      setAttempts( Math.min( attempts + 1, 9 ) )
        return;
    }
    
    const hiddenWordArray = hiddenWord.split( ' ' );
    console.log(hiddenWordArray);

    for (let i = 0; i < word.length; i ++){
     if(word[i] === letter){
      hiddenWordArray[i] = letter;

     } 
    }
    setHiddenWord(hiddenWordArray.join(' '));

  }

  const newGame = () => {
    const newWord = getRandomWord()
    setWord(newWord);
    setHiddenWord('_ '.repeat(newWord.length));
    setAttempts(0);
    setLose(false);
    setWon(false);
  }

  return (
    <div className="app">
      {/* Imagenes */}
      <HangImage imageNumber={ attempts } />

      {/* Palabra oculta */}
      <h3>{hiddenWord }</h3>

      {/* contador de intentos   */}
      <h3>Intentos: { attempts}</h3>

      {/* mensaje si perdio */}

      {
        ( lose ) 
        ? <h2>Perdio, la palabra era:  { word }</h2>
        : ''
      }
      {/* mensaje si gano*/}

      {
        ( won ) 
        ? <h2>Felicidades usted gano:  { word }</h2>
        : ''
      }

      {/* Bonotenes de letras  */}
      {letters.map((letter) => (
        <button 
          onClick={() => checkLetter(letter)}
          key={letter}>
          {letter}
        </button>
      ))
      }

      <br/>
      <br />
      <button onClick={ newGame }>¿Nuevo Juego?</button>

    </div>
  );
}

export default App;
