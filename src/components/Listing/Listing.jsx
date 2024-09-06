import ListingPage from './ListingPage';
import ListingFilter from './ListingFilter';

const Listing = ({
  globalLoading, setGlobalLoading, currentKind, setCurrentKind,
  currentList, setCurrentList, setModalShow, setModalTarget,
  pokemonList, itemList, moveList }) => {

  return (
    <div>

      <ListingFilter
        currentKind={currentKind}
        setCurrentKind={setCurrentKind}
        setCurrentList={setCurrentList}
        pokemonList={pokemonList}
        itemList={itemList}
      />

      { currentList ? (
        <ListingPage
          globalLoading={globalLoading}
          setGlobalLoading={setGlobalLoading}
          currentList={currentList}
          currentKind={currentKind}
          setModalShow={setModalShow}
          setModalTarget={setModalTarget}
        />
      ) : null }

    </div>
  );
};

export default Listing;
