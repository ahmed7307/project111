import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HallOfFameCard from '@/components/HallOfFameCard';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import ProtectedRoute from '@/components/ProtectedRoute';
import { mockHallOfFame, type HallOfFameEntry } from '@/lib/mockData';

function AdminHallOfFameContent() {
  const [entries, setEntries] = useState<HallOfFameEntry[]>(mockHallOfFame);

  const handleDelete = (entryId: string) => {
    setEntries(entries.filter(e => e.id !== entryId));
    toast.success('Entry removed from Hall of Fame');
    console.log('Delete Hall of Fame entry:', entryId);
  };

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
              Manage Hall of <span className="text-primary">Fame</span>
            </h1>
            <p className="text-muted-foreground mb-8">Review and manage Hall of Fame entries</p>

            <div className="grid md:grid-cols-2 gap-6">
              {entries.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <HallOfFameCard {...entry} />
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-4 right-4"
                    onClick={() => handleDelete(entry.id)}
                    data-testid={`button-delete-${entry.id}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </motion.div>
              ))}
            </div>

            {entries.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No Hall of Fame entries yet
              </div>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function AdminHallOfFame() {
  return (
    <ProtectedRoute requireAdmin>
      <AdminHallOfFameContent />
    </ProtectedRoute>
  );
}