type Callback<T> = (payload?: T) => void

export class EventEmitter<TEvents extends Record<string, any>> {
  private listeners: {
    [K in keyof TEvents]?: Callback<TEvents[K]>[]
  } = {}

  on<K extends keyof TEvents>(event: K, callback: Callback<TEvents[K]>) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event]!.push(callback)
  }

  off<K extends keyof TEvents>(event: K, callback: Callback<TEvents[K]>) {
    if (!this.listeners[event]) return
    this.listeners[event] = this.listeners[event]!.filter(
      (cb) => cb !== callback
    )
  }

  emit<K extends keyof TEvents>(event: K, payload?: TEvents[K]) {
    this.listeners[event]?.forEach((callback) => callback(payload))
  }
}
