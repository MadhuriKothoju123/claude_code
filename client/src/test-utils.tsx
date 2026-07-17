import type { ReactElement, ReactNode } from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import type { AuthContextValue } from './context/AuthContext'

export function makeAuthValue(overrides: Partial<AuthContextValue> = {}): AuthContextValue {
  return {
    user: null,
    loading: false,
    login: jest.fn(),
    register: jest.fn(),
    logout: jest.fn(),
    ...overrides,
  }
}

interface RenderWithAuthOptions {
  authValue?: Partial<AuthContextValue>
  route?: string
}

export function renderWithAuth(ui: ReactElement, options: RenderWithAuthOptions = {}) {
  const authValue = makeAuthValue(options.authValue)

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <MemoryRouter initialEntries={[options.route ?? '/']}>
        <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
      </MemoryRouter>
    )
  }

  return { authValue, ...render(ui, { wrapper: Wrapper }) }
}
