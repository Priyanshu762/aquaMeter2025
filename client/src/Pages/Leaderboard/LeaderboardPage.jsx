import React from 'react'
import { LeaderboardTable, TopperCard } from '../../Components'

const LeaderboardPage = () => {
    const users = [
                { id: "u1", name: "Ravi", score: 1990, rank: 1 },
                { id: "u2", name: "Simran", score: 1950, rank: 2 },
                { id: "u3", name: "Aman", score: 1920, rank: 3 },
                { id: "u4", name: "Alok", score: 1890, rank: 4 },
                { id: "u5", name: "Priya", score: 1850, rank: 5 },
                { id: "u6", name: "Rahul", score: 1820, rank: 6 },
                { id: "u7", name: "Neha", score: 1790, rank: 7 },
                { id: "u8", name: "Kabir", score: 1750, rank: 8 },
                { id: "u9", name: "Tanya", score: 1720, rank: 9 },
                { id: "u10", name: "Rohit", score: 1700, rank: 10 },
                { id: "u11", name: "Sneha", score: 1680, rank: 11 },
                { id: "u12", name: "Ishaan", score: 1650, rank: 12 },
                { id: "u13", name: "Ayesha", score: 1630, rank: 13 },
                { id: "u14", name: "Karan", score: 1610, rank: 14 },
                { id: "u15", name: "Divya", score: 1590, rank: 15 },
                { id: "u16", name: "Yash", score: 1570, rank: 16 },
                { id: "u17", name: "Meera", score: 1550, rank: 17 },
                { id: "u18", name: "Aarav", score: 1530, rank: 18 },
                { id: "u19", name: "Ritika", score: 1500, rank: 19 },
                { id: "u20", name: "Varun", score: 1480, rank: 20 },
                { id: "u21", name: "Anjali", score: 1450, rank: 21 },
                { id: "u22", name: "Zoya", score: 1430, rank: 22 },
                { id: "u23", name: "Siddharth", score: 1410, rank: 23 },
                { id: "u24", name: "Pooja", score: 1390, rank: 24 },
                { id: "u25", name: "Harsh", score: 1370, rank: 25 },
                { id: "u26", name: "Muskan", score: 1350, rank: 26 },
                { id: "u27", name: "Arjun", score: 1330, rank: 27 },
                { id: "u28", name: "Naina", score: 1310, rank: 28 },
                { id: "u29", name: "Manav", score: 1290, rank: 29 },
                { id: "u30", name: "Bhavna", score: 1270, rank: 30 },
                { id: "u31", name: "Dev", score: 1250, rank: 31 },
                { id: "u32", name: "Kavya", score: 1240, rank: 32 },
                { id: "u33", name: "Nikhil", score: 1230, rank: 33 },
                { id: "u34", name: "Tanvi", score: 1220, rank: 34 },
                { id: "u35", name: "Vikram", score: 1210, rank: 35 },
                { id: "u100", name: "Pragya", score: 1200, rank: 57 }, // Your user
            ];

  return (
    <div className='flex flex-col w-full min-h-screen px-4 md:px-16 py-10 bg-gradient-to-br from-blue-50 to-blue-100 dark:bg-none'>
      <div className='text-4xl text-center font-bold text-blue-800 tracking-wide dark:text-white'>
            🏆  Leaderboard !!!
      </div>
      <div className='mx-auto mt-10'>
            <div className='flex flex-wrap justify-center gap-6 mb-4'>
                <TopperCard position='1' subscript='st' name='Ranjeet Singh' score='1105' />
                <TopperCard position='2' subscript='nd' name='Soumya Singh' score='750' />
                <TopperCard position='3' subscript='rd' name='Priyanshu Kumar' score='130' />
            </div>
      </div>
      <div>
        <LeaderboardTable users={users} currentUserId="u100" />
      </div>
    </div>
  )
}

export default LeaderboardPage
