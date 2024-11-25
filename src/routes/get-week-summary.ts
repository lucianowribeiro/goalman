import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getWeekSummary } from '../features/get-week-summary'

export const getWeekSummaryRoute: FastifyPluginAsyncZod = async (
  fastify,
  _opts
) => {
  fastify.route({
    method: 'GET',
    url: '/summary',
    handler: async () => {
      const { result } = await getWeekSummary()
      return result
    },
  })
}
