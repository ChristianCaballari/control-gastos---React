import { v4 as uuidv4 } from "uuid";
import { IDraftExpense, IExpense, ICategory } from "../types";

export type BudgetActions =
  | { type: "add-budget"; payload: { budget: number } }
  | { type: "show-modal" }
  | { type: "close-modal" }
  | { type: "add-expense"; payload: { expense: IDraftExpense } }
  | { type: "remove-expense"; payload: { id: IExpense["id"] } }
  | { type: "get-expense-by-id"; payload: { id: IExpense["id"] } }
  | { type: "update-expense"; payload: { expense: IExpense } }
  | { type: "reset-app" }
  | { type: "add-filter-category"; payload: { id: ICategory["id"] } };

export interface BudgetState {
  budget: number;
  modal: boolean;
  expenses: IExpense[];
  editingId: IExpense["id"];
  currentCategory: ICategory["id"];
}

const initialBugdet = (): number => {
  const localStorageBudget = localStorage.getItem("budget");
  return localStorageBudget ? +localStorageBudget : 0;
};

const localStorageExpenses = (): IExpense[] => {
  const localStorageExpenses = localStorage.getItem("expenses");
  return localStorageExpenses ? JSON.parse(localStorageExpenses) : [];
};

export const initialState: BudgetState = {
  budget: initialBugdet(),
  modal: false,
  expenses: localStorageExpenses(),
  editingId: "",
  currentCategory: "",
};

const createExpense = (draftExpense: IDraftExpense): IExpense => {
  return {
    ...draftExpense,
    id: uuidv4(),
  };
};

export const budgetReducer = (
  state: BudgetState = initialState,
  action: BudgetActions
) => {
  switch (action.type) {
    case "add-budget":
      return {
        ...state,
        budget: action.payload.budget,
      };
    case "show-modal":
      return {
        ...state,
        modal: true,
      };
    case "close-modal":
      return {
        ...state,
        modal: false,
        editingId: "",
      };
    case "add-expense":
      const expense = createExpense(action.payload.expense);
      return {
        ...state,
        expenses: [...state.expenses, expense],
        modal: false,
      };
    case "remove-expense":
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload.id
        ),
      };
    case "get-expense-by-id":
      return {
        ...state,
        editingId: action.payload.id,
        modal: true,
      };
    case "update-expense":
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense.id === action.payload.expense.id
            ? action.payload.expense
            : expense
        ),
        modal: false,
        editingId: "",
      };
    case "reset-app":
      return {
        ...state,
        budget: 0,
        expenses: [],
      };
    case "add-filter-category":
      return {
        ...state,
        currentCategory: action.payload.id,
      };
  }

  return state;
};
