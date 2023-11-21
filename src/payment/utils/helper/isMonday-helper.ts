export const verifyIsMonday = (date: string): number => {
  const day = new Date(date).getDay();
  if (day !== 0) return 0;
  else return 1;
};
