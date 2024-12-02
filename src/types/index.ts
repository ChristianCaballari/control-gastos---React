type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

export interface IExpense {
  id: string;
  amount: number;
  expenseName: string;
  category: string;
  date: Value;
}

export interface ICategory {
  id: string;
  name: string;
  icon: string;
}

export type IDraftExpense = Omit<IExpense, "id">;
