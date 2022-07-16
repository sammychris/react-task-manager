import { TODOListContext } from 'context/TODOList';
import useItems from 'hooks/useItems';
import useItemActions from 'hooks/useItemActions';
import React, { useContext } from 'react';
import { TextVariant } from 'utils/constants';
import { Button } from './Button';
import { Card } from './Card';
import { Text } from './Text';

export type ItemsProps = {
  category: string;
  className?: string;
};

export function Items({ category, className = '' }: ItemsProps) {
  const items = useItems();
  const { removeItem, moveItem } = useItemActions();

  const onRemoveItem = (key: string) => {
    removeItem(key);
  }

  return (
    <>
      {items
        .filter((it) => it.category === category)
        .map((it, idx) => (
          <Card
            key={`cc-${idx}`}
            className={`${className}`}
            actions={[
              <Button onClick={() => onRemoveItem(it.key)}>{'-'}</Button>,
              <Button>{'<'}</Button>,
              <Button>{'>'}</Button>,
            ]}
          >
            {it.description.split('\n').map((l, lIdx) => (
              <Text variant={TextVariant.body} key={`cl-${lIdx}`}>
                {l}
              </Text>
            ))}
          </Card>
        ))}
    </>
  );
}
