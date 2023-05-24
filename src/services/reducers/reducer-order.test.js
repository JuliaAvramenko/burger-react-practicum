import { CREATE_ORDER, CREATE_ORDER_FAILED, CREATE_ORDER_SUCCESS, RESET_ORDER_STATUS } from "../constants"
import { order } from "./order"
import { EmptyStore } from "./root-reducer"

describe('order reducer', () => {
    it('should return the initial state', () => {
        expect(order(undefined, { type: "" })).toEqual(EmptyStore.order)

    })
    // CREATE_ORDER
    it('should handle ORDER REDUCERS', () => {
        expect(
            order(
                EmptyStore.order,
                {
                    type: CREATE_ORDER
                }
            )
        ).toEqual(
            {
                loadFinished: false,
                loadStarted: true,
                loadFailed: false,
                orderName: " ",
                orderNumber: undefined,
            }
        )


        //CREATE_ORDER_SUCCESS

        expect(
            order(
                EmptyStore.order,
                {
                    type: CREATE_ORDER_SUCCESS,
                    orderDetails:
                    {
                        success: true,
                        name: "Булка",
                        order: {
                            number: 9887
                        }
                    }

                }
            )
        ).toEqual(
            {
                loadFinished: true,
                loadStarted: false,
                loadFailed: false,
                orderName: "Булка",
                orderNumber: 9887,
            }
        )


        //CREATE_ORDER_FAILED

        expect(
            order(
                EmptyStore.order,
                {
                    type: CREATE_ORDER_FAILED,
                }
            )
        ).toEqual(
            {
                loadFinished: false,
                loadStarted: false,
                loadFailed: true,
                orderName: " ",
                orderNumber: undefined,
            }
        )

        expect(
            order({ ...EmptyStore.order, loadFinished: true }, { type: RESET_ORDER_STATUS })
        ).toEqual(
            EmptyStore.order
        )

    })
})
