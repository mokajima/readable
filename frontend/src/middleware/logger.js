const logger = (store) => (next) => (action) => {

  /* eslint-disable indent, no-console */
  console.group(action.type)
    console.log('The action: ', action)
    const returnValue = next(action)
    console.log('The new state: ', store.getState())
  console.groupEnd()
  /* eslint-enable indent, no-console */

  return returnValue
}

export default logger
