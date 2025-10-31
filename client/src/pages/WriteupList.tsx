import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WriteupCard from '@/components/WriteupCard';
import { mockWriteups } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import ProtectedRoute from '@/components/ProtectedRoute';

function WriteupListContent() {
  const [filter, setFilter] = useState<'All' | 'Web' | 'Reversing' | 'Forensics'>('All');

  const filteredWriteups = filter === 'All' ? mockWriteups : mockWriteups.filter((w) => w.category === filter);

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
              Challenge <span className="text-primary">Write-ups</span>
            </h1>
            <p className="text-muted-foreground mb-8">Learn from detailed walkthroughs</p>

            <div className="flex gap-3 mb-8">
              {(['All', 'Web', 'Reversing', 'Forensics'] as const).map((category) => (
                <Button
                  key={category}
                  variant={filter === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter(category)}
                  data-testid={`button-filter-${category.toLowerCase()}`}
                >
                  {category}
                </Button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWriteups.map((writeup, index) => (
                <motion.div
                  key={writeup.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <WriteupCard {...writeup} />
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

export default function WriteupList() {
  return (
    <ProtectedRoute>
      <WriteupListContent />
    </ProtectedRoute>
  );
}