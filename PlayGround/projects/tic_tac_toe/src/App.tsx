import WinnerGif from "../src/assets/gif/trophy.gif";
import WinnerSound from "../src/assets/audio/winning-tone.mp3";
import TieSound from "../src/assets/audio/tie.m4a";
import MoveSound from "../src/assets/audio/move.m4a";
import WrongMoveSound from "../src/assets/audio/wrong-move.m4a";
import { useState } from "react";

interface result {
  gameOver: boolean;
  winner: null | "x" | "o";
  tie: boolean;
}

export default function App() {
  const [result, setresult] = useState<result>({
    gameOver: false,
    winner: null,
    tie: false,
  });
  const [gameArray, setGameArray] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [turnOfX, setTurnOfX] = useState(true);

  const changeArray = (
    arr: string[],
    index: number,
    value: "o" | "x"
  ): string[] => {
    const newArr = arr;
    newArr[index] = value;
    return newArr;
  };

  function makeChanges(index: number) {
    const moveAudio = new Audio(MoveSound);
    const WrongMoveAudio = new Audio(WrongMoveSound);

    if (gameArray[index] == "") {
      moveAudio.play();
      if (turnOfX) {
        setGameArray(changeArray(gameArray, index, "x"));

        const disition = checkWinner("x");

        if (disition === "winner") {
          setresult({ gameOver: true, winner: "x", tie: false });
        } else if (disition === "tie") {
          setresult({ gameOver: true, winner: null, tie: true });
        } else {
          setTurnOfX(!turnOfX);
        }
      } else {
        setGameArray(changeArray(gameArray, index, "o"));

        const disition = checkWinner("o");

        if (disition === "winner") {
          setresult({ gameOver: true, winner: "o", tie: false });
        } else if (disition === "tie") {
          setresult({ gameOver: true, winner: null, tie: true });
        } else {
          setTurnOfX(!turnOfX);
        }
      }
    } else {
      WrongMoveAudio.play();
    }
  }

  function checkWinner(player: "x" | "o") {
    if (
      (gameArray[0] === player &&
        gameArray[1] === player &&
        gameArray[2] === player) ||
      (gameArray[3] === player &&
        gameArray[4] === player &&
        gameArray[5] === player) ||
      (gameArray[6] === player &&
        gameArray[7] === player &&
        gameArray[8] === player) ||
      (gameArray[0] === player &&
        gameArray[3] === player &&
        gameArray[6] === player) ||
      (gameArray[1] === player &&
        gameArray[4] === player &&
        gameArray[7] === player) ||
      (gameArray[2] === player &&
        gameArray[5] === player &&
        gameArray[8] === player) ||
      (gameArray[0] === player &&
        gameArray[4] === player &&
        gameArray[8] === player) ||
      (gameArray[2] === player &&
        gameArray[4] === player &&
        gameArray[6] === player)
    ) {
      return "winner";
    }
    if (!gameArray.includes("")) {
      return "tie";
    }
    return null;
  }

  function resetGame() {
    setGameArray(["", "", "", "", "", "", "", "", ""]);
    setresult({ gameOver: false, winner: null, tie: false });
    setTurnOfX(!turnOfX);
  }

  function Board() {
    return (
      <div className="w-full flex flex-col items-center gap-6 p-5 sm:p-0">
        <div className="flex justify-center">
          <div className="relative">
            <div
              className={`rounded-lg absolute bg-purple-900 ${
                turnOfX ? "-inset-1.5 blur" : ""
              }`}
            ></div>
            <div className="relative bg-black text-gray-200 px-4 py-1 text-2xl font-bold flex justify-center items-center rounded-lg">
              {" "}
              <span>Player X</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 w-full sm:w-[520px]">
          <div
            className="h-32 sm:h-40 text-purple-950 text-7xl sm:text-9xl hover:text-black hover:bg-purple-950 border-purple-900 rounded-3xl flex justify-center items-center border-b-[1.5px] border-r-[1.5px]"
            onClick={() => makeChanges(0)}
          >
            {gameArray[0]}
          </div>
          <div
            className="h-32 sm:h-40 text-purple-950 text-7xl sm:text-9xl hover:text-black hover:bg-purple-950 border-purple-900 rounded-3xl flex justify-center items-center border-b-[1.5px] border-l-[1.5px] border-r-[1.5px]"
            onClick={() => makeChanges(1)}
          >
            {gameArray[1]}
          </div>
          <div
            className="h-32 sm:h-40 text-purple-950 text-7xl sm:text-9xl hover:text-black hover:bg-purple-950 border-purple-900 rounded-3xl flex justify-center items-center border-l-[1.5px] border-b-[1.5px]"
            onClick={() => makeChanges(2)}
          >
            {gameArray[2]}
          </div>
          <div
            className="h-32 sm:h-40 text-purple-950 text-7xl sm:text-9xl hover:text-black hover:bg-purple-950 border-purple-900 rounded-3xl flex justify-center items-center border-t-[1.5px] border-r-[1.5px] border-b-[1.5px]"
            onClick={() => makeChanges(3)}
          >
            {gameArray[3]}
          </div>
          <div
            className="h-32 sm:h-40 text-purple-950 text-7xl sm:text-9xl hover:text-black hover:bg-purple-950 border-purple-900 rounded-3xl flex justify-center items-center border-[1.5px]"
            onClick={() => makeChanges(4)}
          >
            {gameArray[4]}
          </div>
          <div
            className="h-32 sm:h-40 text-purple-950 text-7xl sm:text-9xl hover:text-black hover:bg-purple-950 border-purple-900 rounded-3xl flex justify-center items-center border-t-[1.5px] border-l-[1.5px] border-b-[1.5px]"
            onClick={() => makeChanges(5)}
          >
            {gameArray[5]}
          </div>
          <div
            className="h-32 sm:h-40 text-purple-950 text-7xl sm:text-9xl hover:text-black hover:bg-purple-950 border-purple-900 rounded-3xl flex justify-center items-center border-t-[1.5px] border-r-[1.5px]"
            onClick={() => makeChanges(6)}
          >
            {gameArray[6]}
          </div>
          <div
            className="h-32 sm:h-40 text-purple-950 text-7xl sm:text-9xl hover:text-black hover:bg-purple-950 border-purple-900 rounded-3xl flex justify-center items-center border-l-[1.5px] border-t-[1.5px] border-r-[1.5px]"
            onClick={() => makeChanges(7)}
          >
            {gameArray[7]}
          </div>
          <div
            className="h-32 sm:h-40 text-purple-950 text-7xl sm:text-9xl hover:text-black hover:bg-purple-950 border-purple-900 rounded-3xl flex justify-center items-center border-l-[1.5px] border-t-[1.5px]"
            onClick={() => makeChanges(8)}
          >
            {gameArray[8]}
          </div>
        </div>
        <div className="flex justify-center">
          <div className="relative">
            <div
              className={`rounded-lg absolute bg-purple-900 ${
                !turnOfX ? "-inset-1.5 blur" : ""
              }`}
            ></div>
            <div className="relative bg-black text-gray-200 px-4 py-1 text-2xl font-bold flex justify-center items-center rounded-lg">
              {" "}
              <span>Player O</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  function EndScreen() {
    if (result.winner && result.gameOver) {
      const audio = new Audio(WinnerSound);
      audio.play();
    }
    if (result.tie && result.gameOver) {
      const audio = new Audio(TieSound);
      audio.play();
    }

    function PlayAgainButton({
      delay,
      position,
    }: {
      delay: number;
      position: string;
    }) {
      const [showButton, setShowButton] = useState(false);

      setTimeout(() => {
        setShowButton(true);
      }, delay);

      return showButton ? (
        <button
          className={`relative px-4 py-2 text-white font-semibold bg-purple-950 text-xl rounded-lg ${position}`}
          onClick={resetGame}
        >
          Play Again
        </button>
      ) : null;
    }

    return (
      <div className="w-screen h-screen overflow-hidden bg-[#161928] flex justify-center items-center">
        {result.gameOver && result.winner ? (
          <div className="flex flex-col items-center">
            <span className="font-bold sm:text-4xl text-[28px] text-yellow-500 relative top-8">
              Player "{result.winner}" is the winner!
            </span>
            <PlayAgainButton delay={2000} position="top-[350px]" />
            <img className="" src={WinnerGif} alt="winner gif" />
          </div>
        ) : (
          <div className="flex flex-col items-center relative">
            <span className="font-bold sm:text-4xl text-3xl text-gray-300">
              {" "}
              The match has tie!
            </span>
            <PlayAgainButton delay={4000} position="top-[100px]" />
          </div>
        )}
      </div>
    );
  }
  return (
    <div className="w-screen h-screen overflow-hidden bg-black flex justify-center items-center">
      {result.gameOver ? <EndScreen /> : <Board />}
    </div>
  );
}
