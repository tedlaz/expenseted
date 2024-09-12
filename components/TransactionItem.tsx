"use client"
import { Transaction } from "@/types/Transaction"
import { num2gr } from "@/lib/utils"
import { toast } from "react-toastify"
import deleteTransaction from "@/app/actions/deleteTransaction"

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  const handleDeleteTransaction = async (transactionId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this transaction?"
    )

    if (!confirmed) return

    await deleteTransaction(transactionId)
    toast.success("Transaction deleted")
  }

  return (
    <li className={transaction.amount > 0 ? "plus" : "minus"}>
      {transaction.text} <span>{num2gr(Math.abs(transaction.amount))}</span>
      <button
        onClick={() => handleDeleteTransaction(transaction.id)}
        className='delete-btn'
      >
        x
      </button>
    </li>
  )
}

export default TransactionItem
