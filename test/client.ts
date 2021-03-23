import {Client} from '../src/Comlink'

const api = new Client({})

api.registerDialect({
  name: 'CM',
  interface: {
    namespace: '',
    method: '',
    parameters: ''
  }
})

api.registerDialect({
  name: 'pm',
  interface: {
    method: '',
    parameters: ''
  }
})

api.registerDialect({
  name: 'pm',
  interface: {
    pluginName: '',
    method: '',
    parameters: ''
  },
  router (route) {
    const routeParams = route.explode('.')
    return {
      pluginName: routeParams[0],
      method: routeParams[1]
    }
  }
})

api.registerDialect({
  name: 'harcon',
  interface: {
    division: '',
    event: '',
    parameters: ''
  },
  router (route) {
    return {
      event: route
    }
  },
  optioner (options) {
    if (options.division) {
      return {
        division: options.division
      }
    }
    return {}
  }
})

const rest = new Channel<HTTPChannel>({
  name: 'rest',
  ssl: true,
  uri: 'localhost:7777/api',
  rpc: false,
})

api.registerChannel(rest, { default: true })

api.registerHeader({
  name: 'jwtToken',
  type: 'automatic',
  storage: Storage.CookieStorage,
  key: 'x-jwt-token',
  inject: false
})

api.registerChannel({
  type: 'ws',
  name: 'socket',
  ssl: true,
  uri: 'localhost:67897',
  default: true,
  auth: true,
  authHeader: 'jwtToken',
  rpc: {
    retryInterval: 800,
    maxRetries: 10,
    dialects: ['CM', 'harcon', 'pm', 'plugin'],
    idGenerator: undefined,
    harcon: {
      idGenerator: undefined,
      division: 'Harconer'
    }
  },
  onError (err) { console.error(err) }
})

api.channel('socket').connect()














async function start () {
  type TPhone = {
    dialCode: string;
    number: string;
  }
  
  interface IUser {
    name: string;
    email: string;
    phone: TPhone
  }
  
  
  const example: any = api.request('Service.method', ['a', 123, 'b'], {}, 'service')
  
  console.log(example.kek)
  
  const user: IUser = await api.request<IUser>('User.getUser', ['thisIsAUserID'], {}, 'service')
  
  console.log(user.phone.dialCode)
}

