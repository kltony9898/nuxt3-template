type Example = {
  name: string,
  number: number
}

type Response = {
  success: boolean
  data: {
    method: 'get' | 'post' | 'put' | 'delete'
    body?: Record<string, unknown>
    query?: Record<string, unknown>
  }
}

const readExample = (id: string, type: 'default') => useHttp().get('/example/:id', {
  params: {
    id
  },
  query: {
    type
  }
}) as Promise<Response>

const createExample = (id: string, data: Example) => useHttp().post('/example/:id', {
  params: {
    id
  },
  body: data
}) as Promise<Response>

const updateExample = (id: string, data: Partial<Example>) => useHttp().put('/example/:id', {
  params: {
    id
  },
  body: data
}) as Promise<Response>

const deleteExample = (id: string) => useHttp().delete('/example/:id', {
  params: {
    id
  }
}) as Promise<Response>

export default {
  readExample, createExample, updateExample, deleteExample
}
