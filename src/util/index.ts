export function easeIn(x: number): number {
    return Math.sqrt(1 - Math.pow(Math.abs(x) - 1, 2));
}
