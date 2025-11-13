// src/flux/Dispatcher.ts
type Callback = (payload: any) => void;

class Dispatcher {
  private callbacks: Map<number, Callback> = new Map();
  private idCounter = 1;

  register(cb: Callback) {
    const id = this.idCounter++;
    this.callbacks.set(id, cb);
    return id;
  }

  unregister(id: number) {
    this.callbacks.delete(id);
  }

  dispatch(payload: any) {
    for (const cb of this.callbacks.values()) {
      cb(payload);
    }
  }
}

export default new Dispatcher();
