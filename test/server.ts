
import {Server} from '../src/Comlink'

const api = new Server(console)

const serviceDialect = new Dialect({
  name: 'service',
  interface: {
    division: '',
    entity: '',
    method: '',
    data: ''
  },
  async onRequest (msg) {
    const type = msg._type
    return undefined
  }
})

api.registerDialect(serviceDialect)

const tunnelChannel = new Channel<WebsocketChannel>(ws)
tunnelChannel.addDialect(serviceDialect)

api.registerChannel({
  type: 'ws',
  name: 'tunnel',
  auth: true,
  tokenValidator (token) {
    return token[token] && token[token].expiry < Date.now()
  }
})

api.applyChannel('tunnel')
