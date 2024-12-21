import { getSession } from 'next-auth/react'
import type { NextApiRequest } from 'next'
import db from '@/lib/mongodb'
import { UserType } from '@/lib/struct/users'

export async function isAdmin(req: NextApiRequest): Promise<boolean> {
  const session = await getSession({ req })
  
  if (!session?.user?.email) return false
  
  const user = await db.collection<UserType>('users').findOne({ 
    email: session.user.email 
  })
  
  return user?.isAdmin || false;
}