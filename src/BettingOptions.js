import React from 'react';

const BettingOptions = ({ onBet }) => {
  const options = ['Small', 'Big', 'Even', 'Odd',];

  return (
    <div className="flex justify-around space-x-4 h-10">
  {options.map((option) => (
    <button
      className="border border-2 w-20 h-10 flex items-center justify-center"
      key={option}
      onClick={() => onBet(option)}
    >
      {option}
    </button>
  ))}
</div>

  );
};

export default BettingOptions;
