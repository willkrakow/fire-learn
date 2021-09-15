import { CircularProgress } from '@material-ui/core';
import React from 'react';

type LoadingProps = {
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

// Higher order component for loading
export default function withLoading<P>(Component: React.ComponentType<P & LoadingProps>) {
    const [isLoading, setIsLoading] = React.useState(false);

    return (props: P) => (
        <>
            {isLoading && <CircularProgress />}
            <Component {...props} setIsLoading={setIsLoading} isLoading={isLoading} />
        </>
    );
}

