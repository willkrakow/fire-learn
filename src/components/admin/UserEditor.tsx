import React from 'react'
import { RouteComponentProps, useRouteMatch } from 'react-router'

interface TParams {
    userId: string;
}

const UserEditor = ({match}: RouteComponentProps<TParams>) => {
    const { params } = useRouteMatch<TParams>()
    return (
        <div>
            <h1>UserEditor</h1>
            <p>UserId: {params.userId}</p>
        </div>
    )
}

export default UserEditor