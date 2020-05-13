var fibs = [0, 1];

export const fib = (i: number): number => {
  if (i < 0) return 0;
  while (fibs.length < i + 1) {
    fibs.push(fibs[fibs.length - 1] + fibs[fibs.length - 2]);
  }
  return fibs[i];
};