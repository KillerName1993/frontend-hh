import { Card, Text, Group, Button } from '@mantine/core';
import type { Vacancy } from '../../types';

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

   // Функция для определения цвета формата работы
   const getWorkFormatColor = (schedule: string) => {
      const formatMap: Record<string, { background: string; text: string }> = {
         'Удаленная работа': { background: '#4263EB', text: 'white' },
         'remote': { background: '#4263EB', text: 'white' },
         'Офис': { background: '#EAEBED', text: '#5C5C5C' },
         'fullDay': { background: '#EAEBED', text: '#5C5C5C' },
         'Гибрид': { background: '#0F0F10', text: 'white' },
         'flexible': { background: '#0F0F10', text: 'white' },
      };

      return formatMap[schedule] || { background: '#EAEBED', text: '#5C5C5C' };
   };

   // Функция для определения текста формата работы
   const getWorkFormatText = (schedule: string) => {
      const textMap: Record<string, string> = {
         'Удаленная работа': 'МОЖНО УДАЛЁННО',
         'remote': 'МОЖНО УДАЛЁННО',
         'Офис': 'ОФИС',
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
         style={{
            width: '659px',
            height: '248px',
            borderRadius: '12px',
            padding: '24px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column'
         }}
      >
         {/* Верхняя часть: название, зарплата, опыт */}
         <div style={{
            width: '611px',
            height: '56px',
            marginBottom: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
         }}>
            {/* Название вакансии С ОБРЕЗКОЙ */}
            <Text
               style={{
                  width: '611px',
                  height: '24px',
                  fontFamily: 'Open Sans, sans-serif',
                  fontWeight: 600,
                  fontSize: '20px',
                  lineHeight: '24px',
                  letterSpacing: '0%',
                  color: '#364FC7',
                  margin: 0,
                  whiteSpace: 'nowrap', // Не переносить на другую строку
                  overflow: 'hidden', // Скрыть лишнее
                  textOverflow: 'ellipsis', // Добавить многоточие
               }}
               title={vacancy.name} // Полное название при наведении
            >
               {vacancy.name}
            </Text>

            {/* Информация о зарплате и опыте */}
            <div style={{
               display: 'flex',
               alignItems: 'center',
               gap: '16px',
               height: '24px',
               flexWrap: 'nowrap'
            }}>
               {/* Зарплата */}
               <Text
                  style={{
                     fontFamily: 'Open Sans, sans-serif',
                     fontWeight: 400,
                     fontSize: '16px',
                     lineHeight: '24px',
                     color: '#010007ff',
                     whiteSpace: 'nowrap',
                     flexShrink: 0
                  }}
               >
                  {formatSalary()}
               </Text>

               {/* Опыт работы */}
               <Text
                  style={{
                     fontFamily: 'Open Sans, sans-serif',
                     fontWeight: 400,
                     fontSize: '14px',
                     lineHeight: '24px',
                     color: 'rgba(15, 15, 16, 0.5)',
                     whiteSpace: 'nowrap',
                     flexShrink: 0
                  }}
               >
                  {vacancy.experience.name}
               </Text>
            </div>
         </div>

         {/* Средняя часть: компания и локация */}
         <div style={{
            width: '611px',
            height: '76px',
            marginBottom: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
         }}>
            {/* Работодатель */}
            <Text
               style={{
                  width: '611px',
                  height: '24px',
                  fontFamily: 'Open Sans, sans-serif',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '24px',
                  letterSpacing: '0%',
                  color: '#0F0F10',
                  opacity: 0.5,
                  margin: 0
               }}
            >
               {vacancy.employer.name}
            </Text>

            {/* Локация и формат работы */}
            <div style={{
               width: '157px',
               height: '44px',
               display: 'flex',
               flexDirection: 'column',
               gap: '4px'
            }}>
               {/* Формат работы (удаленка/офис/гибрид) */}
               <div
                  style={{
                     width: 'fit-content',
                     height: '16px',
                     borderRadius: '2px',
                     padding: '1px 6px',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                     gap: '4px',
                     backgroundColor: workFormat.background,
                     color: workFormat.text,
                     fontSize: '10px',
                     fontWeight: 500,
                     lineHeight: '16px'
                  }}
               >
                  {workFormatText}
               </div>

               {/* Город */}
               <Text
                  style={{
                     width: '157px',
                     height: '24px',
                     fontFamily: 'Open Sans, sans-serif',
                     fontWeight: 400,
                     fontSize: '16px',
                     lineHeight: '24px',
                     letterSpacing: '0%',
                     color: '#0F0F10',
                     margin: 0
                  }}
               >
                  {vacancy.area.name}
               </Text>
            </div>
         </div>

         {/* Нижняя часть: кнопки - строго 315x36 с gap: 12px */}
         <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'flex-end'
         }}>
            <Group style={{
               width: '315px',
               height: '36px',
               gap: '12px',
               marginLeft: '0',
               marginTop: 'auto',
               display: 'flex',
               flexDirection: 'row'
            }}>
               {/* Кнопка "Смотреть вакансию" */}
               <Button
                  variant="filled"
                  style={{
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
                  }}
               >
                  Смотреть вакансию
               </Button>

               {/* Кнопка "Откликнуться" */}
               <Button
                  variant="filled"
                  style={{
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
                  }}
                  onClick={() => window.open(vacancy.alternate_url || '#', '_blank')}
               >
                  Откликнуться
               </Button>
            </Group>
         </div>
      </Card>
   );
};


