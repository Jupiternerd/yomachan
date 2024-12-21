import { NextApiRequest, NextApiResponse } from 'next'
import { isAdmin } from '../utils/auth'

export function withAdminAuth(handler: any) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (!(await isAdmin(req))) {
      return res.status(403).json({ error: 'Unauthorized' })
    }
    return handler(req, res)
  }
}