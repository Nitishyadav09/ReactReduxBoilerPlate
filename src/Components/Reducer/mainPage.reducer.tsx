// vendors
import { createEntityAdapter, createReducer, createSelector, EntityState } from "@reduxjs/toolkit";
import { GetTeslaData, resetTeslaProduct } from "../Action/mainPage.action";
import { RootState } from "../Store/store";

// interfaces

// redux

// -----------------------------------------------------------------------------------
// entity adaptor

export interface mainPageI {
    id: number;
}


const collator = new Intl.Collator( undefined, { numeric: true, sensitivity: "base" } );


const adaptor = createEntityAdapter<mainPageI>( {
    selectId: ( mainPage ) => mainPage.id
} );


// -----------------------------------------------------------------------------------
// interfaces & initialState

type AdditionalFields = {};

type ImainPageReducer = EntityState<mainPageI> & AdditionalFields;

const additionalFields: AdditionalFields = {};

const initialState: ImainPageReducer = Object.assign( {}, adaptor.getInitialState(), additionalFields );

// -----------------------------------------------------------------------------------
// reducer

const MainPageReducer = createReducer( initialState, builder => {
    // get
    builder
        .addCase( GetTeslaData.fulfilled, ( state, action: any ) => {
            adaptor.setAll( state, action.payload);
        } )
        .addCase( GetTeslaData.rejected, ( _state, action ) => {
            // toast.throwError( action.payload, "Could not fetch inference" );
        } );

    builder
        .addCase( resetTeslaProduct, () => initialState );

} );


// -----------------------------------------------------------------------------------
// selectors

const selectors = adaptor.getSelectors<RootState>( ( state ) => state.mainPage );



const MainPageSelectors = Object.assign( {}, selectors );


// -----------------------------------------------------------------------------------
// exports
export {
    MainPageReducer,
    initialState as MainPageReducerInit,
    MainPageSelectors
};
