import React, { useState, useEffect } from "react";
import Dice from "./Dice";
import BettingOptions from "./BettingOptions";
import "./App.css"; // Import your CSS file with the animation styles

const rollDice = () => Math.floor(Math.random() * 6) + 1;

const calculateOutcome = (diceValues, bet) => {
  const total = diceValues.reduce((a, b) => a + b, 0);
  const uniqueValues = new Set(diceValues);

  if (!bet) return "No Bet";
  if (bet === "Small" && total >= 4 && total <= 10) return "You win!";
  if (bet === "Big" && total >= 11 && total <= 17) return "You win!";
  if (bet === "Even" && total % 2 == 0) return "You win!";
  if (bet === "Odd" && total % 2 != 0) return "You win!";
  return "You lose!";
};

const Game = () => {
  const [diceValues, setDiceValues] = useState([1, 1, 1]);
  const [bet, setBet] = useState(null);
  const [result, setResult] = useState("");
  const [allResults, setAllResults] = useState([]);
  const [rolling, setRolling] = useState(false); // Track if dice are rolling

  const handleRoll = () => {
    setRolling(true);

    // Simulate rolling animation
    setTimeout(() => {
      const newValues = [rollDice(), rollDice(), rollDice()];
      setDiceValues(newValues);

      // Determine outcome
      const outcome = calculateOutcome(newValues, bet);
      setResult(outcome);

      // Add to all results
      setAllResults([...allResults, { diceValues: newValues,bet, outcome }]);

      // Clear bet after roll
      setBet(null);

      // End rolling animation
      setRolling(false);
    }, 2000); // Delay for 2 seconds
  };

  const handleBet = (option) => {
    setBet(option);
    setResult("");
  };

  return (
    // <div className="game">
    //   <div className="dice-container">
    //     {diceValues.map((value, index) => (
    //       <Dice key={index} value={rolling ? rollDice() : value} roll={rolling ? 'Rolling...' : 'Roll Dice'}/>
    //     ))}

    //   </div>

    //   <BettingOptions onBet={handleBet} />

    //   <button onClick={handleRoll} disabled={rolling}>
    //     {rolling ? 'Rolling...' : 'Roll Dice'}
    //   </button>

      // <p>Bet: {bet || 'None'}</p>
      // <p>Result: {result}</p>
      // <div className="all-results">
      //   <h2>All Results</h2>
      //   <ul>
      //     {allResults.map((result, index) => (
      //       <li key={index}>
      //         Dice: {result.diceValues.join(', ')} - {result.outcome}
      //       </li>
      //     ))}
      //   </ul>
      // </div>
    // </div>

    <div className="flex flex-col justify-center items-center h-screen min-h-40 bg-gray-400 space-y-4">
      <div className="flex space-x-4">
        {diceValues.map((value, index) => (
          <Dice
            key={index}
            value={rolling ? rollDice() : value}
            roll={rolling ? "Rolling..." : "Roll Dice"}
          />
        ))}
      </div>
      <BettingOptions onBet={handleBet} />
      <button
        className="border border-2 w-20 h-10 flex items-center justify-center bg-green-300 font-bold"
        onClick={handleRoll}
        disabled={rolling}
      >
        {rolling ? "Rolling..." : "Roll Dice"}
      </button>

      <p>Bet: {bet || 'None'}</p>
      <p>Result: {result}</p>
      <div className="all-results">
  <h2 className="text-2xl font-bold mb-4">All Results</h2>
  <table className="min-w-full border-collapse border border-gray-200">
    <thead>
      <tr>
        <th className="border border-gray-200 px-4 py-2 text-left">Dice</th>
        <th className="border border-gray-200 px-4 py-2 text-left">Bet On</th>
        <th className="border border-gray-200 px-4 py-2 text-left">Outcome</th>
      </tr>
    </thead>
    <tbody>
      {allResults.map((result, index) => (
        <tr key={index}>
          <td className="border border-gray-200 px-4 py-2">
            {result.diceValues.join(', ')}
          </td>
          <td className="border border-gray-200 px-4 py-2">
            {result.bet}
          </td>
          <td className="border border-gray-200 px-4 py-2">
            {result.outcome}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      
    </div>
  );
};

export default Game;
