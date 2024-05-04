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
      {
        isHomePage && <HomePage></HomePage>
      }
      {
        isAboutPage && <AboutPage></AboutPage>
      }
      <button onClick={()=>setCount((owo) => owo += 1)}>plus {count} </button>
    </>
  )
}

export default App
