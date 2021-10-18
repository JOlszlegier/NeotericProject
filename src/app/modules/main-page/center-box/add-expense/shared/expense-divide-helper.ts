export const splitEvenly = (users: number, expense: number): number => {
  return expense / users;
}

export const splitByPercent = (percent: number, expense: number): number => {
  return (expense * percent) / 100;
}

export const canExtend = (users: string[], value: number): boolean => {
  return (users.length > 1 && value !== 0);
}

