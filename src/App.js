import './App.css';
import { useState } from 'react';

const Board = ({ setPlaying }) => {

  const [board, setBoard] = useState(Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => null)));
  const [turnflag, setTurnflag] = useState(false);
  const [AI, setAI] = useState(false);
  const [finalState, setFinalState] = useState('');

  const getWinner = (b) => {
    for (let i = 0; i < 3; i++) {
      if (b[i][0] === b[i][1] && b[i][0] === b[i][2] && b[i][0]) return b[i][0];
    }
    for (let i = 0; i < 3; i++) {
      if (b[0][i] === b[1][i] && b[0][i] === b[2][i] && b[0][i]) return b[0][i];
    }
    if (b[0][0] === b[1][1] && b[0][0] === b[2][2]) return b[1][1];
    if (b[0][2] === b[1][1] && b[0][2] === b[2][0]) return b[1][1];
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

  const minimax = (b, d, isMaxPl) => {
    const winner = getWinner(b);
    if (winner) return winner === 'X' ? 1 : -1;
    else if (boardFilled()) return 0;

    if (isMaxPl) {
      let bs = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (!b[i][j]) {
            b[i][j] = 'X';
            const s = minimax(b, d + 1, false);
            b[i][j] = null;
            bs = Math.max(s, bs);
          }
        }
      }
      return bs;
    } else {
      let bs = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (!b[i][j]) {
            b[i][j] = 'O';
            const s = minimax(b, d + 1, true);
            b[i][j] = null;
            bs = Math.min(s, bs);
          }
        }
      }
      return bs;
    }
  }

  const getBestMove = (b) => {
    let bs = Infinity;
    let bm = { x: -1, y: -1 };

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (!b[i][j]) {
          b[i][j] = 'O';
          const s = minimax(b, 0, true);
          b[i][j] = null;
          if (s < bs) {
            bs = s;
            bm = { x: i, y: j };
          }
        }
      }
    }
    return bm;
  }

  const handleClick = (i, j, flag = false) => {
    if (finalState) return;
    if (board[i][j]) return;

    let _c = [...board];
    _c[i][j] = flag ? 'O' : 'X';
    setBoard(_c);

    let _w = getWinner(_c);
    if (_w) {
      setFinalState(_w === 'X' ? "Winner : A" : "Winner : B");
    } else if (boardFilled()) {
      setFinalState('Draw');
    } else if (!AI) {
      setTurnflag(!turnflag);
    } else if (!flag) {
      let bm = getBestMove(_c);
      handleClick(bm.x, bm.y, true);
    }
  }

  return (

    <div className='flex flex-col items-center md:flex-row gap-12'>
      <div className='flex md:flex-col gap-12 items-center'>
        <p className='text-2xl md:text-4xl font-bold bg-[#444] px-12 py-4 rounded-2xl'>{finalState ? finalState : (turnflag ? "Turn : B" : "Turn : A")}</p>
        <div className='flex gap-4 text-2xl md:text-4xl items-center text-center font-bold'>
          <label>BOT</label>
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
