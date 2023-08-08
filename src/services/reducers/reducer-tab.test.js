
import { TAB_SWITCH } from '../constants'
import { EmptyStore } from './root-reducer'
import { tabSwitch } from './tab'

describe('tab reducer', () => {
    it('should return the initial state', () => {
        expect(tabSwitch(undefined, { type: "" })).toEqual(EmptyStore.tabSwitch)

    })

    it('should handle TAB_SWITCH', () => {
        expect(
            tabSwitch(
                EmptyStore.tabSwitch,
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

