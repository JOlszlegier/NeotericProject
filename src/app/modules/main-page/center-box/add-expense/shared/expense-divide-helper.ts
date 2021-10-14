export const splitEvenly = (users: number, expense: number) => {
  return expense / users;
}

export const splitByPercent = (percent: number, expense: number) => {
  return (expense * percent) / 100;
}

export const canExtend = (users: string[], value: number) => {
  return (users.length > 1 && value !== 0);
}

