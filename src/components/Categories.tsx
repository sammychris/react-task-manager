import useCategories from 'hooks/useCategories';
import useCategoryActions from 'hooks/useCategoryActions';
import useItemActions from 'hooks/useItemActions';
import React from 'react';
import { Button } from './Button';
import { ContentColumn } from './ContentColumn';
import { Items } from './Items';

export type CategoriesProps = {
  className?: string;
};

export function Categories({ className = '' }: CategoriesProps) {
  const categories = useCategories();
  const { removeCategory } = useCategoryActions();
  const { handleCategoryDelete } = useItemActions();

  const onRemoveCategory = (key: string) => {
    removeCategory(key);
    handleCategoryDelete(key);
  }
  
  return (
    <div className={`h-full w-max flex ${className}`}>
      {categories.map((cat, cIdx) => (
        <ContentColumn
          className="w-96"
          actions={[<Button onClick={() => onRemoveCategory(cat.key)}>-</Button>]}
          title={cat.title}
          key={cat.key}
          first={cIdx === 0}
          last={cIdx === categories.length - 1}
        >
          <Items category={cat.key} />
        </ContentColumn>
      ))}
    </div>
  );
}
