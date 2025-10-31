import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Trophy } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  username: string;
  avatar: string;
  xp: number;
  completedRooms: number;
}

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
}

export default function LeaderboardTable({ entries }: LeaderboardTableProps) {
  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/40';
      case 2:
        return 'bg-gray-400/20 text-gray-400 border-gray-400/40';
      case 3:
        return 'bg-orange-600/20 text-orange-600 border-orange-600/40';
      default:
        return '';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full" role="table" aria-label="Leaderboard">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 text-sm font-semibold">Rank</th>
            <th className="text-left py-3 px-4 text-sm font-semibold">User</th>
            <th className="text-left py-3 px-4 text-sm font-semibold">XP</th>
            <th className="text-left py-3 px-4 text-sm font-semibold">Completed Rooms</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr
              key={entry.rank}
              className={`border-b border-border hover-elevate transition-all ${
                entry.rank <= 3 ? 'bg-card' : ''
              }`}
              data-testid={`row-leaderboard-${entry.rank}`}
            >
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  {entry.rank <= 3 && <Trophy className={`w-5 h-5 ${entry.rank === 1 ? 'text-yellow-500' : entry.rank === 2 ? 'text-gray-400' : 'text-orange-600'}`} />}
                  <Badge variant="outline" className={getRankColor(entry.rank)}>
                    #{entry.rank}
                  </Badge>
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={entry.avatar} alt={entry.username} />
                    <AvatarFallback>{entry.username[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{entry.username}</span>
                </div>
              </td>
              <td className="py-4 px-4 font-semibold text-primary">{entry.xp.toLocaleString()}</td>
              <td className="py-4 px-4">{entry.completedRooms}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}