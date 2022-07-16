import React, { useState } from 'react';
import useCategories from 'hooks/useCategories';
import useItemActions from 'hooks/useItemActions';
import { TextVariant } from 'utils/constants';
import { Button } from './Button';
import { Card } from './Card';
import { Text } from './Text';

export type AddItemProps = { className?: string };

export function AddItem({ className = '' }: AddItemProps) {
  const categories = useCategories();
  const { addItem } = useItemActions();
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const onAddItem = () => {
    addItem({ category, description });
    onClearItems();
  }

  const onClearItems = () => {
    setDescription('');
    setCategory('');
  }

  return (
    <Card
      title="New Item"
      className={` ${className}`}
      actions={[<Button onClick={onClearItems}>Clear</Button>, <Button onClick={onAddItem}>Save</Button>]}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <Text variant={TextVariant.body}>Description *</Text>
          <textarea rows={5} value={description} className="px-1 rounded-md border-px" onChange={e => setDescription(e.target.value)}/>
        </div>

        <div className="grid gap-4 grid-cols-2 grid-rows-1">
          <Text variant={TextVariant.body}>Category</Text>
          <select value={category} className="px-1 rounded-md border-px" onChange={e => setCategory(e.target.value)}>
            <option>None</option>
            {
              categories.map((cat, aIdx) => <option value={cat.key} key={aIdx}>{cat.key}</option>)
            }
          </select>
        </div>
      </div>
    </Card>
  );
}
