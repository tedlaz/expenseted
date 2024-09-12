import getIncomeExpense from "@/app/actions/getIncomeExpense"
import { num2gr } from "@/lib/utils"

const IncomeExpense = async () => {
  const { income, expense } = await getIncomeExpense()
  return (
    <div className='exp-container'>
      <div className='inc-exp-container'>
        <div>
          <h4>Income</h4>
          <p className='money plus'>{num2gr(income ?? 0)}</p>
        </div>
      </div>
      <div className='inc-exp-container'>
        <div>
          <h4>Expenses</h4>
          <p className='money minus'>{num2gr(expense ?? 0)}</p>
        </div>
      </div>
    </div>
  )
}

export default IncomeExpense
