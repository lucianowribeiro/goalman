import fastify from 'fastify'
import { createGoal } from '../features/create-goal'
import z from 'zod'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { getWeekPendingGoals } from '../features/get-week-pending-goals'
import { createGoalCompletion } from '../features/create-goal-completion'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.post(
  '/completion',
  {
    schema: {
      body: z.object({
        goalId: z.string(),
      }),
    },
  },
  async request => {
    const { goalId } = request.body
    return await createGoalCompletion({ goalId })
  }
)
app.get('/pending-goals', async () => {
  const { pendingGoals } = await getWeekPendingGoals()
  return pendingGoals
})

app.post(
  '/goals',
  {
    schema: {
      body: z.object({
        title: z.string(),
        desiredWeeklyFrequency: z.number().int().min(1).max(7),
      }),
    },
  },
  async request => {
    const { title, desiredWeeklyFrequency } = request.body
    await createGoal({ title, desiredWeeklyFrequency })
  }
)

app
  .listen({
    port: 3333,
  })
  .then(() => console.log('Server running'))
