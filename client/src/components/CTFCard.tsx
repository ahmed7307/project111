import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Star } from 'lucide-react';
import { Link } from 'wouter';

interface CTFCardProps {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  rating?: number;
  players?: number;
  tags?: string[];
  solved?: boolean;
  onAttempt?: () => void;
}

const difficultyColors = {
  Easy: 'bg-primary/20 text-primary border-primary/40',
  Medium: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/40',
  Hard: 'bg-destructive/20 text-destructive border-destructive/40',
};

export default function CTFCard({ id, title, description, difficulty, category, rating = 5, players = 0, tags = [], solved, onAttempt }: CTFCardProps) {
  return (
    <div data-testid={`card-ctf-${id}`}>
        <Card className="border-primary/20 hover-elevate transition-all duration-300 h-full">
          <CardHeader>
            <div className="flex items-start justify-between gap-2 mb-2">
              <Badge variant="outline" className={difficultyColors[difficulty]}>
                {difficulty}
              </Badge>
              <Badge variant="outline">{category}</Badge>
            </div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="line-clamp-2">{description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-primary text-primary" />
                <span>{rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{players.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-1">
              {tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {solved && (
                <Badge variant="outline" className="text-xs bg-emerald-500/15 text-emerald-400 border-emerald-500/30">Completed</Badge>
              )}
            </div>
            {onAttempt && (
              <div className="mt-4">
                <Link href={`/ctf/${id}`}>
                  <a className="text-primary hover:underline mr-4">Details</a>
                </Link>
                <button className="text-xs px-2 py-1 rounded bg-primary/20 text-primary border border-primary/30" onClick={onAttempt}>
                  Submit Flag
                </button>
              </div>
            )}
          </CardContent>
        </Card>
    </div>
  );
}