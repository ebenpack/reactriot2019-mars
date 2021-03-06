import { RESTART_GAME } from '../app/appModule';
import { COMPLETE_TASK } from '../tasksList/tasksListModule';
import { INSTALL_MODULE, UNINSTALL_MODULE, ADD_MODULE_TO_INVENTORY } from '../rover/roverModule';

import itemsData from '../data/items';

const REMOVE_ITEM_FROM_INVENTORY = 'REMOVE_ITEM_FROM_INVENTORY';

const initialState = Object.freeze([]);

export const removeItemFromInventory = (moduleId) => ({ type: REMOVE_ITEM_FROM_INVENTORY, moduleId });

const inventoryReducer = (state = initialState, action) => {
	switch (action.type) {
	case RESTART_GAME:
		return initialState;
	case COMPLETE_TASK:
		if (![1, 2, 3, 4].includes(action.data.itemId)) {
			return [...state, action.data];
		}
		return state;
	case UNINSTALL_MODULE: {
		const module = itemsData.find((checkItem) => checkItem.id === action.moduleId);
		return [...state, { itemId: module.id }];
	}
	case REMOVE_ITEM_FROM_INVENTORY:
	case INSTALL_MODULE: {
		const newState = [...state];

		// Remove this part from inventory
		const firstItemIndex = newState.findIndex((item) => item.itemId === action.moduleId);
		newState.splice(firstItemIndex, 1);

		return newState;
	}
	case ADD_MODULE_TO_INVENTORY:
		return [...state, action.module];
	default:
		return state;
	}
};

export default inventoryReducer;
