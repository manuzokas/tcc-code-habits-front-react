// type para os itens estaticos da checklist
export type SetupItem = {
  id: string;
  description: string;
  order_index: number;
  is_active: boolean;
};

export type UserSetupProgress = {
  id: string;
  user_id: string;
  item_id: string;
  completed: boolean;
  completion_date: string;
};

export type CombinedSetupItem = SetupItem & {
  completed: boolean;
};