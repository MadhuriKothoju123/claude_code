import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RegisterPage from './RegisterPage'
import { renderWithAuth } from '../../test-utils'

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

beforeEach(() => {
  mockNavigate.mockClear()
})

async function fillForm(email: string, password: string, confirmPassword: string) {
  await userEvent.type(screen.getByLabelText(/^email/i), email)
  await userEvent.type(screen.getByLabelText(/^password/i), password)
  await userEvent.type(screen.getByLabelText(/^confirm password/i), confirmPassword)
  await userEvent.click(screen.getByRole('button', { name: 'Register' }))
}

describe('RegisterPage', () => {
  it('renders the registration form', () => {
    renderWithAuth(<RegisterPage />)

    expect(screen.getByRole('heading', { name: 'Register' })).toBeInTheDocument()
    expect(screen.getByLabelText(/^email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^password/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^confirm password/i)).toBeInTheDocument()
  })

  it('rejects mismatched passwords without calling register', async () => {
    const register = jest.fn()
    renderWithAuth(<RegisterPage />, { authValue: { register } })

    await fillForm('user@example.com', 'password123', 'password456')

    expect(await screen.findByText('Passwords do not match')).toBeInTheDocument()
    expect(register).not.toHaveBeenCalled()
  })

  it('rejects short passwords without calling register', async () => {
    const register = jest.fn()
    renderWithAuth(<RegisterPage />, { authValue: { register } })

    await fillForm('user@example.com', 'short', 'short')

    expect(
      await screen.findByText('Password must be at least 8 characters'),
    ).toBeInTheDocument()
    expect(register).not.toHaveBeenCalled()
  })

  it('registers and navigates to the dashboard on success', async () => {
    const register = jest.fn().mockResolvedValue(undefined)
    renderWithAuth(<RegisterPage />, { authValue: { register } })

    await fillForm('user@example.com', 'password123', 'password123')

    await waitFor(() =>
      expect(register).toHaveBeenCalledWith('user@example.com', 'password123'),
    )
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard')
  })
})
