export default [
  {
    label: 'логин',
    type: 'input',
    value: '',
    required: true,
    validation: (val: string) => {
      if (!val || val.length <= 3) return 'Логин должен содержать более 3 символов'
      if (val.length >= 255) return 'Логин не должен быть больше 255 символов'
      return true
    },
  },
  {
    label: 'email',
    type: 'input',
    value: '',
    required: true,
    validation: (val: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(val)) return 'Введите корректный email'

      return true
    },
  },
  {
    label: 'пароль',
    type: 'input',
    value: '',
    required: true,
    validation: (val: string) => {
      if (!val || val.length <= 6) return 'Пароль должен содержать более 6 символов'
      return true
    },
  },
  {
    label: 'роль',
    type: 'select',
    value: '',
    required: true,
    options: [
      { label: 'админ', value: 'admin' },
      { label: 'пользователь', value: 'user' },
    ],
  },
]
