
import { TAB_SWITCH } from '../constants'
import { tabSwitch } from './tab'

describe('tab reducer', () => {
    it('should return the initial state', () => {
        expect(tabSwitch(undefined, { type: "" })).toEqual({ currentTab: "bun" })

    })

    it('should handle TAB_SWITCH', () => {
        expect(
            tabSwitch(
                {
                    currentTab: 'bun'
                },
                {
                    type: TAB_SWITCH,
                    currentTab: "main"
                }
            )
        ).toEqual(
            {
                currentTab: "main"
            }
        )
    })


})

