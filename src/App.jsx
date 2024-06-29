import { Router } from './Router'
import { Route } from './Route'

import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { SearchPage } from './pages/SearchPage'

import './App.css'

const router = [
  { path: '/', component: HomePage}, 

]

function App() {
  return (
    <>
      <Router routes={router}>
        <Route path='/about' component={AboutPage} />
        <Route path='/search/:customParam' component={SearchPage}/>
      </Router>
    </>
  )
}

export default App
