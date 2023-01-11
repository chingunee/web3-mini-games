import React from "react";

const Board = ({ players }) => (
  <table class="table-auto">
    <thead>
      <tr>
        <th class="px-4 py-2">Rank</th>
        <th class="px-4 py-2">Player</th>
        <th class="px-4 py-2">Score</th>
      </tr>
    </thead>
    <tbody>
      {players.map((player, index) => (
        <tr key={player.name}>
          <td class="px-4 py-2">{index + 1}</td>
          <td class="px-4 py-2">{player.name}</td>
          <td class="px-4 py-2">{player.score}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const LeaderBoard = () => {
  const [players, setPlayers] = React.useState([
    { name: "Alice", score: 1000 },
    { name: "Bob", score: 900 },
    { name: "Charlie", score: 800 },
  ]);

  return (
    <div className="flex justify-center">
      <div class="p-4">
        <h1 class="text-2xl font-bold mb-4">Leaderboard</h1>
        <Board players={players} />
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={() => setPlayers([])}
        >
          Reset Leaderboard
        </button>
      </div>
    </div>
  );
};

export default LeaderBoard;
