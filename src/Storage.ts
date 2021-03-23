import Cookies, { CookieAttributes, CookiesStatic } from 'js-cookie'

export interface IStorage {
  getItem(key: string): string | undefined
  setItem(key: string, value: string, options?:any): string | undefined
  removeItem(key: string, options?:any): void
  clear(): void
}

export class CookieStorage implements IStorage {
  _cookie: CookiesStatic
  constructor () {
    this._cookie = Cookies
  }
  getItem (key: string): string | undefined {
    return this._cookie.get(key)
  }
  setItem (key: string, value: string, options?: CookieAttributes): string | undefined {
    return this._cookie.set(key, value, options)
  }
  removeItem (key: string, options?: CookieAttributes): void {
    return this._cookie.remove(key, options)
  }
  clear (): void {}
}

export class NodeStorage implements IStorage {
  _store: Map<string, string>
  constructor () {
    this._store = new Map<string, string>()
  }
  getItem (key: string): string | undefined {
    return this._store.get(key)
  }
  
  setItem (key: string, value: string, options?: any): string | undefined {
    this._store.set(key, value)
    return value
  }
  
  removeItem (key: string, options?: any): void {
    this._store.delete(key)
  }
  
  clear (): void {
    this._store.clear()
  }
}
