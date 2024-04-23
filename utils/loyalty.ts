import { LoyaltyProgramTerminology } from 'square';

export function getRewardTerminology(
  points: number,
  terminology: LoyaltyProgramTerminology
): string {
  return points === 1 ? terminology.one : terminology.other;
}
