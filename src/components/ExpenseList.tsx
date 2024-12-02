import { useBudget } from "../hook/useBudget"
import { useMemo } from 'react';
import ExpenseDetail from "./ExpenseDetail";
export default function ExpenseList() {

     const { state } = useBudget();

     const isEmpty = useMemo(() => state.expenses.length === 0, [state.expenses]);

     const filterExpenses = state.currentCategory ? state.expenses.filter(expense => expense.category === state.currentCategory) : state.expenses;

     return (
          <div className="mt-10 bg-white shadow-lg rounded-lg p-10">
               {isEmpty ? <p className="text-gray-600 text-2xl font-bold">No Hay Gastos</p> : (
                    <>
                         <p className="text-gray-600 text-2xl font-bold my-5">Listado de Gastos</p>
                         {filterExpenses.map(expense => (
                              <ExpenseDetail
                                   key={expense.id}
                                   expense={expense}
                              />
                         ))}
                    </>
               )}
          </div>
     )
}
