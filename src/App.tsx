import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import configuredStore from './reducers/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ApiProvider } from 'modules/API';
import { HomePage } from 'modules/Pages';

const { store, persistor } = configuredStore;

export function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ApiProvider>
                    <div className='App'>
                        <HomePage />
                    </div>
                </ApiProvider>
            </PersistGate>
        </Provider>
    );
}

export default App;
