import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { AppReducer } from './index';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['favourites'],
};

const persistedReducer = persistReducer(persistConfig, AppReducer);

const configureRedux = () => {
    let store = createStore(persistedReducer, applyMiddleware(thunk, logger));
    // @ts-ignore for now before I figure out why persist store has type mismatch
    let persistor = persistStore(store);
    return { store, persistor };
};
export default configureRedux();
