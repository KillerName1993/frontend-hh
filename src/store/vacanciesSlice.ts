import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
   search: string;
   city: string;
   skills: string[];
   page: number;
}

interface VacanciesState {
   filters: FiltersState;
}

const initialState: VacanciesState = {
   filters: {
      search: '',
      city: '',
      skills: ['TypeScript', 'React', 'Redux'],
      page: 1,
   },
};

export const vacanciesSlice = createSlice({
   name: 'vacancies',
   initialState,
   reducers: {
      setSearch: (state, action: PayloadAction<string>) => {
         state.filters.search = action.payload;
         state.filters.page = 1;
      },
      setCity: (state, action: PayloadAction<string>) => {
         state.filters.city = action.payload;
         state.filters.page = 1;
      },
      addSkill: (state, action: PayloadAction<string>) => {
         if (!state.filters.skills.includes(action.payload)) {
            state.filters.skills.push(action.payload);
         }
         state.filters.page = 1;
      },
      removeSkill: (state, action: PayloadAction<string>) => {
         state.filters.skills = state.filters.skills.filter(
            (skill) => skill !== action.payload
         );
         state.filters.page = 1;
      },
      setPage: (state, action: PayloadAction<number>) => {
         state.filters.page = action.payload;
      },
      resetFilters: (state) => {
         state.filters = initialState.filters;
      },
   },
});

export const {
   setSearch,
   setCity,
   addSkill,
   removeSkill,
   setPage,
   resetFilters
} = vacanciesSlice.actions;

export default vacanciesSlice.reducer;