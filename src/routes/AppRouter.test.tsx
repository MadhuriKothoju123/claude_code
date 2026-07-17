import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AppRouter from './AppRouter'

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppRouter />
    </MemoryRouter>,
  )
}

describe('AppRouter', () => {
  it('renders HomePage at /', () => {
    renderAt('/')

    expect(screen.getByRole('heading', { name: 'my-app' })).toBeInTheDocument()
  })

  it('redirects unknown paths to /', () => {
    renderAt('/does-not-exist')

    expect(screen.getByRole('heading', { name: 'my-app' })).toBeInTheDocument()
  })
})
