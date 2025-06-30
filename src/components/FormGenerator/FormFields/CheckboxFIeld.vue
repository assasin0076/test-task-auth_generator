<template>
  <label
    class="field-container"
    :class="{
      invalid: !isValid,
    }"
    :for="id"
  >
    <div class="checkbox-wrapper">
      <input
        type="checkbox"
        :id="id"
        :checked="innerValue"
        @change="($event) => handleChange($event)"
        class="field-checkbox"
      />
      <div class="checkbox-custom">
        <div v-if="innerValue" class="checkbox-check">✔</div>
      </div>
      <span class="checkbox-label">{{ field.label }}</span>
    </div>

    <div class="error-text" :class="{ active: !isValid }" :title="errorText">
      {{ errorText }}
    </div>
  </label>
</template>

<script setup lang="ts">
import TField from '@/types/TField'
import { computed, ref } from 'vue'

const props = defineProps<{
  field: TField
}>()

const emit = defineEmits(['update:modelValue'])

const id = ref(`checkbox-${Math.random().toString(36).substr(2, 9)}`)

const innerValue = computed({
  get: () => props.field.value,
  set: (val) => {
    emit('update:modelValue', { newValue: val, field: props.field })
  },
})

const isRequiredFilled = computed(() => {
  return props.field?.required && props.field.value === true
})

const isValid = computed(() => {
  if (props.field?.required && props.field.value !== true) return false

  if (props.field?.validation) {
    const result = props.field.validation(props.field.value)
    return result === true
  }

  return true
})

const errorText = computed(() => {
  const errors: string[] = []

  if (props.field?.required && props.field.value !== true) {
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

function handleChange(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', { newValue: target.checked, field: props.field })
}
</script>
