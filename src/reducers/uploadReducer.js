const initialState = {
    uploaded: false
}
export function uploadReducer(state = initialState, action) {
    switch (action.type) {


        case 'UPLOADED': console.log('reducer');
            return { ...state, uploaded: true };

        default: return state
    }

}
