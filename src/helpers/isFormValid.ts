import TField from '@/types/TField'

export default (fields: TField[]) => {
  return fields.every((field) => {
    if (field.required && !field.value) return false
    if (field.validation) {
      const result = field.validation(field.value)
      if (typeof result === 'string') return false
      if (result === false) return false
    }
    return true
  })
}
