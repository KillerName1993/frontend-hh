import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import vacanciesReducer from '../../store/vacanciesSlice'
import { Pagination } from './Pagination'

// Простые моки
class ResizeObserverMock {
   observe = () => { };
   unobserve = () => { };
   disconnect = () => { };
}

window.ResizeObserver = ResizeObserverMock as any;

const createTestStore = () => {
   return configureStore({
      reducer: {
         vacancies: vacanciesReducer,
      },
   });
};

const renderWithProviders = (component: React.ReactNode) => {
   return render(
      <Provider store={createTestStore()}>
         <MantineProvider>
            {component}
         </MantineProvider>
      </Provider>
   );
};

describe('Pagination', () => {
   test('отображает правильное количество страниц', () => {
      renderWithProviders(<Pagination currentPage={1} totalPages={5} />);

      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.queryByText('6')).not.toBeInTheDocument();
   });

   test('подсвечивает текущую страницу', () => {
      renderWithProviders(<Pagination currentPage={3} totalPages={5} />);

      const currentPageButton = screen.getByText('3');
      expect(currentPageButton.closest('button')).toHaveAttribute('data-active');
   });

   test('отображает кнопки навигации', () => {
      renderWithProviders(<Pagination currentPage={1} totalPages={5} />);

      // Проверяем, что есть кнопки (Pagination должен содержать минимум 1 кнопку)
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
   });
});