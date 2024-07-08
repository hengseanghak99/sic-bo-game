import React, { useState } from "react";
import dice1 from "./images/dice1.png";
import "./styles.css"; // Import your CSS file with the animation styles
import Dice from "./Dice";
import BettingOptions from "./BettingOptions";

const rollDice = () => Math.floor(Math.random() * 6) + 1;
const calculateOutcome = (diceValues, bet) => {
  const total = diceValues.reduce((a, b) => a + b, 0);
  // const uniqueValues = new Set(diceValues);

  if (!bet) return "No Bet";
  if (bet === "Small" && total >= 4 && total <= 10) return "You win!";
  if (bet === "Big" && total >= 11 && total <= 17) return "You win!";
  if (bet === "Even" && total % 2 == 0) return "You win!";
  if (bet === "Odd" && total % 2 != 0) return "You win!";
  return "You lose!";
};

const AnimatedElement = () => {
  const [diceValues, setDiceValues] = useState([1, 1, 1]);
  const [bet, setBet] = useState(null);
  const [result, setResult] = useState("");
  const [allResults, setAllResults] = useState([]);
  const [shaking, setshaking] = useState(false);
  const [showCup, setShowCup] = useState(false);

  const handleRoll = () => {
    setshaking(true);
    setShowCup(true);

    // Simulate shaking animation
    setTimeout(() => {
      const newValues = [rollDice(), rollDice(), rollDice()];
      setDiceValues(newValues);

      // Determine outcome
      const outcome = calculateOutcome(newValues, bet);
      setResult(outcome);

      // Add to all results
      setAllResults([...allResults, { diceValues: newValues, bet, outcome }]);

      // Clear bet after roll
      setBet(null);

      // End shaking animation
      setshaking(false);
      setShowCup(false);
    }, 2000); // Delay for 2 seconds
  };

  const handleBet = (option) => {
    setBet(option);
    setResult("");
  };

  return (
   <div>
     <div
      id="sticky-banner"
      tabIndex="-1"
      className="fixed top-0 left-0 z-50 flex justify-between w-full h-1/5 p-4 border-b border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
    >
      <div className="flex items-center mx-auto">
        <div className="flex border border-2 space-x-4 top-0 bg-yellow-500 z-10 relative">
          {diceValues.map((value, index) => (
            <Dice
              key={index}
              value={shaking ? rollDice() : value}
              roll={shaking ? "shaking..." : "Roll Dice"}
            />
          ))}
          {showCup && (
            <div
              className={`absolute cup ${shaking ? "shake" : "uncover"}`}
            ></div>
          )}
        </div>
      </div>
    </div>
    <BettingOptions onBet={handleBet} />
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

export default AnimatedElement;
