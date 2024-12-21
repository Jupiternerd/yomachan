import db from "../mongodb"
import { UserType } from "../struct/users";

export async function getUser(discordId: string) {
    return await db.collection<UserType>("users").findOne({ discordId })
}

export async function updateOrCreateUser(discordId: string, name: string, email: string | null, image: string | null, isAdmin: boolean = false) {
    await db.collection<UserType>('users').updateOne(
        { email: email, discordId: discordId, image: image },
        { 
          $set: { 
            isAdmin,
            discordId: discordId, 
            
          } 
        },
        { upsert: true }
      )

}