import { useState } from 'react';
import { submitFlag } from '@/lib/ctfdClient';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

type Props = {
  open: boolean;
  onClose: () => void;
  challengeId: number;
  challengeName?: string;
};

export default function FlagModal({ open, onClose, challengeId, challengeName }: Props) {
  const [flag, setFlag] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const ok = await submitFlag(challengeId, flag);
      if (ok) {
        toast.success('Correct flag!');
        setFlag('');
        onClose();
      } else {
        toast.error('Incorrect flag');
      }
    } catch (e: any) {
      toast.error(e?.message ?? 'Failed to submit flag');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => (!v ? onClose() : null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Submit Flag{challengeName ? ` — ${challengeName}` : ''}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <input
            className="w-full px-3 py-2 rounded-md border border-input bg-background"
            placeholder="flag{...}"
            value={flag}
            onChange={(e) => setFlag(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={onClose} disabled={loading}>Cancel</Button>
            <Button onClick={handleSubmit} disabled={loading || !flag.trim()}>Submit</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}


