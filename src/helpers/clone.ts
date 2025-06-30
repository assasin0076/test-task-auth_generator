function clone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj

  if (Array.isArray(obj)) {
    const arrCopy = [] as any[]
    for (let i = 0; i < obj.length; i++) {
      arrCopy[i] = clone(obj[i])
    }
    return arrCopy as unknown as T
  }

  const objCopy = {} as Record<string, any>
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key]

      if (typeof value === 'function') {
        objCopy[key] = value
      } else {
        objCopy[key] = clone(value)
      }
    }
  }

  return objCopy as T
}

export default clone
