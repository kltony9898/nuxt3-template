import type { H3Event, EventHandlerRequest } from 'h3'

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
  const query = await getQuery(event)

  return {
    success: true,
    data: {
      method: 'get',
      query
    }
  }
})
