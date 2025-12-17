// src/test/setup.ts
import '@testing-library/jest-dom';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// 1. ПРАВИЛЬНЫЙ мок для ResizeObserver
const ResizeObserverMock = vi.fn(() => ({
   observe: vi.fn(),
   unobserve: vi.fn(),
   disconnect: vi.fn(),
}));

// Используйте vi.stubGlobal для установки мока
vi.stubGlobal('ResizeObserver', ResizeObserverMock);

// 2. Мок для window.matchMedia (у вас уже есть, убедитесь, что он ниже)
Object.defineProperty(window, 'matchMedia', {
   writable: true,
   value: vi.fn().mockImplementation((query) => ({
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

// Очистка после каждого теста
afterEach(() => {
   cleanup();
   vi.clearAllMocks();
});