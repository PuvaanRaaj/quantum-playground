// Deliberately bounded educational models; each UI states its assumptions.
export function lorentz(beta: number) {
  if (!Number.isFinite(beta) || beta < 0 || beta >= 1)
    throw Error("Speed must satisfy 0 ≤ v/c < 1.");
  return 1 / Math.sqrt(1 - beta * beta);
}
export function gravitationalClock(radiusRatio: number) {
  if (!Number.isFinite(radiusRatio) || radiusRatio <= 1)
    throw Error("A static clock must be outside the Schwarzschild horizon.");
  return Math.sqrt(1 - 1 / radiusRatio);
}
export const schwarzschildKm = (solarMasses: number) =>
  2.95325008 * solarMasses;
export function bellCorrelation(angleDegrees: number) {
  return -Math.cos((angleDegrees * Math.PI) / 180);
}
export function gaussianUncertainty(sigmaX: number) {
  return { sigmaX, sigmaP: 1 / (2 * sigmaX) };
}
export function bayes(
  prior: number,
  sensitivity: number,
  falsePositive: number,
) {
  const evidence = prior * sensitivity + (1 - prior) * falsePositive;
  return evidence === 0 ? null : (prior * sensitivity) / evidence;
}
export function midpointSquareArea(slices: number) {
  let sum = 0;
  for (let i = 0; i < slices; i++) sum += ((i + 0.5) / slices) ** 2 / slices;
  return sum;
}
