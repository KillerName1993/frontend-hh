import { describe, test, expect, vi } from 'vitest' // убедитесь, что vi импортирован
import { render, screen } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import vacanciesReducer from '../../store/vacanciesSlice'
import { Filters } from './Filters'

// === ВАЖНО: Правильный мок для ResizeObserver ===
// Используем window вместо global
class ResizeObserverMock {
   observe = vi.fn();
   unobserve = vi.fn();
   disconnect = vi.fn();
}

// Для TypeScript и jsdom
window.ResizeObserver = ResizeObserverMock as any;

// Также мок для matchMedia
Object.defineProperty(window, 'matchMedia', {
   writable: true,
   value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
   })),
});

// Создаём тестовый store
const createTestStore = () => {
   return configureStore({
      reducer: {
         vacancies: vacanciesReducer,
      },
   })
}

// Обёртка для компонентов с Mantine и Redux
const renderWithProviders = (component: React.ReactNode, store = createTestStore()) => {
   return render(
      <Provider store={store}>
         <MantineProvider>
            {component}
         </MantineProvider>
      </Provider>
   )
}

describe('Filters', () => {
   test('отображает начальные навыки TypeScript, React, Redux', () => {
      renderWithProviders(<Filters />)

      // Проверяем начальные навыки из задания
      expect(screen.getByText('TypeScript')).toBeInTheDocument()
      expect(screen.getByText('React')).toBeInTheDocument()
      expect(screen.getByText('Redux')).toBeInTheDocument()
   })

   test('отображает заголовок "Ключевые навыки"', () => {
      renderWithProviders(<Filters />)

      expect(screen.getByText('Ключевые навыки')).toBeInTheDocument()
   })

   test('отображает поле для ввода нового навыка', () => {
      renderWithProviders(<Filters />)

      // Проверяем поле ввода и кнопку добавления
      expect(screen.getByPlaceholderText('Навык')).toBeInTheDocument()
      expect(screen.getByRole('button')).toBeInTheDocument() // Кнопка "+"
   })

   test('отображает селект для выбора города', () => {
      renderWithProviders(<Filters />)

      // Проверяем наличие селекта городов по placeholder
      expect(screen.getByPlaceholderText('Все города')).toBeInTheDocument()
   })
})