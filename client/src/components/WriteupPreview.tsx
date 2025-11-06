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

export default function WriteupPreview({ title, content, author, createdAt, challengeName, tags }: Writeup) {
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


