import React, { useState, useEffect } from "react";
import Dice from "./Dice";
import BettingOptions from "./BettingOptions";
import "./App.css";
const rollDice = () => Math.floor(Math.random() * 6) + 1;

const calculateOutcome = (diceValues, bet) => {
  const total = diceValues.reduce((a, b) => a + b, 0);

  if (!bet) return "No Bet";
  if (bet === "Small" && total >= 4 && total <= 10) return "You win!";
  if (bet === "Big" && total >= 11 && total <= 17) return "You win!";
  if (bet === "Even" && total % 2 === 0) return "You win!";
  if (bet === "Odd" && total % 2 !== 0) return "You win!";
  return "You lose!";
};

const Game = () => {
  const [diceValues, setDiceValues] = useState([1, 1, 1]);
  const [bet, setBet] = useState(null);
  const [result, setResult] = useState("");
  const [allResults, setAllResults] = useState([]);
  const [shaking, setShaking] = useState(false);
  const [showCup, setShowCup] = useState(false);

  const handleRoll = () => {
    setShaking(true);
    setShowCup(true);

    setTimeout(() => {
      const newValues = [rollDice(), rollDice(), rollDice()];
      setDiceValues(newValues);

      const outcome = calculateOutcome(newValues, bet);
      setResult(outcome);

      setAllResults([...allResults, { diceValues: newValues, bet, outcome }]);

      setBet(null);
      setShaking(false);
      setShowCup(false);
    }, 2000);
  };

  const handleBet = (option) => {
    setBet(option);
    setResult("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col justify-around size-96  py-10 relative">
        {showCup && (
          <div className={`absolute cup ${shaking ? 'shake' : 'uncover'}`}></div>
        )}
        <div className="flex justify-around mb-4">
          {diceValues.map((value, index) => (
            <Dice
              key={index}
              value={shaking ? rollDice() : value}
              roll={shaking ? "shaking..." : "Roll Dice"}
            />
          ))}
        </div>
        <BettingOptions onBet={handleBet} />
      </div>
      <button
        className="border border-2 w-20 h-10 flex items-center justify-center bg-green-300 font-bold"
        onClick={handleRoll}
        disabled={shaking}
      >
        {shaking ? "shaking..." : "Roll Dice"}
      </button>

      <p>Bet: {bet || "None"}</p>
      <p>Result: {result}</p>

      <div className="all-results mt-4 w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4">All Results</h2>
        <div className="overflow-auto max-h-96">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead className="bg-gray-300 sticky top-0 z-10">
              <tr>
                <th className="border border-gray-200 px-4 py-2 text-left">
                  Dice
                </th>
                <th className="border border-gray-200 px-4 py-2 text-left">
                  Bet On
                </th>
                <th className="border border-gray-200 px-4 py-2 text-left">
                  Outcome
                </th>
              </tr>
            </thead>
            <tbody>
              {allResults.map((result, index) => (
                <tr key={index}>
                  <td className="border border-gray-200 px-4 py-2">
                    {result.diceValues.join(", ")}
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
    </div>
  );
};

export default Game;
