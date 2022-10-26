import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import mainPageService from '../Service/mainPageS.service'

// -------------------------------------------------------------------------------------
// api actions
// ---------------------------------main table arch-------------------------------------------------

export interface GetTeslaDataArg {
  
}

const GetTeslaData = createAsyncThunk(
    "getTeslaData/get",
    async ( arg: GetTeslaDataArg, { rejectWithValue } ) => {
        try {
            const { data } = await mainPageService.get( );

            return {
                ArchSubsystemListData: data as any,
            };
        } catch ( e ) {
            return rejectWithValue( e );
        }
    }
);

const resetTeslaProduct = createAction( "capsules/reset" );

// exports
// ---------------------------------------------------------------------------------------------------------------

export {
    GetTeslaData,
    resetTeslaProduct
};
