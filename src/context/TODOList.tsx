import React, { createContext, ReactNode, useCallback, useState } from 'react';
import { saveItem, getItem } from 'utils/storage';
import useCategories from 'hooks/useCategories';

export const TODOListContext = createContext<TodoListState>({
  items: [],
});

export const TODOListActionsContext = createContext<TodoListActions>({
  addItem: (item) => {},
  removeItem: (key) => {},
  moveItem: (key, category, movement) => {},
  handleCategoryDelete: (catKey) => {},
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
      const filterItems = items.filter((it) => it.key !== key);
      saveItems(filterItems);
    },
    [items]
  );

  const moveItem = useCallback(
    (key: string, category: string, movement: number) => {      
      const catIndex = categories.findIndex((cat) => cat.key === category);
      const nextCategory = categories[catIndex + movement];
  
      if(!nextCategory) return;

      const mappedItems = items.map(it => {
        if(it.key === key) {
          it.category = nextCategory.key
        }
        return it;
      });
      saveItems(mappedItems);
    },
    [items, categories]
  );

  /**
   * TODO: Handle category being deleted
   */

   const handleCategoryDelete = useCallback(
    (catKey: string) => {
      const filterItems = items.filter((it) => it.category !== catKey);
      saveItems(filterItems);
    }, [categories]
  );

  return (
    <TODOListActionsContext.Provider value={{ addItem, removeItem, moveItem, handleCategoryDelete }}>
      <TODOListContext.Provider value={{ items }}>
        {children}
      </TODOListContext.Provider>
    </TODOListActionsContext.Provider>
  );
}
