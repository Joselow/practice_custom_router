import { useEffect, useState } from 'react'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'

import './App.css'

const NAVIGATE_EVENT = 'pushState'

export const navigate = (path) => {
  window.history.pushState({}, '', path)

  const event = new Event(NAVIGATE_EVENT)
  window.dispatchEvent(event)
}

function Router ({ routes = [], defaultComponent: DefaultComponent = () => <h1>Not found</h1> } = {}) {
  const [urlPath, sertUrlPath] = useState(window.location.pathname)

  useEffect(()=>{
      const onLocationChange = async() => {
        sertUrlPath(window.location.pathname)
      }
      window.addEventListener(NAVIGATE_EVENT, onLocationChange)
      window.addEventListener('popstate', onLocationChange)
      
      return () => {
        window.removeEventListener(NAVIGATE_EVENT, onLocationChange)
        window.removeEventListener('popstate', onLocationChange)
      }
  },[])

  const PageToRender = routes.find((el) => el.path === urlPath)?.component
  return PageToRender ? <PageToRender/> : <DefaultComponent/>
}

function App() {
  const [urlPath, sertUrlPath] = useState(window.location.pathname)
  const [count, setCount] = useState(0)

  const isHomePage = urlPath === '/'
  const isAboutPage = urlPath === '/about'

  useEffect(()=>{
      const onLocationChange = async() => {
        sertUrlPath(window.location.pathname)
      }
      window.addEventListener(NAVIGATE_EVENT, onLocationChange)
      window.addEventListener('popstate', onLocationChange)
      
      return () => {
        window.removeEventListener(NAVIGATE_EVENT, onLocationChange)
        window.removeEventListener('popstate', onLocationChange)
      }
  },[])

  return (
    <>
    aaa{  true && true }
    <Router routes={[ { path: '/', component: HomePage}, { path:'/about', component: AboutPage }]}/>
      <button onClick={()=>setCount((owo) => owo += 1)}>plus {count} </button>
    </>
  )
}

export default App
