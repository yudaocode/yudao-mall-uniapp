const EventEmitter = require('events')
const EventTarget = require('./event-target')
const debug = require('debug')('@hyoga/uni-socket:')

const readyStates = ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED']

const nameSpace = uni || wx;

class WeappWebSocket extends EventEmitter {
  constructor(address, protocols, options) {
    super()
    this.readyState = WeappWebSocket.CONNECTING
    this.protocol = ''

    // this._binaryType = constants.BINARY_TYPES[0];
    // this._closeFrameReceived = false;
    // this._closeFrameSent = false;
    // this._closeMessage = '';
    // this._closeTimer = null;
    // this._closeCode = 1006;

    this._socket = null

    if (address !== null) {
      if (Array.isArray(protocols)) {
        protocols = protocols.join(', ')
      } else if (typeof protocols === 'object' && protocols !== null) {
        options = protocols
        protocols = undefined
      }

      initAsClient.call(this, address, protocols, options)
    }
  }

  get CONNECTING() {
    return WeappWebSocket.CONNECTING
  }
  get CLOSING() {
    return WeappWebSocket.CLOSING
  }
  get CLOSED() {
    return WeappWebSocket.CLOSED
  }
  get OPEN() {
    return WeappWebSocket.OPEN
  }

  addSocketEventListeners() {
    this._socket.onOpen(() => {
      this.readyState = WeappWebSocket.OPEN
      this.onopen()
    })

    this._socket.onClose(res => {
      debug('onclose: ', res)
      this.readyState = WeappWebSocket.CLOSED
      this.onclose(res.code, res.reason)
    })

    this._socket.onError(res => {
      debug('onerror: ', res)
      this.onerror(res)
    })

    this._socket.onMessage(data => {
      this.onmessage(data)
    })
  }

  send(data) {
    debug('send data: ', data, this.readyState)
    if (this.readyState === WeappWebSocket.OPEN) {
      this._socket.send({ data: data })
    }
  }

  close(code, reason) {
    debug('close socket: ', code, reason)
    this.readyState = WeappWebSocket.CLOSING
    this._socket.close({
      code: code,
      reason: reason,
    })
  }
}

/**
 *
 * @param {String} address
 * @param {String} protocols
 * @param {Object} options
 */
function initAsClient(address, protocols, options) {
  Object.assign(options, {
    url: address,
    header: {
      'content-type': 'application/json',
    },
    protocols,
    method: 'GET',
  })
  this._socket = createConnection(options)

  // Add events
  this.addSocketEventListeners()
}

function createConnection(options) {
  const socketTask = nameSpace.connectSocket({
    complete: ()=> {},
    ...options,
  });

  if (socketTask) {
    return socketTask
  }

  return {
    onClose: nameSpace.onSocketClose,
    onOpen: nameSpace.onSocketOpen,
    onError: nameSpace.onSocketError,
    onMessage: nameSpace.onSocketMessage,
    send: nameSpace.sendSocketMessage,
    close: nameSpace.closeSocket,
  }
}

readyStates.forEach((readyState, i) => {
  WeappWebSocket[readyStates[i]] = i
})

const eventArr = ['open', 'error', 'close', 'message']
eventArr.forEach(method => {
  Object.defineProperty(WeappWebSocket.prototype, `on${method}`, {
    /**
     * Return the listener of the event.
     *
     * @return {(Function|undefined)} The event listener or `undefined`
     * @public
     */
    get() {
      const listeners = this.listeners(method)
      for (var i = 0; i < listeners.length; i++) {
        if (listeners[i]._listener) return listeners[i]._listener
      }
    },
    /**
     * Add a listener for the event.
     *
     * @param {Function} listener The listener to add
     * @public
     */
    set(listener) {
      const listeners = this.listeners(method)
      for (var i = 0; i < listeners.length; i++) {
        //
        // Remove only the listeners added via `addEventListener`.
        //
        if (listeners[i]._listener) this.removeListener(method, listeners[i])
      }
      this.addEventListener(method, listener)
    },
  })
})

WeappWebSocket.prototype.addEventListener = EventTarget.addEventListener
WeappWebSocket.prototype.removeEventListener = EventTarget.removeEventListener

module.exports = WeappWebSocket
