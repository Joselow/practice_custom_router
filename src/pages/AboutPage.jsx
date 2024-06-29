import { Link } from "../Link"

export function AboutPage({ routeParams }) {
  return <>
  params: 
  {JSON.stringify(routeParams)}
    <h1>About page</h1>
    <Link to='/' >Ir a la pagina principal</Link>
  </>
}