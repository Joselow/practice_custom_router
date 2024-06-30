import { lazy, Suspense } from 'react'

import { Router } from './Router'
import { Route } from './Route'

import { HomePage } from './pages/HomePage'

const AboutPage = lazy(() => import('./pages/AboutPage').then(module => {
  return { default: module.AboutPage }
}));
const SearchPage = lazy(() => import('./pages/SearchPage'));


import './App.css'

const router = [
  { path: '/', component: HomePage}, 

]

function App() {
  return (
    <>    
    <Suspense>
      <Router routes={router}>
        <Route path='/about' component={AboutPage} />
        <Route path='/search/:customParam' component={SearchPage}/>
      </Router>
    </Suspense>
    </>
  )
}

export default App
