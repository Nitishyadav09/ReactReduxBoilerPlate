import { useEffect } from "react";

// ----------------------------------------------------------------------------------

const useDocumentTitle = ( title: string ) => {
    useEffect( () => {
        document.title = `${title} | Movie Explore`;
        return () => {
            document.title = 'Movie Explore';
        };
    }, [] );
};

// ----------------------------------------------------------------------------------

export { useDocumentTitle };
