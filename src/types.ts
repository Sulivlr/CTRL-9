export interface ApiCategory {
  type: string;
  name: string;
}

export interface Category extends ApiCategory {
  id: string;
}


export interface ApiCategories {
  [id: string]: ApiCategory;
}

export interface ApiTransaction {
  category: string;
  amount: number;
  createdAt: string;
}

export interface TransactionMutation {
  category: string;
  amount: string;
}

export interface Transaction extends ApiTransaction {
  id: string;
  category: Category
}

export interface ApiTransactions {
  [id: string]: ApiTransaction;
}

