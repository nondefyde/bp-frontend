import {
    createActionString,
    createActionType,
} from '../../_shared/utils';

export const UI_INITIALIZE = createActionString('UI_INITIALIZE', 'UI');
export const UI_RESET = createActionString('UI_RESET', 'UI');
export const UI_LOADING = createActionType('UI_LOADING', 'UI');
export const UI_ERROR = createActionString('UI_ERROR', 'UI');
export const UI_NAVIGATE = createActionString('UI_NAVIGATE', 'UI');
export const OPEN_ASSIGN_MANAGER = createActionType(
    'OPEN_ASSIGN_MANAGER',
    'Terminal_UI'
);

export const UI_MODAL_TOGGLE = createActionString('UI_MODAL_TOGGLE', 'UI');
export const UI_MODAL_CUSTOM_TOGGLE = createActionString(
    'UI_MODAL_CUSTOM_TOGGLE',
    'UI'
);

export const UI_SET_PAGINATION = createActionType('UI_SET_PAGINATION', 'UI');
export const UI_FILTER_OPEN = createActionType('UI_FILTER_OPEN', 'UI');

export const UI_CROP_OPEN = createActionType('UI_CROP_OPEN', 'UI');
export const UI_CROP_UPDATE = createActionType('UI_CROP_UPDATE', 'UI');
export const UI_CROP_CLEAR = createActionType('UI_CROP_CLEAR', 'UI');
export const UI_CROP_CLEAR_CURRENT = createActionType(
    'UI_CROP_CLEAR_CURRENT',
    'UI'
);
export const UI_CROP_SAVE = createActionType('UI_CROP_SAVE', 'UI');

export const initialize = payload => ({
    type: UI_INITIALIZE,
    payload,
});

export const resetUI = () => ({
    type: UI_RESET,
});

export const startUILoading = key => ({
    type: UI_LOADING.START,
    key,
});

export const stopUILoading = key => ({
    type: UI_LOADING.END,
    key,
});

export const updateUIError = (key, value) => ({
    type: UI_ERROR,
    key,
    value,
});

export const navigateTo = path => ({
    type: UI_NAVIGATE,
    payload: path,
});

export const uiSetPagination = (key, payload) => ({
    type: UI_SET_PAGINATION.START,
    meta: {
        key,
        payload,
    },
});

