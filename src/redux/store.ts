import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk, { ThunkMiddleware } from 'redux-thunk';

import {
  functionTransform,
  passwordTransform
} from '../lib/value-transformers';
import { rootReducer } from './index';
import { Dispatch, RootAction, RootState } from './redux-types';
import { hydrateTaskThunk } from './tasks/actions';

export const configureStore = () => {
  // redux-persist config
  const persistConfig = {
    key: 'root',
    storage,
    transforms: [functionTransform, passwordTransform]
  };
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  // FIXME: This is a hack tof ix redux dev tools not working with redux 4
  // tslint:disable:no-var-requires
  const reduxModule = require('redux');
  reduxModule.__DO_NOT_USE__ActionTypes.INIT = '@@redux/INIT';
  reduxModule.__DO_NOT_USE__ActionTypes.REPLACE = '@@redux/REPLACE';
  // End Hack

  const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    persistedReducer,
    composeEnhancers(
      applyMiddleware(
        thunk as ThunkMiddleware<RootState, RootAction>,
        createLogger({
          predicate: (_, action) => !/^@@/.test(action.type),
          collapsed: true
        })
      )
    )
  );

  const persistor = persistStore(store, {}, () => {
    (store.dispatch as Dispatch)(hydrateTaskThunk());
  });

  return { store, persistor };
};
