import TFieldTypes from '@/types/TFieldTypes'
import TRestProps from '@/types/TRestProps'
import TFieldValue from '@/types/TFieldValue'
import TFieldLabel from '@/types/TFieldLabel'
import TFieldOption from '@/types/TFieldOption'
import TFieldValidation from '@/types/TFieldValidation'

type TField = {
  label: TFieldLabel
  type: TFieldTypes
  value: TFieldValue
  required?: boolean
  options?: TFieldOption[]
  validation: TFieldValidation
  restProps?: TRestProps
}

export default TField
