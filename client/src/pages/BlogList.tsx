import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogPreview from '@/components/BlogPreview';
import AdminControls from '@/components/AdminControls';
import BlogFormModal from '@/components/BlogFormModal';
import { addBlog, getBlogs } from '@/lib/ctfdClient';
import { isAdmin } from '@/lib/auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

export default function BlogList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any>(null);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAddNew = () => {
    setModalMode('add');
    setEditingBlog(null);
    setIsModalOpen(true);
  };

  const handleEdit = (blog: any) => {
    setModalMode('edit');
    setEditingBlog(blog);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      setBlogs(blogs.filter((b) => b.id !== id));
      toast.success('Blog post deleted successfully!');
    }
  };

  const handleSave = async (data: any) => {
    if (modalMode === 'add') {
      const created = await addBlog({
        title: data.title,
        content: data.content || data.excerpt || '',
        category: data.category,
        author: data.author || 'Admin',
      });
      setBlogs([created, ...blogs]);
    } else {
      setBlogs(blogs.map((b) => (b.id === editingBlog.id ? { ...b, ...data } : b)));
    }
  };

  // Load blogs from local storage/seed
  useState(() => {
    (async () => {
      const list = await getBlogs();
      setBlogs(list as any);
    })();
  });

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
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="font-serif text-3xl font-bold mb-2">
                  Security <span className="text-primary">Blogs</span>
                </h1>
                <p className="text-muted-foreground">Learn from expert insights and tutorials</p>
              </div>
              
              {isAdmin() && (
                <Button onClick={handleAddNew} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add New
                </Button>
              )}
            </div>

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
                  className="relative group"
                >
                  <BlogPreview {...blog} />
                  {isAdmin() && (
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <AdminControls
                        onEdit={() => handleEdit(blog)}
                        onDelete={() => handleDelete(blog.id)}
                      />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />

      <BlogFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingBlog}
        mode={modalMode}
      />
    </div>
  );
}