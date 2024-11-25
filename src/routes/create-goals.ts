import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createGoals } from '../features/create-goal'

export const createGoalsRoute: FastifyPluginAsyncZod = async (
  fastify,
  _opts
) => {
  fastify.route({
    method: 'POST',
    url: '/goals',
    schema: {
      body: z.object({
        title: z.string(),
        desiredWeeklyFrequency: z.number().int().min(1).max(7),
      }),
    },
    handler: async req => {
      const { title, desiredWeeklyFrequency } = req.body
      await createGoals({ title, desiredWeeklyFrequency })
    },
  })
}
