// react
import {
    combineReducers,
    CombinedState,
    AnyAction,
    Action,
    Middleware,
} from "redux";

// vendors
import { ThunkAction } from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { API } from "../api-services";
import { MainPageReducer, MainPageReducerInit } from "../Reducer/mainPage.reducer";

// services
// import {API } from "app/services";

// utils
// core
// redux
// import { ArchSubsystemListDataReducer, ArchSubsystemListDataReducerInit } from "./Reducers/CardView.reducer";

// ui-components
// others
// scss
// lazy
// interfaces and types

// ------------------------------------------------------------------------------------------
// reducers

const reducers = combineReducers( {
    mainPage:MainPageReducer
} );

export type RootState = ReturnType<typeof reducers>;

const defaultState: RootState = {
    mainPage:MainPageReducerInit
};

const rootReducer = (
    state: CombinedState<RootState> | undefined,
    action: AnyAction
) => {
    if ( action.type === "RESET_ALL" ) state = defaultState;

    return reducers( state, action );
};

// ------------------------------------------------------------------------------------------
// services

export interface Services {
    API: typeof API;
}
const services = {
    API,
};

// ------------------------------------------------------------------------------------------
// niddleware

let middleware: Middleware[] = [];

// ------------------------------------------------------------------------------------------
// config function

export const storeConfig = () => {
    return configureStore( {
        reducer: rootReducer,
        middleware: getDefaultMiddleware => {
            return getDefaultMiddleware( {
                thunk: {
                    extraArgument: services,
                },
            } ).concat( middleware );
        },
    } );
};



// -------------------------------------------------------------------------------------
// api actions
// -------------------------------------------------------------------------------------


// -------------------------------------------------------------------------------------
// reducer actions
// -------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------
// exports
// -------------------------------------------------------------------------------------

export {

};

// ------------------------------------------------------------------------------------------
// interfaces

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    Services,
    Action
>;
