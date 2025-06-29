import TFieldTypes from '@/types/TFieldTypes'

const getFieldComponentName = (name: TFieldTypes) => {
  return `${name}Field`
}

export default getFieldComponentName
