import React, { useState } from 'react';
import { TextVariant } from 'utils/constants';
import { Button } from './Button';
import { Card } from './Card';
import { Text } from './Text';
import useCategoryActions from 'hooks/useCategoryActions';

export type AddCategoryProps = { className?: string };

export function AddCategory({ className = '' }: AddCategoryProps) {
  const { addCategory } = useCategoryActions();
  const [key, setKey] = useState('');
  const [title, setTitle] = useState('');

  const onAddCategory = () => {
    addCategory({key, title});
    onClearCategory();
  }

  const onClearCategory = () => {
    setKey('');
    setTitle('');
  }

  return (
    <Card
      title="New Category"
      className={` ${className}`}
      actions={[<Button onClick={onClearCategory}>Clear</Button>, <Button onClick={onAddCategory}>Save</Button>]}
    >
      <div className="grid gap-4 grid-cols-2 grid-rows-2">
        <Text variant={TextVariant.body}>Key *</Text>
        <input className="px-1 rounded-md border-px" value={key} onChange={(e) => setKey(e.target.value)}/>

        <Text variant={TextVariant.body}>Name *</Text>
        <input className="px-1 rounded-md border-px" value={title} onChange={(e) => setTitle(e.target.value)}/>
      </div>
    </Card>
  );
}
