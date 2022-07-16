import { TODOListActionsContext } from 'context/TODOList';
import { useContext } from 'react';

function useItemActions() {
  const { addItem, removeItem, moveItem, handleCategoryDelete } = useContext(TODOListActionsContext);
  return { addItem, removeItem, moveItem, handleCategoryDelete };
}

export default useItemActions;
