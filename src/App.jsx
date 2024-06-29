import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { Router } from './Router'
import { Route } from './Route'

import './App.css'

const router = [
  { path: '/', component: HomePage}, 

]

function App() {
  return (
    <>
      <Router routes={router}>
        <Route path='/about' component={AboutPage} />
        <Route path='/search/:owo' component={AboutPage}/>
      </Router>
    </>
  )
}

export default App
