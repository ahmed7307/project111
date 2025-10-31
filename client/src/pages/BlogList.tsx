import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import { mockBlogs } from '@/lib/mockData';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';

function BlogListContent() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBlogs = mockBlogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
              Security <span className="text-primary">Blogs</span>
            </h1>
            <p className="text-muted-foreground mb-8">Learn from expert insights and tutorials</p>

            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search blogs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 focus:border-primary"
                data-testid="input-search-blogs"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {filteredBlogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <BlogCard {...blog} />
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

export default function BlogList() {
  return (
    <ProtectedRoute>
      <BlogListContent />
    </ProtectedRoute>
  );
}