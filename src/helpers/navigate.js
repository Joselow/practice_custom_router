export const NAVIGATE_EVENT = 'pushState'

export const navigate = (path) => {
  window.history.pushState({}, '', path)
  
  const event = new Event(NAVIGATE_EVENT)
  window.dispatchEvent(event)
}