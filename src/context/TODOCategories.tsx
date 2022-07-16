import React, { createContext, ReactNode, useCallback, useState, useEffect } from 'react';
import { getItem, saveItem } from 'utils/storage';

export const TODOCategoriesContext = createContext<TodoCategoryState>({
  categories: [],
});

export const TODOCategoryActionsContext = createContext<TodoCategoryActions>({
  addCategory: (category) => {},
  removeCategory: (key) => {},
});

export type TODOCategoriesProviderProps = { children?: ReactNode };

const DefaulCategories: TodoCategory[] = [
  { key: 'req', title: 'Requirements' },
  { key: 'prog', title: 'In Progress' },
  { key: 'done', title: 'Complete' },
];

export function TODOCategoriesProvider({
  children,
}: TODOCategoriesProviderProps) {
  const [categories, setCategories] = useState<TodoCategory[]>(
    getItem<TodoCategory[]>('categories') || []
  );

  const saveCategories = (cats: TodoCategory[]) => {
    setCategories([...cats]);
    saveItem<TodoCategory[]>('categories', cats);
  };

  const addCategory = useCallback(
    (category: TodoCategory) => {
      // key and title is empty, just return
      if(!category.key || !category.title) return;

      // cat.key already exists do nothing... just return
      if(categories.some((cat) => cat.key === category.key)) return;

      saveCategories([...categories, category]);
    },
    [categories]
  );

  const removeCategory = useCallback(
    (key: string) => {
      // TODO: Add logic
      // After making the required updates,
      // call saveCategories on the mutated reference
      // saveCategories(categories);
    },
    [categories]
  );

  /**
   * TODO: Handle setting up default categories
   */

   useEffect(() => {
    let storesCat = DefaulCategories;
    if(categories.length) storesCat = categories;
    setCategories([...storesCat]);
  }, [])

  return (
    <TODOCategoryActionsContext.Provider
      value={{ addCategory, removeCategory }}
    >
      <TODOCategoriesContext.Provider value={{ categories }}>
        {children}
      </TODOCategoriesContext.Provider>
    </TODOCategoryActionsContext.Provider>
  );
}
