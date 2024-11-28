import { db } from '../db'
import { goals } from '../db/schema'

interface CreateGoalRequest {
  title: string
  desiredWeeklyFrequency: number
}

export async function createGoals({
  title,
  desiredWeeklyFrequency,
}: CreateGoalRequest) {
  const result = await db.insert(goals).values({
    title,
    desiredWeeklyFrequency,
  })

  return result[0]
}
