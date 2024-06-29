import { Link } from "../Link"
export function HomePage() {
  
  return <>
    <h1>Home page</h1>
    <Link to='/about' target={'self'}>Ir a nosotros</Link>
    <br />
    <Link to='/search/OWO' target={'self'}>Ir a buscar por parametros</Link>
  </>
}