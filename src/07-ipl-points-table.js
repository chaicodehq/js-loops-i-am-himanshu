/**
 * 🏆 IPL Season Points Table
 *
 * IPL ka season chal raha hai aur tujhe points table banana hai!
 * Tujhe match results ka array milega, aur tujhe har team ke points
 * calculate karke sorted table return karna hai.
 *
 * Match result types:
 *   - "win": Winning team gets 2 points, losing team gets 0
 *   - "tie": Both teams get 1 point each
 *   - "no_result": Both teams get 1 point each (rain/bad light)
 *
 * Each match object: { team1: "CSK", team2: "MI", result: "win", winner: "CSK" }
 *   - For "tie" and "no_result", the winner field is absent or ignored
 *
 * Rules (use for loop with object accumulator):
 *   - Loop through matches array
 *   - Build an object accumulator: { "CSK": { team, played, won, lost, tied, noResult, points }, ... }
 *   - After processing all matches, convert to array and sort:
 *     1. By points DESCENDING
 *     2. If points are equal, by team name ASCENDING (alphabetical)
 *
 * Validation:
 *   - Agar matches array nahi hai ya empty hai, return []
 *
 * @param {Array<{team1: string, team2: string, result: string, winner?: string}>} matches
 * @returns {Array<{team: string, played: number, won: number, lost: number, tied: number, noResult: number, points: number}>}
 *
 * @example
 *   iplPointsTable([
 *     { team1: "CSK", team2: "MI", result: "win", winner: "CSK" },
 *     { team1: "RCB", team2: "CSK", result: "tie" },
 *   ])
 *   // CSK: played=2, won=1, tied=1, points=3
 *   // MI: played=1, won=0, lost=1, points=0
 *   // RCB: played=1, tied=1, points=1
 *   // Sorted: CSK(3), RCB(1), MI(0)
 */
export function iplPointsTable(matches) {
  // Your code here
  let pt = [], loser;
  if(Array.isArray(matches) && matches.length > 0) {
    for(const match of matches){
      if(match.result === "win") {
        if(match.winner === match.team1) {
          loser = match.team2;
        } else {
          loser = match.team1;
        }
        if((pt.find((p) => p.team === match.winner)) !== undefined) {
          pt.forEach((p) => {
            if(p.team === match.winner) {
              p.played += 1;
              p.won += 1;
              p.points += 2;
            }
          })
        } else {
          pt.push({
            team: match.winner,
            played: 1,
            won: 1,
            lost: 0,
            tied: 0,
            noResult: 0,
            points: 2
          })
        }
        if((pt.find((p) => p.team === loser)) !== undefined) {
          pt.forEach((p) => {
            if(p.team === loser) {
              p.played += 1;
              p.lost += 1;
            }
          })
        } else {
          pt.push({
            team: loser,
            played: 1,
            won: 0,
            lost: 1,
            tied: 0,
            noResult: 0,
            points: 0
          })
        }
      } else if(match.result === "tie") {
        if((pt.find((p) => p.team === match.team1)) !== undefined) {
          pt.forEach((p) => {
            if(p.team === match.team1) {
              p.played += 1;
              p.tied += 1;
              p.points += 1;
            }
          })
        } else {
          pt.push({
            team: match.team1,
            played: 1,
            won: 0,
            lost: 0,
            tied: 1,
            noResult: 0,
            points: 1
          })
        }
        if((pt.find((p) => p.team === match.team2)) !== undefined) {
          pt.forEach((p) => {
            if(p.team === match.team2) {
              p.played += 1;
              p.tied += 1;
              p.points += 1;
            }
          })
        } else {
          pt.push({
            team: match.team2,
            played: 1,
            won: 0,
            lost: 0,
            tied: 1,
            noResult: 0,
            points: 1
          })
        }
      } else {
        if((pt.find((p) => p.team === match.team1)) !== undefined) {
          pt.forEach((p) => {
            if(p.team === match.team1) {
              p.played += 1;
              p.noResult += 1;
              p.points += 1;
            }
          })
        } else {
          pt.push({
            team: match.team1,
            played: 1,
            won: 0,
            lost: 0,
            tied: 0,
            noResult: 1,
            points: 1
          })
        }
        if((pt.find((p) => p.team === match.team2)) !== undefined) {
          pt.forEach((p) => {
            if(p.team === match.team2) {
              p.played += 1;
              p.noResult += 1;
              p.points += 1;
            }
          })
        } else {
          pt.push({
            team: match.team2,
            played: 1,
            won: 0,
            lost: 0,
            tied: 0,
            noResult: 1,
            points: 1
          })
        }
      }
    }
    pt.sort((a, b) => a.team.localeCompare(b.team));
    return pt.sort((a, b) => b.points - a.points);
  }
  return [];
}
