"use server"

import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"

async function getUserBalance(): Promise<{
  balance?: number
  error?: string
}> {
  const { userId } = auth()

  if (!userId) {
    return { error: "User not found" }
  }

  try {
    const transactions = await db.transaction.findMany({
      where: { userId },
    })

    const total = await db.transaction.aggregate({
      _sum: { amount: true },
      where: {
        AND: [{ userId }, { amount: { lt: 0 } }],
      },
    })

    console.log("-------->", total._sum.amount)

    const balance = transactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    )
    return { balance }
  } catch (error) {
    return { error: "Could not get balance" }
  }
}

export default getUserBalance
