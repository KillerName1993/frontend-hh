import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { VacanciesResponse } from '../types';

export const hhApi = createApi({
   reducerPath: 'hhApi',
   baseQuery: fetchBaseQuery({
      baseUrl: 'https://api.hh.ru/',
      prepareHeaders: (headers) => {
         headers.set('User-Agent', 'Frontend-HH-App/1.0');
         return headers;
      }
   }),
   endpoints: (builder) => ({
      getVacancies: builder.query<VacanciesResponse, {
         page?: number;
         text?: string;
         area?: string;
         skill_set?: string[];
         per_page?: number;
      }>({
         query: (params) => ({
            url: 'vacancies',
            params: {
               industry: 7,
               professional_role: 96,
               per_page: 10,
               ...params,
               // search_field удалён - он вызывает ошибку 400
            },
         }),
      }),
   }),
});

export const { useGetVacanciesQuery } = hhApi;