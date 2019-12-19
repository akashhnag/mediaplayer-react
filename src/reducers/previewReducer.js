

let initialState = {
    prevAvailable: false
}

export default function (state = initialState, action) {
    if (action.type === 'PREV_AVAILABLE') {
        return (
            {
                ...state,
                prevAvailable: true
            }
        )
    }
    return state
}
