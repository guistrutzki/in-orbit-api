import { db } from '../db'
import { goals } from '../db/schema'

interface CreateGoalRequest {
  userId: string
  title: string
  desiredWeeklyFrequency: number
}

export async function createGoal({
  title,
  desiredWeeklyFrequency,
  userId,
}: CreateGoalRequest) {
  const result = await db
    .insert(goals)
    .values({
      userId,
      title,
      desiredWeeklyFrequency,
    })
    .returning()

  const goal = result[0]

  return { goal }
}
