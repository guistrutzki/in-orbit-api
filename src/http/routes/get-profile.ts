import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getWeekPendingGoals } from '../../functions/get-week-pending-goals'
import { authenticateUserHook } from '../hooks/authenticate-user'
import { getUser } from '../../functions/get-user'

export const getProfileRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/profile',
    {
      onRequest: [authenticateUserHook],
      schema: {
        tags: ['auth'],
        description: 'Get authenticate user profile',
        response: {
          200: z.object({
            profile: z.object({
              id: z.string(),
              name: z.string().nullable(),
              email: z.string().nullable(),
              avatarUrl: z.string(),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const userId = request.user.sub

      const { user } = await getUser({ userId })

      return reply.status(200).send({ profile: user })
    }
  )
}
