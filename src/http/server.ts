import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { createGoalsCompletionRoute } from '../routes/create-goal-completion'
import { createGoalsRoute } from '../routes/create-goals'
import { getPendingGoalsRoute } from '../routes/get-pending-goals'
import { getWeekSummaryRoute } from '../routes/get-week-summary'
import fastifyCors from '@fastify/cors'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createGoalsCompletionRoute)
app.register(createGoalsRoute)
app.register(getPendingGoalsRoute)
app.register(getWeekSummaryRoute)

app.register(fastifyCors, {
  origin: '*',
})
app
  .listen({
    port: 3333,
  })
  .then(() => console.log('Server running'))
