import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ForgotPasswordPage, HomePage, IngredientsPage, LoginPage, ProfilePage, RegisterPage, ResetPasswordPage } from '../../pages';
import ProtectedRoute from '../protected-route/protected-route';
import { TestPage } from '../../pages/test-page';
import { FeedPage } from '../../pages/feed-page';
import { FeedInfoPage } from '../../pages/feed-info-page';
import { ProfileOrdersInfoPage } from '../../pages/profile-orders-info-page';
import { TIngredient, TOnClick, TOpenModalClick } from '../../utils/types';
import { FC } from 'react';
import { Modal } from '../modal/modal';
import { TOrder } from '../../services/reducers/ws-socket';
import IngredientDetails from '../ingredient-details/ingredient-details';
import FeedInfo from '../feed-info/feed-info';

type TMyRoutes = {
    handleOpenModal: TOpenModalClick
}

type TModalState = {
    background?: Location
    content?: String
    data?: TOrder | TIngredient
}


export const MyRoutes: FC<TMyRoutes> = ({ handleOpenModal }) => {
    const location = useLocation()
    const navigate = useNavigate()

    // Состояние при открытии модального окна, приходят из FeedCard и IngredientCard
    const modalState = location.state as TModalState

    //console.log(`ModalState: ${JSON.stringify(modalState)}`)
    //console.log(`Location: ${JSON.stringify(location)}`)

    const cardCloseHandler = () => { navigate(location.state?.background?.pathname) }

    const createModalElement = (modalState: TModalState, onClose: TOnClick) => {

        let contentElement: JSX.Element | undefined = undefined

        switch (modalState.content) {
            case "IngredientDetails":
                contentElement = <IngredientDetails {...modalState.data} />
                break;

            case "FeedInfo":
                contentElement = <FeedInfo order={modalState.data as TOrder} />
                break;

            default:
                break;
        }

        const modal = <Modal onClose={onClose} >
            {contentElement}
        </Modal>

        return modal
    }

    return (
        <>
            <Routes location={modalState?.background || location} >
                <Route path="/" element={<HomePage openModal={handleOpenModal} />} />
                <Route path="/ingredients/:idIngredient" element={<IngredientsPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route path="/profile" element={<ProtectedRoute > <ProfilePage openModal={handleOpenModal} /></ProtectedRoute >} />
                <Route path="/profile/:section" element={<ProtectedRoute > <ProfilePage openModal={handleOpenModal} /></ProtectedRoute >} />

                <Route path="/feed" element={<FeedPage openModal={handleOpenModal} />} />
                <Route path="/feed/:idFeed" element={<FeedInfoPage />} />

                <Route path="/profile/orders/:idOrders" element={<ProtectedRoute > <ProfileOrdersInfoPage /></ProtectedRoute >} />


                <Route path="/test" element={<TestPage />} />
                <Route path="/test/:giraffe" element={<TestPage />} />
                <Route path="/test/:podruga/:persik" element={<TestPage />} />
            </Routes>
            {
                modalState?.background && <Routes>
                    <Route path="/feed/:idFeed" element={createModalElement(modalState, cardCloseHandler)} />
                    <Route path="/ingredients/:idIngredient" element={createModalElement(modalState, cardCloseHandler)} />
                    <Route path="/profile/orders/:idOrders" element={createModalElement(modalState, cardCloseHandler)} />
                </Routes>
            }


        </>
    )
}
