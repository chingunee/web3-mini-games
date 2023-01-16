import Cookie from 'js-cookie'

const initialState = null

const reducer = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case "CONNECT_TO_METAMASK":
            Cookie.set("account", action.payload)
            return state = action.payload
        case "DISCONNECT_TO_METAMASK":
            Cookie.remove("account")
            return state = null
        default:
            return state
    }
}

export default reducer;