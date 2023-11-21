import { CalculateDateResponse } from 'src/payment/interfaces';

export const CalculateDate = (_date: string): CalculateDateResponse => {
  const startDate = new Date(_date);
  // Calcular endDate sumando 6 días a startDate
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  // Calcular el próximo viernes cercano después de endDate
  const paymentDate = new Date(endDate);
  const daysToFriday = (8 - endDate.getDay() + 7) % 7;
  paymentDate.setDate(endDate.getDate() + daysToFriday);

  return {
    startDate,
    endDate,
    paymentDate,
  };
};
