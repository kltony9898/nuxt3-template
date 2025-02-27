<script setup lang="ts">
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
const { checkboxRule, fieldRequiredRule, passwordRule, fileRequiredRule } = useValidateRules()

const schema = z.object({
  checkbox: checkboxRule,
  password: passwordRule,
  confirmPassword: z.string().refine(
    val => val === password.value,
    { message: '密碼不一致' }
  ),
  radio: fieldRequiredRule,
  date: fieldRequiredRule,
  gender: fieldRequiredRule,
  file: fileRequiredRule,
  dropdown: fieldRequiredRule,
  dateInput: fieldRequiredRule,
  username: z.string().min(1, { message: '不能為空' })
})
const validationSchema = toTypedSchema(schema)

const { handleSubmit } = useForm({
  validationSchema,
  validateOnMount: false
})

const { value: checkbox, errorMessage: checkboxError } = useField<(string | number)[]>('checkbox')
const { value: radio, errorMessage: radioError } = useField<(string | number)>('radio')
const { value: dropdown, errorMessage: dropdownError } = useField<(string | number)>('dropdown')
const { value: password, errorMessage: passwordError } = useField<string>('password')
const { value: username, errorMessage: usernameError } = useField<string | number>('username')
const { value: confirmPassword, errorMessage: confirmPasswordError, validate: validateConfirmPassword } = useField<string>('confirmPassword')

const { value: fileValue, errorMessage: fileError } = useField<File>('file')
const { value: dateInputValue, errorMessage: dateInputError } = useField<string>('dateInput')

watch([password, confirmPassword], async () => {
  await validateConfirmPassword()
})

const onSubmit = handleSubmit(
  (values) => {
    console.log('成功提交: ', values)
  },
  (error) => {
    console.log('失敗提交: ', error)
  }
)

const checkboxData = {
  groupName: 'checkbox',
  items: [
    {
      name: '一',
      value: '1'
    },
    {
      name: '二',
      value: '2'
    }
  ]
}

const radioData = {
  groupName: 'radio',
  items: [
    {
      name: '一',
      value: '1'
    },
    {
      name: '二',
      value: '2'
    }
  ]
}

const dropdownOptions = [
  {
    name: '男',
    value: 'male'
  },
  {
    name: '女',
    value: 'female'
  },
  {
    name: '其他',
    value: 'others'
  }
]
</script>
<template>
  <div>
    <div class="flex items-center gap-2">
      <label class="w-[100px]">username</label>
      <BaseTextInput
        v-model="username"
        name="username"
      />
      <span
        v-if="usernameError"
        class="text-sm text-red-500"
      >{{ usernameError }}</span>
    </div>
    <div class="flex items-center gap-2">
      <label class="w-[100px]">多選</label>
      <BaseCheckbox
        v-model="checkbox"
        :options="checkboxData.items"
        :name="checkboxData.groupName"
      />
      <span v-if="checkboxError">{{ checkboxError }}</span>
    </div>
    <div class="flex items-center gap-2">
      <label class="w-[100px]">單選</label>
      <BaseRadio
        v-model="radio"
        :options="radioData.items"
        :name="radioData.groupName"
      />
      <span
        v-if="radioError"
        class="text-sm text-red-500"
      >{{ radioError }}</span>
    </div>

    <div class="gap-2">
      <div class="flex items-center">
        <label class="w-[100px]">下拉選單</label>
        <BaseDropdown
          v-model="dropdown"
          name="gender"
          :options="dropdownOptions"
          placeholder="選擇選手的性別"
        />
      </div>
    </div>
    <span>{{ dropdownError ?? '' }}</span>

    <div class="flex items-center gap-2">
      <label class="w-[100px]">密碼</label>
      <BasePassword
        v-model="password"
        name="password"
        placeholder="請輸入密碼"
        toggle-mask
      />
    </div>
    <span>{{ passwordError ?? '' }}</span>

    <div class="flex items-center gap-2">
      <label class="w-[100px]">確認密碼</label>
      <BasePassword
        v-model="confirmPassword"
        name="confirmPassword"
        placeholder="請輸入確認密碼"
      />
    </div>
    <span>{{ confirmPasswordError ?? '' }}</span>

    <div class="flex items-center gap-2 pt-20">
      <label class="w-[100px]">上傳檔案</label>
      <BaseFileInput
        v-model="fileValue"
        type="image"
        name="file"
        placeholder="請上傳檔案"
      />
    </div>
    <span>{{ fileError ?? '' }}</span>

    <div class="flex items-center gap-2">
      <label class="w-[100px]">選擇日期</label>
      <BaseDateInput
        v-model="dateInputValue"
        name="date"
        placeholder="請選擇日期"
      />
    </div>
    <span>{{ dateInputError ?? '' }}</span>

    <button
      class="w-full justify-center"
      @click="onSubmit"
    >
      送出
    </button>
  </div>
</template>
