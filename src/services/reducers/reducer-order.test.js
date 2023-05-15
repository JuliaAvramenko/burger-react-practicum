import { CREATE_ORDER, CREATE_ORDER_FAILED, CREATE_ORDER_SUCCESS } from "../constants"
import { order } from "./order"

describe('order reducer', () => {
    it('should return the initial state', () => {
        expect(order(undefined, { type: "" })).toEqual(
            {
                loadStarted: false,
                loadFailed: false,
                orderName: " ",
                orderNumber: undefined,
            })

    })
    // CREATE_ORDER
    it('should handle ORDER REDUCERS', () => {
        expect(
            order(
                {
                    loadStarted: false,
                    loadFailed: false,
                    orderName: " ",
                    orderNumber: undefined,
                },
                {
                    type: CREATE_ORDER
                }
            )
        ).toEqual(
            {
                loadStarted: true,
                loadFailed: false,
                orderName: " ",
                orderNumber: undefined,
            }
        )


        //CREATE_ORDER_SUCCESS

        expect(
            order(
                {
                    loadStarted: false,
                    loadFailed: false,
                    orderName: " ",
                    orderNumber: undefined,
                },
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
                loadStarted: false,
                loadFailed: false,
                orderName: "Булка",
                orderNumber: 9887,
            }
        )


        //CREATE_ORDER_FAILED

        expect(
            order(
                {
                    loadStarted: false,
                    loadFailed: false,
                    orderName: " ",
                    orderNumber: undefined,
                },
                {
                    type: CREATE_ORDER_FAILED,
                }
            )
        ).toEqual(
            {
                loadStarted: false,
                loadFailed: true,
                orderName: " ",
                orderNumber: undefined,
            }
        )



    })
})
