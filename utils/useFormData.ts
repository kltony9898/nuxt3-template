export default <T extends Record<string, unknown>>(data: T): FormData => {
  const formData = new FormData()

  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(item => formData.append(`${key}[]`, item))
    } else {
      formData.append(key, value as string)
    }
  })

  return formData
}
