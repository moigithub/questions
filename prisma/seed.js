import { db } from './db'

async function seed() {
  await db.user.create({
    data: {
      id: '1'
    }
  })
}

seed()
