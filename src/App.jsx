import { useEffect, useState } from 'react'

import './App.css'

const NAVIGATE_EVENT = 'pushState'

const navigate = (path) => {
  window.history.pushState({}, '', path)

  const event = new Event(NAVIGATE_EVENT)
  window.dispatchEvent(event)
}

function HomePage() {

  return <>
    <h1>Home page</h1>
    <a onClick={() => navigate('/about')}>Ir a nosotros</a>
  </>
}

function AboutPage() {

  return <>
    <h1>About page</h1>
    <a onClick={() => navigate('/')}>Ir a la pagina principal</a>
  </>
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
      
      return () => {
        window.removeEventListener(NAVIGATE_EVENT, onLocationChange)
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
