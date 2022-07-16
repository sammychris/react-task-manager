import React, { createContext, ReactNode, useCallback, useState } from 'react';
import { saveItem, getItem } from 'utils/storage';
import useCategories from 'hooks/useCategories';

export const TODOListContext = createContext<TodoListState>({
  items: [],
});

export const TODOListActionsContext = createContext<TodoListActions>({
  addItem: (item) => {},
  removeItem: (key) => {},
  moveItem: (key, category) => {},
});

export type TODOListProviderProps = { children?: ReactNode };
export function TODOListProvider({ children }: TODOListProviderProps) {
  const [items, setItems] = useState<TodoListItem[]>(
    getItem<TodoListItem[]>('items') || []
  );
  const categories = useCategories()

  const saveItems = (items: TodoListItem[]) => {
    setItems(items.map((it, itIdx) => ({ ...it, key: `item-${itIdx}` })));
    saveItem<TodoListItem[]>('items', items);
  };

  const addItem = useCallback(
    (item: Omit<TodoListItem, 'category' | 'key'> & { category?: string }) => {
      const {category, description} = item;

      // empty description, just return
      if(description?.trim() === '') return; 
  
      // item has no category, assign to the first category...
      if(category?.trim() === '') item.category = categories[0].key;

      saveItems([...items, item]);
    },
    [items, categories]
  );

  const removeItem = useCallback(
    (key: string) => {
      // TODO: Add logic
      // After making the required updates,
      // call saveItems on the mutated reference
      // saveItems(items);
    },
    [items]
  );

  const moveItem = useCallback(
    (key: string, category: string) => {
      // TODO: Add logic
      // After making the required updates,
      // call saveItems on the mutated reference
      // saveItems(items);
    },
    [items]
  );

  /**
   * TODO: Handle category being deleted
   */

  return (
    <TODOListActionsContext.Provider value={{ addItem, removeItem, moveItem }}>
      <TODOListContext.Provider value={{ items }}>
        {children}
      </TODOListContext.Provider>
    </TODOListActionsContext.Provider>
  );
}
