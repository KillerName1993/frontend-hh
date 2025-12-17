import { Card, Text, Button } from '@mantine/core';
import type { Vacancy } from '../../types';
import styles from './VacancyCard.module.css';

interface VacancyCardProps {
   vacancy: Vacancy;
}

export const VacancyCard = ({ vacancy }: VacancyCardProps) => {
   const formatSalary = () => {
      if (!vacancy.salary) return 'з/п не указана';

      const { from, to, currency } = vacancy.salary;
      if (!from && !to) return 'з/п не указана';

      const format = (num: number) => num.toLocaleString('ru-RU');
      const currencySymbol = currency === 'RUR' ? '₽' : currency;

      if (from && to) return `от ${format(from)} до ${format(to)} ${currencySymbol}`;
      if (from) return `от ${format(from)} ${currencySymbol}`;
      if (to) return `до ${format(to)} ${currencySymbol}`;

      return 'з/п не указана';
   };

   const getWorkFormatColor = (schedule: string) => {
      const formatMap: Record<string, { background: string; text: string }> = {
         'Удаленная работа': { background: '#4263EB', text: 'white' },
         'remote': { background: '#4263EB', text: 'white' },
         'Полный день': { background: '#EAEBED', text: '#5C5C5C' },
         'Офис': { background: '#EAEBED', text: '#5C5C5C' },
         'fullDay': { background: '#EAEBED', text: '#5C5C5C' },
         'Гибрид': { background: '#0F0F10', text: 'white' },
         'flexible': { background: '#0F0F10', text: 'white' },
      };

      return formatMap[schedule] || { background: '#EAEBED', text: '#5C5C5C' };
   };

   const getWorkFormatText = (schedule: string) => {
      const textMap: Record<string, string> = {
         'Удаленная работа': 'МОЖНО УДАЛЁННО',
         'remote': 'МОЖНО УДАЛЁННО',
         'Офис': 'ОФИС',
         'Полный день': 'ОФИС',
         'fullDay': 'ОФИС',
         'Гибрид': 'ГИБРИД',
         'flexible': 'ГИБРИД',
      };

      return textMap[schedule] || schedule;
   };

   const workFormat = getWorkFormatColor(vacancy.schedule.name);
   const workFormatText = getWorkFormatText(vacancy.schedule.name);

   return (
      <Card
         shadow="sm"
         withBorder
         className={styles.card}
      >
         {/* Верхняя часть: название, зарплата, опыт */}
         <div className={styles.header}>
            <Text
               className={styles.title}
               title={vacancy.name}
            >
               {vacancy.name}
            </Text>

            <div className={styles.infoRow}>
               <Text className={styles.salaryText}>
                  {formatSalary()}
               </Text>
               <Text className={styles.experienceText}>
                  {vacancy.experience.name}
               </Text>
            </div>
         </div>

         {/* Средняя часть: компания и локация */}
         <div className={styles.content}>
            <Text className={styles.employer}>
               {vacancy.employer.name}
            </Text>

            <div className={styles.locationContainer}>
               <div
                  className={styles.workFormatBadge}
                  style={{
                     backgroundColor: workFormat.background,
                     color: workFormat.text
                  }}
               >
                  {workFormatText}
               </div>

               <Text className={styles.city}>
                  {vacancy.area.name}
               </Text>
            </div>
         </div>

         {/* Нижняя часть: кнопки */}
         <div className={styles.footer}>
            <div className={styles.buttonGroup}>
               <Button
                  variant="filled"
                  styles={{
                     root: {
                        width: '172px',
                        height: '36px',
                        borderRadius: '4px',
                        backgroundColor: '#0F0F10',
                        color: 'white',
                        fontFamily: 'Open Sans, sans-serif',
                        fontWeight: 400,
                        fontSize: '14px',
                        lineHeight: '34px',
                        padding: '1px 18px',
                        gap: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: 'none',
                        letterSpacing: '0%'
                     }
                  }}
               >
                  Смотреть вакансию
               </Button>

               <Button
                  variant="filled"
                  styles={{
                     root: {
                        width: '131px',
                        height: '36px',
                        borderRadius: '4px',
                        backgroundColor: 'rgba(15, 15, 16, 0.1)',
                        color: '#0F0F10',
                        fontFamily: 'Open Sans, sans-serif',
                        fontWeight: 400,
                        fontSize: '14px',
                        lineHeight: '34px',
                        padding: '1px 18px',
                        gap: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: 'none',
                        letterSpacing: '0%'
                     }
                  }}
                  onClick={() => window.open(vacancy.alternate_url || '#', '_blank')}
               >
                  Откликнуться
               </Button>
            </div>
         </div>
      </Card>
   );
};