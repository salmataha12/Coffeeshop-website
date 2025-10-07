import { useMemo , useState } from 'react';


export default function useCategoryFilteration({products}) {
  const [items, setItems] = useState(products);      
  const [selected, setSelected] = useState('All');
   
const categories = useMemo(() => {
    const one = Array.from(new Set(items.map(i => i?.category).filter(Boolean)))
      .sort((a, b) => String(a).localeCompare(String(b)));
    return ['All', ...one];
  }, [items]);

    const selectedItems = useMemo(() => {
    const filteredItems =  selected === 'All' ? items : items.filter(i => i?.category === selected);
    return filteredItems;
  }, [items, selected]);

  return {
    categories,
    selected,
    setSelected,
    selectedItems
  };
}