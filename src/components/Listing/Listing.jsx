import { useEffect } from 'react';
import ListingCards from './ListingCards';

const Listing = ({
  globalLoading, setGlobalLoading, currentView, setCurrentView,
  currentList, setCurrentList, setModalShow, setModalTarget,
  pokemonList, itemList, moveList, typeList }) => {

  useEffect(() => {
    const updateList = () => {
      switch (currentView) {
        case 'pokemon':
          setCurrentList(pokemonList);
          break;
        case 'item':
          setCurrentList(itemList);
          break;
        case 'move':
          setCurrentList(moveList);
          break;
        case 'type':
          setCurrentList(typeList);
          break;
        default:
          setCurrentList([]);
      }
    };
    updateList();
  }, [currentView, pokemonList, itemList, moveList, typeList, setCurrentList]);

  return (
    <div>

      <div className="tabber">
        <button className={`${currentView === 'pokemon' ? 'active' : ''}`} onClick={() => setCurrentView('pokemon')}>Pokemon</button>
        <button className={`${currentView === 'item' ? 'active' : ''}`} onClick={() => setCurrentView('item')}>Items</button>
        <button className={`${currentView === 'move' ? 'active' : ''}`} onClick={() => setCurrentView('move')}>Moves</button>
        <button className={`${currentView === 'type' ? 'active' : ''}`} onClick={() => setCurrentView('type')}>Types</button>
      </div>

      { currentList ? (
        <ListingCards
          globalLoading={globalLoading}
          setGlobalLoading={setGlobalLoading}
          currentList={currentList}
          currentView={currentView}
          setModalShow={setModalShow}
          setModalTarget={setModalTarget}
        />
      ) : null }

    </div>
  );
};

export default Listing;
