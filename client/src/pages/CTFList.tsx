import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CTFCard from '@/components/CTFCard';
import { mockCTFs } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import ProtectedRoute from '@/components/ProtectedRoute';

function CTFListContent() {
  const [filter, setFilter] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');

  const filteredCTFs = filter === 'All' ? mockCTFs : mockCTFs.filter((ctf) => ctf.difficulty === filter);

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
              CTF <span className="text-primary">Challenges</span>
            </h1>
            <p className="text-muted-foreground mb-8">Choose your challenge and start hacking</p>

            <div className="flex gap-3 mb-8">
              {(['All', 'Easy', 'Medium', 'Hard'] as const).map((difficulty) => (
                <Button
                  key={difficulty}
                  variant={filter === difficulty ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter(difficulty)}
                  data-testid={`button-filter-${difficulty.toLowerCase()}`}
                >
                  {difficulty}
                </Button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCTFs.map((ctf, index) => (
                <motion.div
                  key={ctf.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <CTFCard {...ctf} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function CTFList() {
  return (
    <ProtectedRoute>
      <CTFListContent />
    </ProtectedRoute>
  );
}