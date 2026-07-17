import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginPage from './LoginPage'
import { renderWithAuth } from '../../test-utils'

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

beforeEach(() => {
  mockNavigate.mockClear()
})

describe('LoginPage', () => {
  it('renders the login form', () => {
    renderWithAuth(<LoginPage />)

    expect(screen.getByRole('heading', { name: 'Log in' })).toBeInTheDocument()
    expect(screen.getByLabelText(/^email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Log in' })).toBeInTheDocument()
  })

  it('logs in and navigates to the dashboard on success', async () => {
    const login = jest.fn().mockResolvedValue(undefined)
    renderWithAuth(<LoginPage />, { authValue: { login } })

    await userEvent.type(screen.getByLabelText(/^email/i), 'user@example.com')
    await userEvent.type(screen.getByLabelText(/^password/i), 'password123')
    await userEvent.click(screen.getByRole('button', { name: 'Log in' }))

    await waitFor(() => expect(login).toHaveBeenCalledWith('user@example.com', 'password123'))
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard')
  })

  it('shows an error message when login fails', async () => {
    const login = jest.fn().mockRejectedValue(new Error('Invalid email or password'))
    renderWithAuth(<LoginPage />, { authValue: { login } })

    await userEvent.type(screen.getByLabelText(/^email/i), 'user@example.com')
    await userEvent.type(screen.getByLabelText(/^password/i), 'wrongpassword')
    await userEvent.click(screen.getByRole('button', { name: 'Log in' }))

    expect(await screen.findByText('Invalid email or password')).toBeInTheDocument()
    expect(mockNavigate).not.toHaveBeenCalled()
  })
})
