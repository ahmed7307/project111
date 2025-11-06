type Blog = {
  id: string;
  title: string;
  content: string;
  category?: string;
  author: string;
  createdAt: string;
};

export default function BlogCard({ title, content, category, author, createdAt }: Blog) {
  return (
    <article className="p-4 rounded-lg border border-primary/20 bg-card">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold">{title}</h3>
        {category && <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">{category}</span>}
      </div>
      <p className="text-sm text-muted-foreground mb-3">by {author} · {new Date(createdAt).toLocaleString()}</p>
      <p className="whitespace-pre-wrap text-sm leading-6">{content}</p>
    </article>
  );
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageCircle, Calendar } from 'lucide-react';
import { Link } from 'wouter';

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  authorAvatar: string;
  date: string;
  tags: string[];
  likes: number;
  comments: number;
  thumbnail?: string;
}

export default function BlogCard({ id, title, excerpt, author, authorAvatar, date, tags, likes, comments, thumbnail }: BlogCardProps) {
  return (
    <Link href={`/blog/${id}`}>
      <a data-testid={`card-blog-${id}`}>
        <Card className="border-primary/20 hover-elevate transition-all duration-300 h-full overflow-hidden">
          {thumbnail && (
            <div className="h-48 overflow-hidden">
              <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
            </div>
          )}
          <CardHeader>
            <div className="flex flex-wrap gap-1 mb-2">
              {tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <CardTitle className="text-lg line-clamp-2">{title}</CardTitle>
            <CardDescription className="line-clamp-2">{excerpt}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={authorAvatar} alt={author} />
                  <AvatarFallback>{author[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{author}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  {likes}
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  {comments}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
}