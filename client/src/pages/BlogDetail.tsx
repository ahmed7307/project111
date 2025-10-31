import { useState } from 'react';
import { useRoute } from 'wouter';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { mockBlogs } from '@/lib/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageCircle, Share2, Bookmark, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ProtectedRoute from '@/components/ProtectedRoute';

function BlogDetailContent() {
  const [, params] = useRoute('/blog/:id');
  const blog = mockBlogs.find((b) => b.id === params?.id);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!blog) {
    return <div>Blog not found</div>;
  }

  const handleLike = () => {
    setLiked(!liked);
    toast.success(liked ? 'Removed from likes' : 'Added to likes');
  };

  const handleSave = () => {
    setSaved(!saved);
    toast.success(saved ? 'Removed from saved' : 'Added to saved');
  };

  const handleShare = () => {
    toast.success('Link copied to clipboard!');
  };

  const handleComment = () => {
    toast.success('Comment feature coming soon!');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {blog.thumbnail && (
              <div className="aspect-video rounded-lg overflow-hidden mb-8">
                <img src={blog.thumbnail} alt={blog.title} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="flex flex-wrap gap-2 mb-4">
              {blog.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="font-serif text-4xl font-bold mb-6">{blog.title}</h1>

            <div className="flex items-center justify-between mb-8 pb-8 border-b border-border">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={blog.authorAvatar} alt={blog.author} />
                  <AvatarFallback>{blog.author[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{blog.author}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLike}
                  className={liked ? 'text-primary' : ''}
                  data-testid="button-like"
                >
                  <Heart className={`w-4 h-4 mr-1 ${liked ? 'fill-primary' : ''}`} />
                  {blog.likes + (liked ? 1 : 0)}
                </Button>
                <Button variant="outline" size="sm" onClick={handleComment} data-testid="button-comment">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  {blog.comments}
                </Button>
                <Button variant="outline" size="sm" onClick={handleShare} data-testid="button-share">
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSave}
                  className={saved ? 'text-primary' : ''}
                  data-testid="button-save"
                >
                  <Bookmark className={`w-4 h-4 ${saved ? 'fill-primary' : ''}`} />
                </Button>
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {blog.content}
              </div>
            </div>
          </motion.article>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function BlogDetail() {
  return (
    <ProtectedRoute>
      <BlogDetailContent />
    </ProtectedRoute>
  );
}