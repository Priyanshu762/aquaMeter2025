import React, { useEffect, useState } from 'react';
import { LeaderboardTable, TopperCard } from '../../Components';
// import { fetchLeaderboardData } from '../../utils/leaderboardAPI';
import { addRankToUsers } from '../../utils/rankingUtils';
import axios from '../../utils/axios'

const LeaderboardPage = () => {
  const [rankedUsers, setRankedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsersForLeaderBoard = async () => {
      try {
        const response = await axios.get('/api/auth/userForLeaderBoard')
        console.log(response);
        
        setRankedUsers(addRankToUsers(response.data.leaderboard));
      } catch (error) {
        setError("Failed to load leaderboard");
        console.error("Error in leaderboard", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersForLeaderBoard();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="flex flex-col w-full min-h-screen px-4 md:px-16 py-10 bg-gradient-to-br from-blue-50 to-blue-100 dark:bg-none">
      <div className="text-4xl text-center font-bold text-blue-800 tracking-wide dark:text-white">
        🏆 Leaderboard !!!
      </div>

      <div className="mx-auto mt-10">
        <div className="flex flex-wrap justify-center gap-6 mb-4">
          {rankedUsers.slice(0, 3).map((user, index) => (
            <TopperCard
              key={user._id}
              position={user.rank}
              subscript={['st', 'nd', 'rd'][index] || 'th'}
              name={user.name}
              score={user.points}
            />
          ))}
        </div>
      </div>

      <div>
        <LeaderboardTable users={rankedUsers} currentUserId="u100" />
      </div>
    </div>
  );
};

export default LeaderboardPage;
