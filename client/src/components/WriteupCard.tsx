type Writeup = {
  id: string;
  title: string;
  content: string;
  challengeId?: number;
  challengeName?: string;
  author: string;
  tags?: string[];
  createdAt: string;
};

export default function WriteupCard({ title, content, author, createdAt, challengeName, tags }: Writeup) {
  return (
    <article className="p-4 rounded-lg border border-primary/20 bg-card">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold">{title}</h3>
        {challengeName && <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">{challengeName}</span>}
      </div>
      <p className="text-sm text-muted-foreground mb-3">by {author} · {new Date(createdAt).toLocaleString()}</p>
      {tags && tags.length > 0 && (
        <div className="flex gap-2 mb-3 flex-wrap">
          {tags.map((t) => (
            <span key={t} className="text-xs px-2 py-1 rounded bg-muted text-foreground/80">{t}</span>
          ))}
        </div>
      )}
      <p className="whitespace-pre-wrap text-sm leading-6">{content}</p>
    </article>
  );
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, Calendar } from 'lucide-react';
import { Link } from 'wouter';

interface WriteupCardProps {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  date: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  likes: number;
}

const difficultyColors = {
  Easy: 'bg-primary/20 text-primary border-primary/40',
  Medium: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/40',
  Hard: 'bg-destructive/20 text-destructive border-destructive/40',
};

export default function WriteupCard({ id, title, author, authorAvatar, date, category, difficulty, likes }: WriteupCardProps) {
  return (
    <Link href={`/writeup/${id}`}>
      <a data-testid={`card-writeup-${id}`}>
        <Card className="border-primary/20 hover-elevate transition-all duration-300 h-full">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className={difficultyColors[difficulty]}>
                {difficulty}
              </Badge>
              <Badge variant="outline">{category}</Badge>
            </div>
            <CardTitle className="text-lg line-clamp-2">{title}</CardTitle>
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
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Heart className="w-4 h-4" />
                {likes}
              </div>
            </div>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
}