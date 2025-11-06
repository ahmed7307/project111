type Props = {
  username: string;
  email?: string;
  score?: number;
  solves?: number;
  avatarUrl?: string;
  description?: string;
};

export default function UserCard({ username, email, score, solves, avatarUrl, description }: Props) {
  return (
    <div className="p-4 rounded-lg border border-primary/20 bg-card flex gap-4 items-start">
      <img
        src={avatarUrl || `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(username)}`}
        alt={username}
        className="w-16 h-16 rounded-full border border-primary/30"
      />
      <div className="space-y-1">
        <div className="text-lg font-semibold">{username}</div>
        {email && <div className="text-muted-foreground text-sm">{email}</div>}
        <div className="text-sm">Score: {score ?? 0} · Solves: {solves ?? 0}</div>
        {description && <p className="text-sm text-muted-foreground whitespace-pre-wrap">{description}</p>}
      </div>
    </div>
  );
}


