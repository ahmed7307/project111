import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LeaderboardTable from '@/components/LeaderboardTable';
import { mockLeaderboard } from '@/lib/mockData';
import ProtectedRoute from '@/components/ProtectedRoute';

function LeaderboardContent() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-serif text-3xl font-bold mb-2">
              <span className="text-primary">Leaderboard</span>
            </h1>
            <p className="text-muted-foreground mb-8">Top hackers on the platform</p>

            <div className="bg-card rounded-lg border border-primary/20 p-6">
              <LeaderboardTable entries={mockLeaderboard} />
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function Leaderboard() {
  return (
    <ProtectedRoute>
      <LeaderboardContent />
    </ProtectedRoute>
  );
}