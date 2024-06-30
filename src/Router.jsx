import { match} from 'path-to-regexp'

import { useEffect, useState, Children } from 'react'
import { NAVIGATE_EVENT } from './helpers/navigate'
import { getCurrentPath } from './utils/getCurrentPath'


export function Router ({ children, routes = [], defaultComponent: DefaultComponent = () => <h1>Not found</h1> } = {}) {
  const childrenArray = Children.toArray(children)
  const routesFromChildren = Children.map(childrenArray, ({ type, props }) => {
    if (type.name === 'Route') {
      return props
    }    
  }) 

  const allRoutes = [...routesFromChildren, ...routes]

  const [urlPath, sertUrlPath] = useState(getCurrentPath())

  useEffect(()=>{
      const onLocationChange = async() => {
        sertUrlPath(getCurrentPath())
      }

      window.addEventListener(NAVIGATE_EVENT, onLocationChange)
      window.addEventListener('popstate', onLocationChange)
      
      return () => {
        window.removeEventListener(NAVIGATE_EVENT, onLocationChange)
        window.removeEventListener('popstate', onLocationChange)
      }
  },[])
  
  let params;
  
  const PageToRender = allRoutes.find(({ path }) => {    
    const matcher =  match(path)
    const result = matcher(urlPath) 

    if (result) {
      params = result.params
      return true
    }
  })?.component

  // console.log(routes[0]?.component,  routes[0]?.path, 'aaaaa');

  return PageToRender ? <PageToRender routeParams={params}/> : <DefaultComponent routeParams={params}/>
}
