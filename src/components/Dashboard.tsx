import { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';
import type { User } from '../types';

const Dashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getUsers() {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:8080/api/v1/users", {
          method: 'GET',
        });
        const data = await res.json();
        setUsers(data.users);
      } catch (e) {
        console.log("Error occurred : " + e);
      } finally {
        setLoading(false);
      }
    }

    getUsers();
  }, []);

  const getLeaderboard = () => {
    return users
      .map((user, index) => ({
        ...user,
        rank: index + 1,
      }));
  };

  return (
    <div className="px-4 py-10 ">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-cyan-300 tracking-wide drop-shadow-glow">
            🎮 Leaderboard
          </h1>
          <p className="text-gray-300 mt-2 text-sm md:text-base">
            Claim points and climb to the top!
          </p>
        </div>

        <div className="flex justify-center">
          <div className="w-full md:w-3/4 lg:w-2/3">
            <div className="bg-black/40 backdrop-blur-md border border-cyan-400/10 rounded-xl shadow-2xl p-6">
              <h2 className="text-lg md:text-xl font-semibold mb-6 flex items-center gap-2 text-cyan-300">
                <TrendingUp className="w-5 h-5 text-cyan-400" />
                Top Players
              </h2>

              <div className="space-y-4">
                {loading &&
                  [1, 2, 3, 4].map((e) => (
                    <div
                      key={e}
                      className="relative flex items-center justify-between p-5 rounded-xl border-2 border-gray-600/30 bg-gray-700/30 animate-pulse"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gray-600/50" />
                        <div>
                          <div className="h-4 w-28 bg-gray-600 rounded mb-2"></div>
                          <div className="h-3 w-20 bg-gray-600 rounded"></div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="h-5 w-10 bg-gray-600 rounded mb-2"></div>
                        <div className="h-3 w-12 bg-gray-600 rounded"></div>
                      </div>
                    </div>
                  ))}

                {getLeaderboard().map((user) => (
                  <div
                    key={user._id}
                    className={`relative flex items-center justify-between p-5 rounded-xl border-2 transition-all text-white ${
                      user.rank === 1
                        ? 'bg-gradient-to-r from-yellow-900/40 to-amber-900/40 border-yellow-400/50 shadow-yellow-400/20'
                        : user.rank === 2
                        ? 'bg-gradient-to-r from-gray-800/60 to-slate-800/60 border-gray-400/50 shadow-gray-400/20'
                        : user.rank === 3
                        ? 'bg-gradient-to-r from-orange-900/40 to-amber-800/40 border-amber-500/50 shadow-amber-500/20'
                        : 'bg-[#1a1f2b] border-cyan-600/20 hover:border-cyan-400/40 hover:shadow-cyan-400/10'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-md ${
                          user.rank === 1
                            ? 'bg-yellow-400/20 text-yellow-300 shadow shadow-yellow-400/40'
                            : user.rank === 2
                            ? 'bg-gray-400/20 text-gray-300 shadow shadow-gray-400/30'
                            : user.rank === 3
                            ? 'bg-amber-400/20 text-amber-300 shadow shadow-amber-400/30'
                            : 'bg-cyan-400/10 text-cyan-300'
                        }`}
                      >
                        <img src="https://thegiftingkingdom.in/cdn/shop/files/gamer-5_103aae47-ec67-4b3f-97d5-6d5219a40a7b.jpg?v=1723109434" alt="RA" className='object-contains'/>
                      </div>
                      <div>
                        <h3 className="font-semibold text-md md:text-lg">{user.username}</h3>
                        <p className="text-sm text-gray-400">
                          {user.rank === 1
                            ? '👑 Champion'
                            : user.rank === 2
                            ? '🥈 Runner-up'
                            : user.rank === 3
                            ? '🥉 Third Place'
                            : `Rank #${user.rank}`}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p
                        className={`text-xl font-extrabold ${
                          user.rank === 1
                            ? 'text-yellow-300'
                            : user.rank === 2
                            ? 'text-gray-300'
                            : user.rank === 3
                            ? 'text-amber-300'
                            : 'text-cyan-300'
                        }`}
                      >
                        {/* @ts-ignore */}
                        {user.points}
                      </p>
                      <p className="text-gray-400 text-xs md:text-sm">points</p>
                    </div>

                    {user.rank <= 3 && (
                      <div
                        className={`absolute inset-0 rounded-xl opacity-10 ${
                          user.rank === 1
                            ? 'bg-yellow-400/20'
                            : user.rank === 2
                            ? 'bg-gray-400/20'
                            : 'bg-amber-400/20'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
