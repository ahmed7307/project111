import { Switch, Route, Redirect } from 'wouter';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { Toaster as HotToaster } from 'react-hot-toast';
import { getCurrentUser } from './lib/auth';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CTFList from './pages/CTFList';
import CTFDetail from './pages/CTFDetail';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';
import WriteupList from './pages/WriteupList';
import WriteupDetail from './pages/WriteupDetail';
import Leaderboard from './pages/Leaderboard';
import HallOfFame from './pages/HallOfFame';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import About from './pages/About';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminReports from './pages/admin/AdminReports';
import AdminHallOfFame from './pages/admin/AdminHallOfFame';
import AdminUsers from './pages/admin/AdminUsers';
import AdminSettings from './pages/admin/AdminSettings';
import NotFound from './pages/not-found';

function Router() {
  const user = getCurrentUser();

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/ctfs" component={CTFList} />
      <Route path="/ctf/:id" component={CTFDetail} />
      <Route path="/blogs" component={BlogList} />
      <Route path="/blog/:id" component={BlogDetail} />
      <Route path="/writeups" component={WriteupList} />
      <Route path="/writeup/:id" component={WriteupDetail} />
      <Route path="/leaderboard" component={Leaderboard} />
      <Route path="/halloffame" component={HallOfFame} />
      <Route path="/profile" component={Profile} />
      <Route path="/settings" component={Settings} />
      <Route path="/faq" component={FAQ} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/about" component={About} />
      
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/reports" component={AdminReports} />
      <Route path="/admin/halloffame" component={AdminHallOfFame} />
      <Route path="/admin/users" component={AdminUsers} />
      <Route path="/admin/settings" component={AdminSettings} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <HotToaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'hsl(var(--card))',
            color: 'hsl(var(--foreground))',
            border: '1px solid hsl(var(--primary) / 0.2)',
          },
          success: {
            iconTheme: {
              primary: 'hsl(var(--primary))',
              secondary: 'hsl(var(--card))',
            },
          },
        }}
      />
    </QueryClientProvider>
  );
}