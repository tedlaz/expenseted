"use server"

import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"

async function getTotals(): Promise<{
  income?: number
  expense?: number
  error?: string
}> {
  const { userId } = auth()

  if (!userId) {
    return { error: "User not found" }
  }

  try {
    const result = await db.transaction.aggregate({
      _sum: {
        positiveValue: {
          where: {
            amount: {
              gte: 0,
            },
          },
          amount: true,
        },
        negativeValue: {
          where: {
            amount: {
              lt: 0,
            },
          },
          amount: true,
        },
      },
      where: { userId },
    })

    const amounts = transactions.map((transaction) => transaction.amount)

    const income = amounts
      .filter((amount) => amount > 0)
      .reduce((sum, amount) => sum + amount, 0)

    const expense = amounts
      .filter((amount) => amount < 0)
      .reduce((sum, amount) => sum + amount, 0)

    return { income, expense: Math.abs(expense) }
  } catch (error) {
    return { error: "Could not get balance" }
  }
}

export default getTotals
