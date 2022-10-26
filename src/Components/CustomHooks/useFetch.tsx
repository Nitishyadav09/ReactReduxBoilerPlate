import { useState, useEffect } from "react";
import { fetched, ObjectType } from "../utils/commonInterfaces";

const normalizeFn = ( data: ObjectType[], key: string = "id" ) => {
    if ( !Array.isArray( data ) ) return data;

    const normalizedObject: ObjectType = {};
    data.forEach( each => {
        normalizedObject[each[key]] = each;
    } );

    return normalizedObject;
};

export interface useFetchOptions<
    Fn extends ( ...args: any ) => Promise<any>,
    data extends any = any
    > {
    /**
     * Reference to the function which returns a Promise
     * @default undefined
     */
    method: Fn;
    /**
     * Arguments to the function refered for "method"
     * @default undefined
     */
    args: Parameters<Fn>;
    /**
     * Refetch based on dependency value change
     * - useEffect dependency array
     * @default []
     */
    dependencies?: any[];
    /**
     * normalizes based on the key provided
     * - boolean or string
     * - true -> normalizes by "id"
     * - false -> directly sets data with the response data
     * - "somekey" -> normalizes by "somekey"
     * @default false
     */
    normalize?: boolean | string;
    /**
     * Transform the response data before storing it the "data" state
     * - **Note:** if normalize is true|"somekey",
     * then normalized data is avaliable in the params instead of response data
     */
    transformResData?: ( data: any ) => any;
    /**
     * Condition to fetch
     * - true -> make the api request on fetch Call
     * - false -> donnot make api request on fetch call
     * @default true
     */
    condition?: boolean;
    /**
     * Default state of "data"
     * @default null
     */
    defaultData?: data;
    /**
     * Default state of "fetched"
     * @default "FALSE"
     */
    defaultFetched?: fetched;
    /**
     * if `true` returns the zeroth element of the response data
     */
    getZeroth?: boolean;
    /**
     * fallback error message for toast
     * @default "SERVER ERROR (useFetch)"
     */
    fallBackErrMsg?: string;
}

const useFetch = <
    data extends any = any,
    Fn extends ( ...args: any ) => Promise<any> = ( ...args: any ) => Promise<any>
> (
    options: useFetchOptions<Fn, data>
): [
        fetched,
        data | null,
        React.Dispatch<React.SetStateAction<any>>,
        ( force?: boolean ) => void
    ] => {
    const {
        method,
        args,
        dependencies = [],
        fallBackErrMsg = "SERVER ERROR (useFetch)",
        getZeroth = false,
        normalize = false,
        transformResData,
        condition = true,
        defaultData = null,
        defaultFetched = "FALSE",
    } = options;

    const [data, setData] = useState( defaultData );
    const [fetched, setFetched] = useState<fetched>( defaultFetched );


    const fetch = ( force = false ) => {
        if ( !condition && !force ) return;

        setFetched( "FETCHING" );
        method( ...args )
            .then( res => {
                let data = res.data;
                if ( normalize )
                    data = normalizeFn(
                        data,
                        typeof normalize === "string" ? normalize : undefined
                    );
                if ( typeof transformResData === "function" )
                    data = transformResData( data );

                // set data state , before fetched state is updated
                setData( getZeroth ? data[0] : data );
                setFetched( "TRUE" );
            } )
            .catch( e => {
                setFetched( "ERROR" );
            } );
    };

    useEffect( () => {
        fetch();

        return () => {
            setData( defaultData );
            setFetched( defaultFetched );
        };
    }, dependencies );

    return [fetched, data, setData, fetch];
};

export default useFetch;
