import React from "react";

const getMedalEmoji = (rank) => {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return "🎖️";
};

const LeaderboardTable = ({ users, currentUserId }) => {
  const visibleUsers = users.filter((user) => user.rank >=4 && user.rank <= 30);
  const currentUser = users.find((user) => user.id === currentUserId);

  return (
    <div className="mt-10 mx-auto max-w-5xl min-w-[300px] rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/5 shadow-xl backdrop-blur-lg overflow-hidden">
      <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
        <table className="w-full text-sm">
          <thead className="sticky top-0 z-10 bg-white dark:bg-[#2C2C2C] border-b border-black/10 dark:border-white/10 shadow-sm">
            <tr className="text-gray-700 dark:text-white/80 text-xs uppercase tracking-wide">
              <th className="px-6 py-4 text-left">Rank</th>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-right">Score</th>
            </tr>
          </thead>
          <tbody>
            {visibleUsers.map((user) => {
              const isCurrentUser = user.id === currentUserId;

              return (
                <tr
                  key={user.rank}
                  className={`border-t border-black/5 dark:border-white/5 transition ${
                    isCurrentUser
                      ? "bg-blue-100/30 dark:bg-blue-400/10"
                      : "hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  <td className="px-6 py-4 font-medium flex items-center gap-2 text-gray-800 dark:text-white">
                    <span className="text-xl">{getMedalEmoji(user.rank)}</span>
                    {user.rank}
                  </td>
                  <td className="px-6 py-4 text-gray-700 dark:text-white">{user.name}</td>
                  <td className="px-6 py-4 text-right text-gray-900 dark:text-white">
                    {user.points}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {currentUser && currentUser.rank > 30 && (
        <div className="border-t border-black/10 dark:border-white/10 bg-yellow-500/10 dark:bg-yellow-400/10">
          <table className="w-full text-sm">
            <tbody>
              <tr className="font-semibold text-yellow-900 dark:text-yellow-300">
                <td className="px-6 py-4 flex items-center gap-2">
                  <span className="text-xl">{getMedalEmoji(currentUser.rank)}</span>
                  {currentUser.rank}
                </td>
                <td className="px-6 py-4">{currentUser.name} (You)</td>
                <td className="px-6 py-4 text-right">{currentUser.score}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LeaderboardTable;
