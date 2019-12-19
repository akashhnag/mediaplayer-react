let initialState = {
    displayFrames: false,
    filenames: []
}

export default function displayFramesReducer(state = initialState, action) {
    if (action.type === 'SHOW_FRAMES') {
        return (
            {
                ...state,
                displayFrames: true,
                filenames: [...state.filenames, action.payload]
            }
        )
    }
    return state
}
