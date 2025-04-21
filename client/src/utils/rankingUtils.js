export const addRankToUsers = (users) => {
    // Sort users by points in descending order
    const sortedUsers = [...users].sort((a, b) => b.points - a.points);
    
    // Add rank to each user based on position
    return sortedUsers.map((user, index) => ({
      ...user,
      rank: index + 1,
    }));    
  };
  