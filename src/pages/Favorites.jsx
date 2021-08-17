import React from 'react';
import Card from '../components/Card/Card';

function Favorites({ items, onAddToFavorite }) {
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои закладки</h1>
      </div>

      <div className="d-flex flex-wrap">
        {items.map((obj) => (
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
