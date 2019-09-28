import { combineReducers, createStore, applyMiddleware, compose } from 'redux';

// reducers
import { gameOverReducer, startApp } from './appModule';
import buildDialogReducer from '../buildDialog/buildDialogModule';
import inventoryReducer from '../inventory/inventoryModule';
import oreCounterReducer from '../oreCounter/oreCounterModule';
import tasksListReducer from '../tasksList/tasksListModule';
import { gameTickReducer } from '../gameTicks/gameTicksModule';
import { roversReducer, propellantReducer } from '../rover/roverModule';
import { roverDetailReducer } from '../roversList/roversListModule';

// middlewares
import tasksListMiddleware from '../tasksList/tasksListMiddleware';
import { tickADiddlyAMiddlewareARooni } from '../gameTicks/tickMiddleware';

const reducers = combineReducers({
	rovers: roversReducer,
	roverDetail: roverDetailReducer,
	gameOver: gameOverReducer,
	gameSpeed: gameTickReducer,
	inventory: inventoryReducer,
	isBuildDialogOpen: buildDialogReducer,
	ore: oreCounterReducer,
	propellant: propellantReducer,
	tasks: tasksListReducer,
});

// We "need" to attach dispatch to actions so that the rover reducer can dispatch
export const addDispatchToActionsMiddleware = (store) => (next) => (action) => {
	const alteredAction = action;
	alteredAction.dispatch = store.dispatch;
	return next(alteredAction);
};

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [tickADiddlyAMiddlewareARooni, addDispatchToActionsMiddleware, tasksListMiddleware];
const store = createStore(
	reducers,
	composeEnhancers(applyMiddleware(...middleware)),
);

store.dispatch(startApp());

export default store;
