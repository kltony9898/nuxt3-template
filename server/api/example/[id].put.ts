import type { H3Event, EventHandlerRequest } from 'h3'

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
  const body = await readBody(event)

  return {
    success: true,
    data: {
      method: 'put',
      body
    }
  }
})
