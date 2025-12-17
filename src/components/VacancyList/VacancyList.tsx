import { Loader, Alert } from '@mantine/core';
import { VacancyCard } from './VacancyCard';
import { Filters } from '../Filters/Filters';
import { SearchBar } from '../SearchBar/SearchBar';
import { Pagination } from '../Pagination/Pagination';
import { useGetVacanciesQuery } from '../../api/hhApi';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import styles from './VacancyList.module.css'; // Импорт стилей

export const VacancyList = () => {
   const filters = useSelector((state: RootState) => state.vacancies.filters);

   const { data, isLoading, error } = useGetVacanciesQuery({
      page: filters.page,
      per_page: 10,
      text: filters.search || undefined,
      area: filters.city || undefined,
      skill_set: filters.skills.length > 0 ? filters.skills : undefined,
   });

   return (
      <div className={styles.container}>
         {/* 1. SearchBar */}
         <SearchBar />

         {/* 2. Заголовок СЛЕВА */}
         <div className={styles.titleContainer}>
            <div className={styles.mainTitle}>
               Список вакансий
            </div>
            <div className={styles.subtitle}>
               по профессии Frontend-разработчик
            </div>
         </div>

         {/* 3. Фильтры СЛЕВА */}
         <div className={styles.filtersContainer}>
            <Filters />
         </div>

         {/* 4. КОНТЕЙНЕР для вакансий и пагинации */}
         <div className={styles.vacanciesContainer}>
            {/* 4.1 Контейнер для 10 карточек */}
            <div className={styles.cardsContainer}>
               {isLoading && (
                  <div className={styles.loaderContainer}>
                     <Loader size="lg" />
                  </div>
               )}

               {error && (
                  <Alert title="Ошибка загрузки" color="red" variant="filled">
                     Не удалось загрузить вакансий. Попробуйте обновить страницу.
                  </Alert>
               )}

               {!isLoading && !error && data?.items && data.items.length > 0 && (
                  <>
                     {data.items.map((vacancy) => (
                        <VacancyCard key={vacancy.id} vacancy={vacancy} />
                     ))}
                  </>
               )}

               {!isLoading && !error && (!data?.items || data.items.length === 0) && (
                  <Alert title="Нет вакансий" color="yellow">
                     По вашему запросу не найдено вакансий.
                  </Alert>
               )}
            </div>

            {/* 4.2 Пагинация */}
            <div className={styles.paginationContainer}>
               <Pagination
                  currentPage={filters.page}
                  totalPages={data?.pages || 1}
               />
            </div>
         </div>
      </div>
   );
};