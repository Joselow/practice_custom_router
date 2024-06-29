import { Link } from "../Link"

export function AboutPage({ routeParams }) {
  console.log(routeParams);

  return <>
    <h1>About page</h1>
    <Link to='/' >Ir a la pagina principal</Link>
  </>
}