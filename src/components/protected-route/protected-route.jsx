import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode"

import { refreshTokenThunk } from "../../services/actions/refresh-token";
import PropTypes from "prop-types";



function ProtectedRoute({ children }) {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [authorized, setAuthorized] = useState(false);

    const { session } = useSelector(store => {
        return {
            session: store.auth.session
        }
    })

    useEffect(() => {
        if (!session || !session.accessToken || !session.refreshToken) {
            navigate("/login")
        }
        else {
            // TODO: проверить , что accessToken работает
            const accessToken = session.accessToken
            const dataFromToken = jwt_decode(accessToken)
            const delta = Number(Date.now() / 1000) - dataFromToken.exp

            console.log(`data ${delta}`)

            if (delta > 0) {
                dispatch(refreshTokenThunk())
            }
            else {
                setAuthorized(true)
            }
        }

    }, [session])

    return (
        <>
            {authorized === true && children || <>User isn't authorized</>}

        </>
    )
}
ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,

}

export default ProtectedRoute;