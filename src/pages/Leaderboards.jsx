import React from 'react';
import { Trophy, Medal, Award } from 'lucide-react';

const Leaderboards = () => {
  // Dummy leaderboard data
  const leaderboard = [
    { rank: 1, name: 'User 1', points: 5000, icon: Trophy, color: 'text-yellow-500' },
    { rank: 2, name: 'User 2', points: 4500, icon: Medal, color: 'text-gray-400' },
    { rank: 3, name: 'User 3', points: 4000, icon: Award, color: 'text-orange-500' },
  ];

  return (
    <div className="py-6 md:py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Leaderboards</h1>
        <p className="text-gray-600">Top performers this month</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 space-y-4">
          {leaderboard.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.rank}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className={`${item.color}`}>
                  <Icon size={32} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">#{item.rank} {item.name}</p>
                      <p className="text-sm text-gray-500">{item.points.toLocaleString()} points</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Leaderboards;

