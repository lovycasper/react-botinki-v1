import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header/Header';
import Drawer from './components/Drawer/Drawer';

import Home from './pages/Home';
import Favorites from './pages/Favorites';

function App() {
  const [items, setItems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // ! This way showed by Archakov, this is a bad idea to fetch data from server..
      // ! REWRITE THIS!!!
      const itemsResponse = await axios.get('https://611a81eb5710ca00173a1a69.mockapi.io/items');
      const cartResponse = await axios.get('https://611a81eb5710ca00173a1a69.mockapi.io/cart');
      const favoriteResponse = await axios.get(
        'https://611a81eb5710ca00173a1a69.mockapi.io/favorites',
      );

      setCartItems(cartResponse.data);
      setFavorites(favoriteResponse.data);
      setItems(itemsResponse.data);
    }
    fetchData();
  }, []);

  const onAddToCart = (obj) => {
    // ! bad setCartItems([...cartItems, obj]);
    // * better setCartItems((prev) => [...prev, obj]);
    if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
      axios.delete(`https://611a81eb5710ca00173a1a69.mockapi.io/cart/${obj.id}`);
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
    } else {
      axios.post('https://611a81eb5710ca00173a1a69.mockapi.io/cart', obj);
      setCartItems((prev) => [...prev, obj]);
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://611a81eb5710ca00173a1a69.mockapi.io/favorites/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      } else {
        const { data } = await axios.post(
          'https://611a81eb5710ca00173a1a69.mockapi.io/favorites',
          obj,
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в закладки');
    }
  };

  const onRemoveCartItem = (id) => {
    axios.delete(`https://611a81eb5710ca00173a1a69.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemoveItem={onRemoveCartItem}
        />
      )}

      <Header onClickCart={() => setCartOpened(true)} />

      <Route path="/" exact>
        <Home
          items={items}
          cartItems={cartItems}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onChangeSearchInput={onChangeSearchInput}
          onAddToFavorite={onAddToFavorite}
          onAddToCart={onAddToCart}
        />
      </Route>

      <Route path="/favorites" exact>
        <Favorites items={favorites} onAddToFavorite={onAddToFavorite} />
      </Route>
    </div>
  );
}

export default App;
