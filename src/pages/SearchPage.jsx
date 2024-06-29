export function SearchPage ({routeParams}) {

  return <>
  <h1>Parametros:</h1>
    { JSON.stringify(routeParams) }
  </>
}