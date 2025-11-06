import { useMemo } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  minHeight?: number;
};

export default function MarkdownEditor({ value, onChange, placeholder, minHeight = 220 }: Props) {
  const html = useMemo(() => {
    const raw = marked.parse(value || '');
    return { __html: DOMPurify.sanitize(typeof raw === 'string' ? raw : (raw as any).toString()) };
  }, [value]);

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-input rounded-md bg-background font-mono text-sm"
        style={{ minHeight }}
      />
      <div className="border border-input rounded-md bg-card p-3 overflow-auto" style={{ minHeight }}>
        <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={html} />
      </div>
    </div>
  );
}


