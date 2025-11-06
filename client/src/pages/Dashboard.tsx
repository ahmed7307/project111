import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useSession } from '@/lib/session';
import { fetchChallenges, fetchSolves, getBlogs, getWriteups } from '@/lib/ctfdClient';

function DashboardContent() {
  const { user } = useSession();
  const [challenges, setChallenges] = useState<any[]>([]);
  const [solvedIds, setSolvedIds] = useState<number[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [writeups, setWriteups] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const [chs, solves, bs, ws] = await Promise.all([
        fetchChallenges().catch(() => []),
        fetchSolves().catch(() => []),
        getBlogs().catch(() => []),
        getWriteups().catch(() => []),
      ]);
      setChallenges(chs as any[]);
      setSolvedIds(solves as number[]);
      setBlogs((bs as any[]).filter((b) => !user?.name || b.author === user.name));
      setWriteups((ws as any[]).filter((w) => !user?.name || w.author === user.name));
    })();
  }, [user]);

  const total = challenges.length || 1;
  const solved = useMemo(() => solvedIds.length, [solvedIds]);
  const points = useMemo(
    () => challenges.filter((c) => solvedIds.includes(Number(c.id))).reduce((s, c) => s + (c.value || 0), 0),
    [challenges, solvedIds]
  );

  const badges = [
    { need: 5, label: 'Learner' },
    { need: 10, label: 'Pro Hacker' },
    { need: 25, label: 'Elite' },
  ].filter((b) => solved >= b.need);

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
            <h1 className="font-serif text-3xl font-bold mb-2">Welcome back{user?.name ? `, ${user.name}` : ''}</h1>
            <p className="text-muted-foreground mb-8">Here's your progress overview</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Card className="border-primary/20"><CardHeader><CardTitle>Total Points</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold text-primary">{points}</div></CardContent></Card>
              <Card className="border-primary/20"><CardHeader><CardTitle>Solved</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold">{solved}</div></CardContent></Card>
              <Card className="border-primary/20"><CardHeader><CardTitle>Challenges</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold">{challenges.length}</div></CardContent></Card>
              <Card className="border-primary/20"><CardHeader><CardTitle>Badges</CardTitle></CardHeader><CardContent><div className="flex gap-2 flex-wrap">{badges.length ? badges.map(b => <span key={b.label} className="text-xs px-2 py-1 rounded bg-primary/10 text-primary border border-primary/30">{b.label}</span>) : <span className="text-muted-foreground text-sm">No badges yet</span>}</div></CardContent></Card>
            </div>

            <Card className="border-primary/20 mb-8">
              <CardHeader><CardTitle>Progress</CardTitle></CardHeader>
              <CardContent>
                <div className="mb-2 text-sm">{solved}/{challenges.length || 0} challenges solved</div>
                <Progress value={(solved / (challenges.length || 1)) * 100} />
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-primary/20">
                <CardHeader><CardTitle>Your Recent Blogs</CardTitle></CardHeader>
                <CardContent>
                  {blogs.slice(0,5).length === 0 ? <p className="text-sm text-muted-foreground">No blogs yet.</p> :
                    <ul className="list-disc list-inside space-y-1">{blogs.slice(0,5).map(b => <li key={b.id}>{b.title}</li>)}</ul>}
                </CardContent>
              </Card>
              <Card className="border-primary/20">
                <CardHeader><CardTitle>Your Recent Write-ups</CardTitle></CardHeader>
                <CardContent>
                  {writeups.slice(0,5).length === 0 ? <p className="text-sm text-muted-foreground">No write-ups yet.</p> :
                    <ul className="list-disc list-inside space-y-1">{writeups.slice(0,5).map(w => <li key={w.id}>{w.title}</li>)}</ul>}
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}