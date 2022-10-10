import { SelectOption } from './SelectOption'

export type MultiSelectProps = {
  muliple: true
  value: SelectOption[]
  onChange: (value: SelectOption[] | undefined) => void
}

export type SingleSelectProps = {
  muliple?: false
  value: SelectOption | undefined
  onChange: (value: SelectOption | undefined) => void
}

export type SelectProps = {
  options: SelectOption[]
} & (SingleSelectProps | MultiSelectProps)