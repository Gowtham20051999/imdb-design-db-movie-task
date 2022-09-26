import { useContext, useState, createContext } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';


const scoreUpdation = createContext();
const playerUpdation = createContext();
var finalIndex=[];

export function TicTacToe({ mode }) {
  const [isXTurn, setIsXturn] = useState(true);
  const [isForm, setIsForm] = useState(true);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  var scoreArray = [score1, score2, setScore1, setScore2];
  var initialPlayerObj = { player1: "", player2: "" };
  const [playerObj, setPlayerObj] = useState(initialPlayerObj);
  var playerArray = [playerObj, setPlayerObj, initialPlayerObj];
  function updateScores(player, value) {
    if (player === "player1") {
      setScore1(value);
    } else {
      setScore2(value);
    }
  }
  return (
    <scoreUpdation.Provider value={scoreArray}>
      <playerUpdation.Provider value={playerArray}>
        <div className="tictactoe">
          <h1>Tic-Tac-Toe Game</h1>
          {isForm ?
            <Form setIsForm={setIsForm} /> :
            <Board isXTurn={isXTurn} setIsXturn={setIsXturn} setIsForm={setIsForm} mode={mode}
              updateScores={updateScores} score1={score1} score2={score2} />}
        </div>
      </playerUpdation.Provider>
    </scoreUpdation.Provider>
  );
}
function Board({ isXTurn, setIsXturn, setIsForm, mode, updateScores, score1, score2 }) {
  const [playerObj, setPlayerObj, initialPlayerObj] = useContext(playerUpdation);
  const [winner, setWinner] = useState("");
  var initialData = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
  ];
  const [board, setBoard] = useState(initialData);
  const [display, setDisplay] = useState("");
  // var display = "";
  return (
    <div className="gameWrapper">
      {!display ?
        <div className="boardEnclosure">
          <div className="playerBox">
            <div className={isXTurn ? "player player1Box" : "player"}>
              {playerObj.player1}&nbsp;<span>{score1}</span>
            </div>
            <div className={!isXTurn ? "player player2Box" : "player"}>
              {playerObj.player2}&nbsp;<span>{score2}</span>
            </div>
          </div>

          <div className="board">
            {board.map((value, index) => {
              return <GameBox val={value} index={index} board={board} setBoard={setBoard}
                isXTurn={isXTurn} setIsXturn={setIsXturn} winner={winner} updateScores={updateScores}
                setWinner={setWinner} setDisplay={setDisplay} score1={score1} score2={score2} />;
            })}
          </div>
        </div> :
        <div className={mode === "dark" ? "resultDark" : "resultLight"}>
          {display === "winner" ?
            <div className="winnerNote">
              <div>Congratulations</div>
              <div>{winner}...!!!</div>
              <div>You are the winner🥇🎊</div>
              {winner && <Celebrations />}
            </div>
            :
            <div className="tieNote">
              <div>Game Over...!!!</div>
              <div>It's a Tie</div>
            </div>}
        </div>}
      <div className="buttonSet">
        <div className="reset">
          <Button variant="contained" onClick={() => {
            setBoard(initialData);
            setWinner("");
            setIsXturn(true);
            finalIndex = [];
            setDisplay("");
          }}>RESET</Button>
        </div>
        <div className="back">
          <Button variant="contained" onClick={() => {
            setIsForm(true);
            setPlayerObj(initialPlayerObj);
            setBoard(initialData);
            setWinner("");
            // winner = "";
            setIsXturn(true);
            finalIndex = [];
            updateScores("player1", 0);
            updateScores("player2", 0);
          }}>NEW GAME</Button>
        </div>
      </div>
    </div>
  );
}
function GameBox({ val, index, board, setBoard, isXTurn, setIsXturn, winner, updateScores, setWinner, setDisplay, score1, score2 }) {
  const [playerObj, setPlayerObj] = useContext(playerUpdation);
  var temp = [...board];
  var [a, b, c] = finalIndex;
  return (
    <div className={temp[index] === "X" ? `xGameBox ${finalIndex.includes(index) ? "sucessBackground" : ""}` : `oGameBox ${finalIndex.includes(index) ? "sucessBackground" : ""}`}
      onClick={() => {
        if (!temp[index] && !winner) {
          temp[index] = isXTurn ? "X" : "O";
          setBoard(temp);
          setIsXturn(!isXTurn);
          val = temp[index];
          winnerFunction(winner, setWinner, temp, setDisplay, updateScores, score1, score2, playerObj);
        }
      }}>
      {val}
    </div>
  );
}
function winnerFunction(winner, setWinner, board, setDisplay, updateScores, score1, score2, playerObj) {
  var winCase = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  winCase.map((value) => {
    for (var i = 0; i < value.length; i++) {
      var [a, b, c] = value;
      if (board[a] !== null && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a] === "X" ? playerObj.player1 : playerObj.player2);
        setTimeout(() => {
          setDisplay("winner");
        }, 500);
        board[a] === "X" ? updateScores("player1", score1 + 1) : updateScores("player2", score2 + 1);
        finalIndex = [a, b, c];
        break;
      }
    }
  });
  var count = 0;
  for (var i = 0; i < board.length; i++) {
    if (board[i]) {
      count = count + 1;
    }
  }
  if (count === 9 && !winner) {
    setDisplay("tie");
  }
}
function Form({ setIsForm }) {
  const [score1, score2, setScore1, setScore2] = useContext(scoreUpdation);
  const [playerObj, setPlayerObj] = useContext(playerUpdation);
  var temp = { ...playerObj };
  return (
    <div className="formEnclosure">
      <div className="playerDetailsWrapper">
        <TextField className="player1Input" label="Player 1" variant="standard" onChange={(evt) => {
          temp.player1 = evt.target.value;
          setPlayerObj(temp);
        }} />
        <TextField className="player2Input" label="Player 2" variant="standard" onChange={(evt) => {
          temp.player2 = evt.target.value;
          setPlayerObj(temp);
        }} />
      </div>
      <Button className="playGame" color="inherit" variant="outlined" onClick={() => {
        if (playerObj.player1 && playerObj.player2) {
          setIsForm(false);
        } else {
          alert("Please enter player details ...!!!");
        }
      }}>Play Game</Button>
    </div>
  );
}
function Celebrations() {
  const { width, height } = useWindowSize();
  return (
    <Confetti
      width={width - 50}
      height={height}
      numberOfPieces={500} />
  );
}
