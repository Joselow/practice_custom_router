import { describe, it, expect, vi, beforeEach } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { Router } from '../Router.jsx'
import { Route } from '../Route.jsx'
import { getCurrentPath } from '../utils/getCurrentPath.js'
import { Link } from '../Link.jsx'

vi.mock('../utils/getCurrentPath.js', () => ({
  getCurrentPath: vi.fn()
}))


describe('Router', () => {
  beforeEach(()=> {
    console.log('NETA');

    cleanup()    
    vi.clearAllMocks()    
  })

  it('Render correctly', () => {
    render(<Router  />)
    expect(true).toBeTruthy()
  })

  it('Render 404 if no routes match', () => {
    render(<Router routes={[]} defaultComponent={() => <h1>404</h1>}  />)

    expect(screen.getByText('404')).toBeTruthy()
  })

  it('Render the component of the first route that matches', () => {
    getCurrentPath.mockReturnValue('/about2')

    const routes = [
      {
        path: '/',
        component: () => <h1>Home</h1>
      },
      {
        path: '/about2',
        component: () => <h1>About</h1>
      },
    ]
    render(<Router routes={routes} defaultComponent={() => <h1>404</h1>}  />)

    expect(screen.getByText('About')).toBeTruthy()
  })

  it('Navigate using Link', async () => {
    getCurrentPath.mockReturnValueOnce('/')

    const routes = [
      {
        path: '/thePage',
        component: () => <h1>Page 1</h1>
      },
    ]
    
    render(
    <Router routes={routes} defaultComponent={() => <h1>404</h1>}  >
      <Route path='/' component={() => {
        return (
          <>  
            <h1>Home</h1>
            <Link to='/about1'>Go to About</Link>
          </>
        )
      }} >  
      </Route>

      <Route path='/about1' component={() => <h1>oooo</h1>} />
      </Router>
      )

    console.log(screen.debug());

    const anchor = screen.getByText('Go to About')
    fireEvent.click(anchor)    


    console.log(screen.debug());
    const titlePage = await screen.findByText('oooo')
    expect(titlePage).toBeTruthy()
  })

})

//Midu el ultimo test no sirve si pruebas con otra ruta que no sea '/about' el  router no es capaz de encontrar el currentPath, solo te logró funcionar porque en el test anterior usaste el  getCurrentPath.mockReturnValue('/about'). 