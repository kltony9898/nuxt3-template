import { z } from 'zod'
import { defineRule } from 'vee-validate'

defineRule('confirmed', (value: string, [target]: string[]) => {
  return value === target ? true : '密碼不一致'
})

defineRule('required', (value: string) => {
  if (!value || !value.length) {
    return '此字段為必填項'
  }
  return true
})

defineRule('theEmail', (value: string) => {
  // 字段為空，應該通過
  if (!value || !value.length) {
    return '必填'
  }
  // 檢查是否為電子郵件
  if (!/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/.test(value)) {
    return '此字段必須是有效的電子郵件'
  }
  return true
})

defineRule('minMax', (value: string, [min, max]: [number, number]) => {
  // 字段為空，因此應該通過
  if (!value || !value.length) {
    return true
  }
  if (value.length < min) {
    return `此字段必須大於${min}`
  }
  if (value.length > max) {
    return `此字段必須小於${max}`
  }
  return true
})

export const useValidateRules = () => {
  return {
    confirmPasswordRule: 'confirmed:@password',
    checkboxRule: z.array(z.string().min(1)).min(1, '最少一項').max(1, '最多一項'),
    fieldRequiredRule: z.string().min(1, '此欄位必填'),
    passwordRule: z.string().min(1, '此欄位必填').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\S]{8,}$/, '密碼格式錯誤'),
    union: z.union([z.string(), z.number()]),
    multipleOf: z.number().multipleOf(5, { message: '值必須是5的倍數' }),
    finite: z.number().finite({ message: '值必須是有限數' }),
    safeNumber: z.number().safe(),
    fileRequiredRule: z.instanceof(File)
  }
}
