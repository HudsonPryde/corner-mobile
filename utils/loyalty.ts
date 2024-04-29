import { LoyaltyProgramTerminology } from 'square';

export function getRewardTerminology(
  points: number | undefined | null,
  terminology: LoyaltyProgramTerminology | undefined | null
): string {
  if (!terminology || !points) {
    return '';
  }
  return points === 1 ? terminology.one : terminology.other;
}
