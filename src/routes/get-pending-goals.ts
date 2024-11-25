import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getPendingGoals } from '../features/get-pending-goals'

export const getPendingGoalsRoute: FastifyPluginAsyncZod = async (
  fastify,
  _opts
) => {
  fastify.route({
    method: 'GET',
    url: '/pending-goals',
    handler: async () => {
      const { pendingGoals } = await getPendingGoals()
      return pendingGoals
    },
  })
}
