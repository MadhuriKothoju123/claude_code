import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DashboardPage from './DashboardPage'
import { renderWithAuth } from '../../test-utils'

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

beforeEach(() => {
  mockNavigate.mockClear()
})

describe('DashboardPage', () => {
  it("renders the signed-in user's email", () => {
    renderWithAuth(<DashboardPage />, {
      authValue: {
        user: { id: '1', email: 'user@example.com', createdAt: '2026-01-01T00:00:00.000Z' },
      },
    })

    expect(screen.getByText('user@example.com')).toBeInTheDocument()
  })

  it('logs out and navigates to /login when the logout button is clicked', async () => {
    const logout = jest.fn().mockResolvedValue(undefined)
    renderWithAuth(<DashboardPage />, {
      authValue: {
        user: { id: '1', email: 'user@example.com', createdAt: '2026-01-01T00:00:00.000Z' },
        logout,
      },
    })

    await userEvent.click(screen.getByRole('button', { name: 'Log out' }))

    await waitFor(() => expect(logout).toHaveBeenCalled())
    expect(mockNavigate).toHaveBeenCalledWith('/login')
  })
})
