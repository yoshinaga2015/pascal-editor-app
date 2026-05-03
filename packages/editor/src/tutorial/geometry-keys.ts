/** Match `@pascal-app/core` wall-mitering tolerance for endpoint clustering */
export const TUTORIAL_POINT_TOLERANCE = 0.001

export function tutorialPointKey(x: number, y: number): string {
  const snap = 1 / TUTORIAL_POINT_TOLERANCE
  return `${Math.round(x * snap)},${Math.round(y * snap)}`
}
