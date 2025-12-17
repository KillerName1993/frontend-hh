export const formatSalary = (
   salary: { from: number | null; to: number | null; currency: string } | null
): string => {
   if (!salary) return 'з/п не указана';

   const { from, to, currency } = salary;
   if (!from && !to) return 'з/п не указана';

   const format = (num: number) => num.toLocaleString('ru-RU');
   const currencySymbol = currency === 'RUR' ? '₽' : currency;

   if (from && to) return `от ${format(from)} до ${format(to)} ${currencySymbol}`;
   if (from) return `от ${format(from)} ${currencySymbol}`;
   if (to) return `до ${format(to)} ${currencySymbol}`;

   return 'з/п не указана';
};

export const getScheduleColor = (schedule: string): string => {
   const scheduleMap: Record<string, string> = {
      'remote': 'green',
      'fullDay': 'blue',
      'flexible': 'orange',
      'Удаленная работа': 'green',
      'Офис': 'blue',
      'Гибрид': 'orange',
   };
   return scheduleMap[schedule] || 'gray';
};