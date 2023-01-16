export const connectMetamask = (address) => {
    return (dispatch) => {
        dispatch({
            type: 'CONNECT_TO_METAMASK',
            payload: address
        })
    }
}

export const disconnectMetamask = () => {
    return (dispatch) => {
        dispatch({
            type: 'DISCONNECT_TO_METAMASK',
        })
    }
}