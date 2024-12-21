import type { NextApiRequest, NextApiResponse } from 'next'
import { withAdminAuth } from '../../middleware/adminAuth'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Your admin-only logic here
  // For example, managing web novels, users, etc.
}

export default withAdminAuth(handler)