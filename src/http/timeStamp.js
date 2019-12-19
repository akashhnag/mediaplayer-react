import axios from 'axios';
import previewReducer from '../reducers/previewReducer';
import displayFramesReducer from '../reducers/displayFramesReducer';
import { createStore } from 'redux';

const previewStore = createStore(previewReducer);
const displayFramesStore = createStore(displayFramesReducer);

function postTimeStamp(data) {
    axios.post('http://localhost:5000/convert', data).then((res) => {
        console.log(res);
        if (res.status === 200) {
            previewStore.dispatch({
                type: 'PREV_AVAILABLE'
            })
        }
    }, (err) => {
        console.log(err);

    })
}

function getFrames(data) {
    axios.post('http://localhost:5000/getFrames', data).then((res) => {
        console.log('response', res.data);

        if (res.status === 200) {
            displayFramesStore.dispatch({
                type: 'SHOW_FRAMES',
                payload: res.data.filenames
            })
        }

    }, (err) => {
        console.log(err);

    })
}

export { postTimeStamp, getFrames, previewStore, displayFramesStore };
