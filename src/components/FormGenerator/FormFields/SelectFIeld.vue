<template>
  <label
    class="field-container"
    :class="{
      invalid: !isValid,
    }"
  >
    <div class="field-label">{{ field.label }}</div>

    <div class="select-wrapper">
      <select v-model="innerValue" class="field-select">
        <option v-for="option in field.options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>

      <div class="select-arrow">▼</div>
    </div>

    <div class="error-text" :class="{ active: !isValid }" :title="errorText">
      {{ errorText }}
    </div>
  </label>
</template>

<script setup lang="ts">
import TField from '@/types/TField'
import { computed } from 'vue'

const props = defineProps<{
  field: TField
}>()

const emit = defineEmits(['update:modelValue'])

const innerValue = computed({
  get: () => props.field.value,
  set: (val) => {
    emit('update:modelValue', { newValue: val, field: props.field })
  },
})

const isRequiredFilled = computed(() => {
  return props.field?.required && props.field.value
})

const isValid = computed(() => {
  if (props.field?.required && !props.field.value) return false

  if (props.field?.validation) {
    const result = props.field.validation(props.field.value)
    return result === true
  }

  return true
})

const errorText = computed(() => {
  const errors: string[] = []

  if (props.field?.required && !props.field.value) {
    errors.push('Обязательное поле')
  }

  if (props.field?.validation) {
    const result = props.field.validation(props.field.value)

    if (typeof result === 'string') {
      errors.push(result)
    } else if (result === false) {
      errors.push('Ошибка валидации')
    }
  }

  return errors.length > 0 ? errors.join(', ') : ''
})
</script>
