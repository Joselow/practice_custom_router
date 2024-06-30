import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { Router } from '../Router.jsx'
import { Route } from '../Route.jsx'
import { getCurrentPath } from '../utils/getCurrentPath.js'
import { Link } from '../Link.jsx'

vi.mock('../utils/getCurrentPath.js', () => ({
  getCurrentPath: vi.fn()
}))


describe('Router', () => {
  beforeEach(()=> {
    vi.clearAllMocks()
  })

  it('Render correctly', () => {
    render(<Router  />)
    expect(true).toBeTruthy()
  })

  it('Should render 404 if no routes match', () => {
    render(<Router routes={[]} defaultComponent={() => <h1>404</h1>}  />)

    expect(screen.getByText('404')).toBeTruthy()
  })

  it('Should render the component of the first route that matches', () => {
    getCurrentPath.mockReturnValue('/about')

    const routes = [
      {
        path: '/',
        component: () => <h1>Home</h1>
      },
      {
        path: '/about',
        component: () => <h1>About</h1>
      },
    ]
    render(<Router routes={routes} defaultComponent={() => <h1>404</h1>}  />)

    expect(screen.getByText('About')).toBeTruthy()
  })

  it('Should navigate using Link', async () => {
    getCurrentPath.mockReturnValue('/home')

    const routes = [
      {
        path: '/page1',
        component: () => <h1>Page 1</h1>
      },
    ]
    
    render(
    <Router routes={routes} defaultComponent={() => <h1>404</h1>}  >
      <Route path='/home' component={() => {
        return (
          <>  
            <h1>Home</h1>
            <Link to='/owo'>Search</Link>
          </>
        )
      }} >  
      </Route>

      <Route path='/owo' component={() => <h1>Search Page</h1>}/>
    </Router>)

    console.log(screen.debug());

    const anchor = screen.getByText('Search')
    fireEvent.click(anchor)

    console.log(screen.debug());
    const titlePage = await screen.findByText('Search Page')
    expect(titlePage).toBeTruthy()
  })

})