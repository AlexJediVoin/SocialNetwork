import React, {ComponentType} from 'react';
import Preloader from '../components/common/Prealoder/Preloader';

export function withSuspense<T>(Component: ComponentType<T>) {
    return (props: any)=> {
        return <React.Suspense fallback={<div><Preloader/></div>}> <Component {...props}/> </React.Suspense>
    }
};
