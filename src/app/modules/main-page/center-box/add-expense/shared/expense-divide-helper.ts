export const splitEvenly = (users: number, expense: number) => {
  return expense / users;
}

export const splitByPercent = (percent: number, expense: number) => {
  return (expense * percent) / 100;
}
