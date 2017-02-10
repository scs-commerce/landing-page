const scrolledToBottom = () =>
  (window.innerHeight + window.scrollY) >= document.body.offsetHeight

// a list specific pull handler
export default (list) => {
  let scrollPostion = 0

  const handler = function handler () {
    let promise = Promise.resolve(true)

    if (scrolledToBottom() && scrollPostion !== window.scrollY) {
      scrollPostion = window.scrollY
      promise = list.fetch()
    }

    promise
      .then(() => setTimeout(handler, 300))
      .catch(e => console.log(e))
  }

  return handler
}
