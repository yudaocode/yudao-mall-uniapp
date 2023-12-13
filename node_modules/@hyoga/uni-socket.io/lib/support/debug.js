module.exports = function(env) {
  return function() {
    const arr = [env]
    for (let index = 0; index < arguments.length; index++) {
      arr[index + 1] = arguments[index]
    }
    console.log.apply(this, arr)
  }
}