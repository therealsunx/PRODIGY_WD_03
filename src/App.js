import './App.css';
import { useState } from 'react';

const Board = ({ setPlaying }) => {

  const [board, setBoard] = useState(Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => '')));
  const [turnflag, setTurnflag] = useState(false);
  const [AI, setAI] = useState(false);
  const [finalState, setFinalState] = useState('');

  const getWinner = () => {
    console.log(board);
    for (let i = 0; i < 3; i++) {
      if (board[i][0] === board[i][1] && board[i][0] === board[i][2] && board[i][0]) return board[i][0];
    }
    for (let i = 0; i < 3; i++) {
      if (board[0][i] === board[1][i] && board[0][i] === board[2][i] && board[0][i]) return board[0][i];
    }
    if (board[0][0] === board[1][1] && board[0][0] === board[2][2]) return board[1][1];
    if (board[0][2] === board[1][1] && board[0][2] === board[2][0]) return board[1][1];
    return null;
  };

  const boardFilled = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (!board[i][j]) return false;
      }
    }
    return true;
  }

  const resetBoard = () => {
    setBoard(Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => '')));
    setFinalState('');
    setTurnflag(false);
  }

  const botMakesMove = () => {
    //get a square
    let r = 0;
    let c = 0;

    handleClick(r, c);
  }

  const handleClick = (i, j) => {
    if (finalState) return;
    if (board[i][j]) return;

    let _c = [...board];
    _c[i][j] = turnflag ? 'O' : 'X';
    setBoard(_c);

    let _w = getWinner();
    if (_w) {
      setFinalState(_w === 'X' ? "Winner : A" : "Winner : B");
    } else if (boardFilled()) {
      setFinalState('Draw');
    }
    else {
      setTurnflag(!turnflag);
      if (AI && turnflag) botMakesMove();
    }
  }
  return (

    <div className='flex flex-col items-center md:flex-row gap-12'>
      <div className='flex md:flex-col gap-12 items-center'>
        <p className='text-2xl md:text-4xl font-bold bg-[#444] px-12 py-4 rounded-2xl'>{finalState ? finalState : (turnflag ? "Turn : B" : "Turn : A")}</p>
        <div className='flex gap-4 text-2xl md:text-4xl items-center text-center font-bold'>
          <label>AI</label>
          <button className={`w-6 h-6 rounded-full shadow-2xl bg-[#0f0] ${AI ? '' : 'opacity-40'}`} onClick={() => setAI(!AI)}></button>
        </div>
      </div>

      <div className='flex flex-col gap-1 rounded-2xl overflow-hidden'>
        {board.map((r, i) => (
          <div className='flex gap-1' key={i}>
            {r.map((c, j) => (
              <button
                className={`w-[25vw] h-[25vw] md:w-[10vw] md:h-[10vw] font-bold text-3xl bg-green-700 hover:bg-green-400 ${c ? 'bg-green-400' : ''}`}
                key={(i + 1) * 3 + j}
                onClick={() => handleClick(i, j)}
              >
                {c}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className='flex md:flex-col gap-4'>
        <button className='text-2xl md:text-4xl font-bold px-12 py-4 rounded-2xl bg-[#f00] hover:opacity-70' onClick={() => setPlaying(false)}>Exit</button>
        <button className='text-2xl md:text-4xl font-bold px-12 py-4 rounded-2xl bg-[#0ff] hover:opacity-70' onClick={resetBoard}>Reset</button>
      </div>
    </div >
  )
}

function App() {

  const [playing, setPlaying] = useState(false);

  return (
    <div className='flex flex-col gap-12 text-center items-center text-white bg-black w-screen min-h-screen '>
      <p className='text-4xl md:text-6xl font-bold p-6 md:p-12'>Tic Tac Toe</p>
      {
        playing ? <Board setPlaying={setPlaying} />
          :
          <button
            className='px-20 py-6 m-auto bg-green-400 text-black font-bold text-4xl rounded-full hover:bg-green-700 hover:text-white'
            onClick={() => setPlaying(true)}
          >
            Play
          </button>
      }
    </div>
  );
}

export default App;
