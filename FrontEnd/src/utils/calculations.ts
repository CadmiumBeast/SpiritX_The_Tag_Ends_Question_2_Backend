export const calculateBattingStrikeRate = (runs: number, balls_faced: number): string | number => {
  if (balls_faced === 0) return 'Not Available';
  return ((runs / balls_faced) * 100).toFixed(2);
};

export const calculateBattingAverage = (runs: number, innings_played: number): string | number => {
  if (innings_played === 0) return 'Not Available';
  return (runs / innings_played).toFixed(2);
};

export const calculateBowlingStrikeRate = (balls_bowled: number, wickets_taken: number): string | number => {
  if (wickets_taken === 0) return 'Not Available';
  return (balls_bowled / wickets_taken).toFixed(2);
};

export const calculateEconomyRate = (runs_conceded: number, balls_bowled: number): string | number => {
  if (balls_bowled === 0) return 'Not Available';
  return ((runs_conceded / balls_bowled) * 6).toFixed(2);
};

export const calculatePlayerPoints = (player: any): number => {
  const battingStrikeRate = typeof calculateBattingStrikeRate(player.runs, player.balls_faced) === 'string' ? 0 : Number(calculateBattingStrikeRate(player.runs, player.balls_faced));
  const battingAverage = typeof calculateBattingAverage(player.runs, player.innings_played) === 'string' ? 0 : Number(calculateBattingAverage(player.runs, player.innings_played));
  const bowlingStrikeRate = typeof calculateBowlingStrikeRate(player.balls_bowled, player.wickets_taken) === 'string' ? 0 : Number(calculateBowlingStrikeRate(player.balls_bowled, player.wickets_taken));
  const economyRate = typeof calculateEconomyRate(player.runs_conceded, player.balls_bowled) === 'string' ? 0 : Number(calculateEconomyRate(player.runs_conceded, player.balls_bowled));

  return (battingStrikeRate / 5 + battingAverage * 0.8) + (bowlingStrikeRate ? 500 / bowlingStrikeRate : 0) + (economyRate ? 140 / economyRate : 0);
};

export const calculatePlayerValue = (points: number): number => {
  // Calculate value in Rupees: (9 × Points + 100) × 1000
  const valueInRupees = (9 * points + 100) * 1000;
  // Round to nearest 50,000
  return Math.round(valueInRupees / 50000) * 50000;
};

export const formatCurrency = (value: number): string => {
  return `Rs. ${value.toLocaleString('en-LK')}`;
};