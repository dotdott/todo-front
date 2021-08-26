import { applyMiddleware, createStore, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./reducers";
import sagas from "./sagas";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "@todo",
  storage,
};

export default function configureStore(preloadedState = {}) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [thunkMiddleware, sagaMiddleware];
  const middlewareEnhancer = composeWithDevTools(
    applyMiddleware(...middlewares)
  );

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const composedEnhancers = compose(middlewareEnhancer);

  const store = createStore(
    persistedReducer,
    preloadedState,
    composedEnhancers
  );
  const persistor = persistStore(store);

  sagaMiddleware.run(sagas);

  return { store, persistor };
}
