import { useEffect } from 'react';

const ListingFilter = ({ currentKind, setCurrentKind, setCurrentList, pokemonList, itemList }) => {

  const handleViewChange = (newView, event) => {
    event.preventDefault();
    console.log('Changing view to:', newView);
    setCurrentKind(newView);
  };

  useEffect(() => {
    const updateList = () => {
      switch (currentKind) {
        case 'pokemon':
          setCurrentList(pokemonList);
          break;
        case 'item':
          setCurrentList(itemList);
          break;
        default:
          setCurrentList([]);
      }
    };
    updateList();
  }, [currentKind, pokemonList, itemList, setCurrentList]);

  return (
    <section className="frame filters">

      <div className="filter">
        <div className="title">Filter by kind:</div>
        <div className="tabber">
          <button className={`${currentKind === 'pokemon' ? 'active' : ''}`} onClick={(e) => handleViewChange('pokemon', e)}>Pokemon</button>
          <button className={`${currentKind === 'item' ? 'active' : ''}`} onClick={(e) => handleViewChange('item', e)}>Items</button>
        </div>
      </div>

      <div className="filter">
        <div className="title">Filter by category:</div>
        <div className="tabber">
        </div>
      </div>

    
    </section>
  );
};

export default ListingFilter;
