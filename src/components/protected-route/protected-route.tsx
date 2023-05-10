import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, ReactNode } from 'react';
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode"

import { refreshTokenThunk } from "../../services/actions/refresh-token";

import { FC } from 'react';
import { TRootStore } from "../../utils/types";
import { AppDispatch, AppThunk } from "../..";
import { useSelector } from "../../utils/hooks";

type TProtectedRoute = {
    children?: React.ReactNode
}

const ProtectedRoute: FC<TProtectedRoute> = ({ children }) => {
    const navigate = useNavigate()
    const dispatch: AppDispatch | AppThunk = useDispatch();
    const location = useLocation()
    const { session } = useSelector((store: TRootStore) => {
        return {
            session: store.auth.session
        }
    })
    const [authorized, setAuthorized] = useState<boolean>(session && session.refreshToken && true || false);



    useEffect(() => {
        if (session && session.refreshToken) {
            const accessToken = session.accessToken
            const dataFromToken: any = jwt_decode(accessToken)
            const delta = Number(Date.now() / 1000) - dataFromToken.exp

            //console.log(`data ${delta}`)

            if (delta > 0) {
                dispatch(refreshTokenThunk())
                setAuthorized(false)
            }
            else {
                setAuthorized(true)
            }
        }
        else {
            setAuthorized(false)

        }

    }, [session])

    return (
        <>
            {authorized === true && children || <Navigate to="/login" state={{ from: location.pathname !== '/login' && location.state?.from || '/' }} />}

        </>
    )
}


export default ProtectedRoute;