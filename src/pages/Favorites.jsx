import React, { useContext } from 'react';
import Card from '../components/Card/Card';
import AppContext from '../context';

function Favorites() {
  const { favorites, onAddToFavorite } = useContext(AppContext);
  console.log('State: ', favorites);
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои закладки</h1>
      </div>

      <div className="d-flex flex-wrap">
        {favorites.map((obj) => (
          <React.Fragment key={obj.id}>
            <Card
              title={obj.title}
              price={obj.price}
              id={obj.id}
              imageUrl={obj.imageUrl}
              favorited={true}
              onFavorite={onAddToFavorite}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
