// Components are capitalized in React like Square.It is a piece of reusable code that represents a part of a user interface.
// Used to render,manage, and update the UI elements in application.
// Board is a parent component and Square is a child.
// react provide a special function called usestate that you can call from your component to let it "remember" things.
// Like it remember we have clicked one box.
import { useState } from "react";

// Reuseable component Square
// we have passed the value as a prop ,we use curly braces to render it properly .
function Square({value,onSquareClick}) {
  return (
  <button className="square" onClick={onSquareClick}>{value}</button>
);
}

// Export is a javascript keyword which make this function accessible outside the file. 
// default keyword tells other files that it is the main function in a file.
// null is passed to usestate as the initial value for this state variable.
function Board({xisNext,Squares,onPlay}) {

// we add handle function to make it intrective.
  function handleClick(i){
    if (calculationWinner(Squares) || Squares[i]) {
      return;
    }
    const nextSquares=Squares.slice();
    if (xisNext) {
      nextSquares[i]="X";
    } else {
      nextSquares[i]="O";
    }
    onPlay(nextSquares);
    
  }
  const winner=calculationWinner(Squares);
  let status;
  if (winner){
    status="Winner: " + winner;
  } else {
    status="Next player: " + (xisNext ? "X" : "O");
  }
// return js keyword returns whatever as a value to the caller of function. 
// <button> is jsx element(html+js).
// return only used to give a single line. to get multiple lines we use <> </> fragments.                                                                               
  return (
    <>
    <div className="status" style={{ color: winner ? "#2ecc71" : "#e74c3c" }}>{status}
      <h1>Tic-Tac-Toe</h1>
    </div>
      <div className="board-row">
        {/* here we used reuseable component Square. We pass the value to render in each square. */}
        {/* Arrow function shorter way to define a function */}
        <Square value={Squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={Squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={Squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>

      <div className="board-row">
      <Square value={Squares[3]} onSquareClick={() => handleClick(3)}/>
      <Square value={Squares[4]} onSquareClick={() => handleClick(4)}/>
      <Square value={Squares[5]} onSquareClick={() => handleClick(5)}/>
        </div>

      <div className="board-row">
      <Square value={Squares[6]} onSquareClick={() => handleClick(6)}/>
      <Square value={Squares[7]} onSquareClick={() => handleClick(7)}/>
      <Square value={Squares[8]}onSquareClick={() => handleClick(8)}/>
      </div>

    </>
  );

}

export default function Game(){
  const [history, sethistory]=useState([Array(9).fill(null)]);
  const [currentmove,setcurrentmove]=useState(0);
  const xisNext=currentmove % 2 ===0;
  const currentSquares=history[currentmove];

  function handlePlay(nextSquares){
    //TOOD
    const nextHistory=[...history.slice(0,currentmove+1),nextSquares];
    setcurrentmove(nextHistory.length - 1);
    sethistory(nextHistory);
    
  }
  function jumpto(nextmove){
    setcurrentmove(nextmove);

  }
  const moves=history.map((Squares,move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description='Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpto(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xisNext={xisNext} Squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
       <ol>{moves}</ol> 
      </div>
    </div>
  );
}

function calculationWinner(Squares){
  const lines=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
  for (let i=0; i<lines.length;i++){
    const [a,b,c] = lines[i];
    if (Squares[a] && Squares[a] === Squares[b] && Squares[b] === Squares[c] && Squares[c]){
      return Squares[a];
    }
  }
  return null;
}