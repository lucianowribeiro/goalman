import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createGoalsCompletion } from '../features/create-goal-completion'

export const createGoalsCompletionRoute: FastifyPluginAsyncZod = async (
  fastify,
  _opts
) => {
  fastify.route({
    method: 'POST',
    url: '/completion',
    schema: {
      body: z.object({
        goalId: z.string(),
      }),
    },
    handler: async req => {
      const { goalId } = req.body
      return await createGoalsCompletion({ goalId })
    },
  })
}
