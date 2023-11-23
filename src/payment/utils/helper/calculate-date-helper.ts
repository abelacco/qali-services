import { CalculateDateResponse } from 'src/payment/interfaces';

export const CalculateDate = (_date: string): CalculateDateResponse => {
  const startDate = new Date(_date);
  if (startDate.getDay() !== 0) {
    const daysToMonday = (startDate.getDay() + 6) % 7; // Calcula los días que faltan para llegar al lunes
    startDate.setDate(startDate.getDate() - daysToMonday); // Resta esos días para llegar al lunes
    startDate.setHours(0, 0, 0, 0);
  }

  // Calcular endDate sumando 6 días a startDate
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  // Calcular el próximo viernes cercano después de endDate
  const paymentDate = new Date(endDate);
  const daysToFriday = (5 - endDate.getDay() + 7) % 7;
  paymentDate.setDate(endDate.getDate() + daysToFriday);

  return {
    startDate,
    endDate,
    paymentDate,
  };
};
