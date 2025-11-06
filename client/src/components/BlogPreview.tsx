type Blog = {
  id: string;
  title: string;
  content: string;
  category?: string;
  author: string;
  createdAt: string;
};

export default function BlogPreview({ title, content, category, author, createdAt }: Blog) {
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


