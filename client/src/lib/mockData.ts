// Mock data for the Hacking Vidya platform
// todo: remove mock functionality

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  avatar: string;
  bio: string;
  xp: number;
  rank: string;
  streak: number;
  completedRooms: number;
  status: 'active' | 'banned';
}

export interface CTF {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  creator: string;
  rating: number;
  players: number;
  tags: string[];
}

export interface Blog {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  date: string;
  content: string;
  excerpt: string;
  tags: string[];
  likes: number;
  comments: number;
  thumbnail: string;
}

export interface Writeup {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  date: string;
  content: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  likes: number;
}

export interface Report {
  id: string;
  reporterId: string;
  bugTitle: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'pending' | 'approved' | 'rejected';
  description: string;
  submittedDate: string;
}

export interface HallOfFameEntry {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  bugTitle: string;
  reward: string;
  date: string;
}

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'user',
    email: 'user@example.com',
    password: 'password',
    role: 'user',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user',
    bio: 'Cybersecurity enthusiast | CTF player',
    xp: 4250,
    rank: 'Advanced',
    streak: 12,
    completedRooms: 24,
    status: 'active',
  },
  {
    id: '2',
    username: 'admin',
    email: 'admin@example.com',
    password: 'admin',
    role: 'admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    bio: 'Platform administrator',
    xp: 8500,
    rank: 'Elite',
    streak: 45,
    completedRooms: 67,
    status: 'active',
  },
  {
    id: '3',
    username: 'h4ck3r_0x01',
    email: 'hacker@example.com',
    password: 'password',
    role: 'user',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=hacker1',
    bio: 'Bug bounty hunter | Security researcher',
    xp: 7200,
    rank: 'Expert',
    streak: 28,
    completedRooms: 52,
    status: 'active',
  },
];

export const mockCTFs: CTF[] = [
  {
    id: '1',
    title: 'Web Exploitation 101',
    description: 'Learn the basics of web application security and common vulnerabilities like SQL injection, XSS, and CSRF.',
    difficulty: 'Easy',
    category: 'Web',
    creator: 'admin',
    rating: 4.8,
    players: 1523,
    tags: ['Web', 'SQL Injection', 'XSS'],
  },
  {
    id: '2',
    title: 'Reverse Engineering Challenge',
    description: 'Crack this binary and find the hidden flag. Understanding x86 assembly required.',
    difficulty: 'Hard',
    category: 'Reversing',
    creator: 'h4ck3r_0x01',
    rating: 4.5,
    players: 542,
    tags: ['Reverse Engineering', 'Assembly', 'Binary'],
  },
  {
    id: '3',
    title: 'Network Forensics',
    description: 'Analyze network traffic captures to identify malicious activity and extract IOCs.',
    difficulty: 'Medium',
    category: 'Forensics',
    creator: 'admin',
    rating: 4.6,
    players: 892,
    tags: ['Forensics', 'Network', 'Wireshark'],
  },
];

export const mockBlogs: Blog[] = [
  {
    id: '1',
    title: 'Getting Started with Bug Bounty Hunting',
    author: 'admin',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    date: '2024-10-28',
    excerpt: 'Learn the fundamentals of bug bounty hunting and how to get started in your cybersecurity career.',
    content: `# Getting Started with Bug Bounty Hunting\n\nBug bounty hunting is an exciting way to earn money while improving your security skills...\n\n## Prerequisites\n\n- Understanding of web technologies\n- Basic programming knowledge\n- Patience and persistence`,
    tags: ['Bug Bounty', 'Career', 'Tutorial'],
    likes: 245,
    comments: 32,
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400',
  },
  {
    id: '2',
    title: 'Advanced XSS Exploitation Techniques',
    author: 'h4ck3r_0x01',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=hacker1',
    date: '2024-10-25',
    excerpt: 'Dive deep into advanced cross-site scripting techniques and bypass methods.',
    content: `# Advanced XSS Exploitation\n\nCross-site scripting remains one of the most common vulnerabilities...`,
    tags: ['XSS', 'Web Security', 'Advanced'],
    likes: 312,
    comments: 45,
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400',
  },
];

export const mockWriteups: Writeup[] = [
  {
    id: '1',
    title: 'Web Exploitation 101 - Complete Walkthrough',
    author: 'user',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user',
    date: '2024-10-26',
    content: `# Web Exploitation 101 Walkthrough\n\n## Initial Reconnaissance\n\nStarted by running a port scan...\n\n\`\`\`bash\nnmap -sC -sV 10.10.10.100\n\`\`\``,
    category: 'Web',
    difficulty: 'Easy',
    likes: 89,
  },
  {
    id: '2',
    title: 'Cracking the Reverse Engineering Challenge',
    author: 'h4ck3r_0x01',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=hacker1',
    date: '2024-10-24',
    content: `# Reverse Engineering Challenge Writeup\n\nThis was a tough one! Let's dive in...`,
    category: 'Reversing',
    difficulty: 'Hard',
    likes: 156,
  },
];

export const mockReports: Report[] = [
  {
    id: '1',
    reporterId: '3',
    bugTitle: 'XSS Vulnerability in Profile Page',
    severity: 'High',
    status: 'pending',
    description: 'Found a stored XSS vulnerability in the user bio field...',
    submittedDate: '2024-10-29',
  },
  {
    id: '2',
    reporterId: '1',
    bugTitle: 'CSRF Token Missing on Password Reset',
    severity: 'Medium',
    status: 'approved',
    description: 'Password reset endpoint lacks CSRF protection...',
    submittedDate: '2024-10-20',
  },
];

export const mockHallOfFame: HallOfFameEntry[] = [
  {
    id: '1',
    userId: '1',
    username: 'user',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user',
    bugTitle: 'CSRF Token Missing on Password Reset',
    reward: 'Hall of Fame + $500',
    date: '2024-10-21',
  },
];

export const mockLeaderboard = [
  { rank: 1, username: 'admin', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin', xp: 8500, completedRooms: 67 },
  { rank: 2, username: 'h4ck3r_0x01', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=hacker1', xp: 7200, completedRooms: 52 },
  { rank: 3, username: 'user', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user', xp: 4250, completedRooms: 24 },
  { rank: 4, username: 'cyber_ninja', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ninja', xp: 3980, completedRooms: 21 },
  { rank: 5, username: 'sec_guru', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=guru', xp: 3750, completedRooms: 19 },
];