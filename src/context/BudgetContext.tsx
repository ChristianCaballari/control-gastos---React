import { useReducer, createContext, Dispatch, ReactNode, useMemo } from "react";
import { BudgetActions, budgetReducer, BudgetState, initialState } from '../reducers/budget-reducers';

interface BudgetContextProps {
     state: BudgetState,
     dispatch: Dispatch<BudgetActions>
     totalExpenses: number,
     remainingBudget: number,

}

interface BudgetProvidersProps {
     children: ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>({} as BudgetContextProps);

export const BudgetProvider = ({ children }: BudgetProvidersProps) => {

     const [state, dispatch] = useReducer(budgetReducer, initialState);

     const totalExpenses = useMemo(() => state.expenses.reduce((total, expense) => expense.amount + total, 0), [state.expenses]);

     const remainingBudget = state.budget - totalExpenses;

     return (
          <BudgetContext.Provider
               value={{ state, dispatch, totalExpenses, remainingBudget }}
          >
               {children}
          </BudgetContext.Provider>
     )
}