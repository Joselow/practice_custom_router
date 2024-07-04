import { navigate } from "./helpers/navigate"

const MAIN_BUTTON_CLICK = 0

export function Link({children, target, to, ...props }){
  console.log('Using');

  const handleClick = (e) => {
    const isMainEvent = e.button === MAIN_BUTTON_CLICK
    const isModifiedEvent = e.metKey || e.altKey ||  e.ctrlKey || e.shiftKey
    const isDefaultRouterEvent = target === 'self' || target === undefined
    console.log(to, 'li clickeado');
    if (isMainEvent && isDefaultRouterEvent && !isModifiedEvent) {
      navigate(to)
      e.preventDefault()
    }
  }

  return <>
    <a onClick={handleClick} href={to}  target={target}  { ...props}>{children}</a>
  </>
}