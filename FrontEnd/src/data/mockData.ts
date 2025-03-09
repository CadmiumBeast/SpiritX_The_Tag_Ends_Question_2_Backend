export interface Player {
  id: string;
  name: string;
  university: string;
  category: 'Batsman' | 'Bowler' | 'All-Rounder';
  runs: number;
  balls_faced: number;
  innings_played: number;
  wickets_taken: number;
  balls_bowled: number;
  runs_conceded: number;
}

export interface User {
  username: string;
  password: string;
  budget: number;
  selectedTeam: string[];
  teamName?: string;
}

export const players: Player[] = [
  {
    id: '1',
    name: 'Chamika Chandimal',
    university: 'University of the Visual & Performing Arts',
    category: 'Batsman',
    runs: 530,
    balls_faced: 588,
    innings_played: 10,
    wickets_taken: 0,
    balls_bowled: 3,
    runs_conceded: 21
  },
  {
    id: '2',
    name: 'Dimuth Dhananjaya',
    university: 'University of the Visual & Performing Arts',
    category: 'All-Rounder',
    runs: 250,
    balls_faced: 208,
    innings_played: 10,
    wickets_taken: 8,
    balls_bowled: 40,
    runs_conceded: 240
  },
  {
    id: '3',
    name: 'Avishka Mendis',
    university: 'Eastern University',
    category: 'All-Rounder',
    runs: 210,
    balls_faced: 175,
    innings_played: 7,
    wickets_taken: 7,
    balls_bowled: 35,
    runs_conceded: 210
  },
  {
    id: '4',
    name: 'Danushka Kumara',
    university: 'University of the Visual & Performing Arts',
    category: 'Batsman',
    runs: 780,
    balls_faced: 866,
    innings_played: 15,
    wickets_taken: 0,
    balls_bowled: 5,
    runs_conceded: 35
  },
  {
    id: '5',
    name: 'Praveen Vandersay',
    university: 'Eastern University',
    category: 'Batsman',
    runs: 329,
    balls_faced: 365,
    innings_played: 7,
    wickets_taken: 0,
    balls_bowled: 3,
    runs_conceded: 24
  },
  {
    id: '6',
    name: 'Niroshan Mathews',
    university: 'University of the Visual & Performing Arts',
    category: 'Batsman',
    runs: 275,
    balls_faced: 305,
    innings_played: 5,
    wickets_taken: 0,
    balls_bowled: 2,
    runs_conceded: 18
  },
  {
    id: '7',
    name: 'Chaturanga Gunathilaka',
    university: 'University of Moratuwa',
    category: 'Bowler',
    runs: 132,
    balls_faced: 264,
    innings_played: 11,
    wickets_taken: 29,
    balls_bowled: 88,
    runs_conceded: 528
  },
  {
    id: '8',
    name: 'Lahiru Rathnayake',
    university: 'University of Ruhuna',
    category: 'Batsman',
    runs: 742,
    balls_faced: 824,
    innings_played: 14,
    wickets_taken: 0,
    balls_bowled: 1,
    runs_conceded: 8
  },
  {
    id: '9',
    name: 'Jeewan Thirimanne',
    university: 'University of Jaffna',
    category: 'Batsman',
    runs: 780,
    balls_faced: 866,
    innings_played: 15,
    wickets_taken: 0,
    balls_bowled: 3,
    runs_conceded: 24
  },
  {
    id: '10',
    name: 'Kalana Samarawickrama',
    university: 'Eastern University',
    category: 'Batsman',
    runs: 728,
    balls_faced: 808,
    innings_played: 14,
    wickets_taken: 0,
    balls_bowled: 4,
    runs_conceded: 32
  },
  {
    id: '50',
    name: 'Tharindu Embuldeniya',
    university: 'University of the Visual & Performing Arts',
    category: 'All-Rounder',
    runs: 264,
    balls_faced: 220,
    innings_played: 12,
    wickets_taken: 12,
    balls_bowled: 60,
    runs_conceded: 360
  }
];

// Initialize user with budget in Rupees (9 million)
export const users: User[] = [
  {
    username: 'demo',
    password: 'password123',
    budget: 9000000,
    selectedTeam: []
  }
];