import { describe, test, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import vacanciesReducer from '../../store/vacanciesSlice'
import { SearchBar } from './SearchBar'

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

describe('SearchBar', () => {
   test('отображает поле ввода и кнопку', () => {
      renderWithProviders(<SearchBar />)

      // Проверяем наличие элементов
      expect(screen.getByPlaceholderText('Должность или название компании')).toBeInTheDocument()
      expect(screen.getByText('Найти')).toBeInTheDocument()
   })

   test('обновляет текст в поле ввода', () => {
      renderWithProviders(<SearchBar />)

      const input = screen.getByPlaceholderText('Должность или название компании') as HTMLInputElement

      // Вводим текст
      fireEvent.change(input, { target: { value: 'React разработчик' } })

      // Проверяем, что текст обновился
      expect(input.value).toBe('React разработчик')
   })
})