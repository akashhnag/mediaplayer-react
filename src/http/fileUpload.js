import axios from 'axios';
import { createStore } from 'redux';
import { uploadReducer } from '../reducers/uploadReducer';

let store = createStore(uploadReducer);

function fileUpload(data) {
    axios.post('http://localhost:5000/upload', data).then((res) => {

        if (res.status === 200) {
            console.log(res);
            store.dispatch({ type: 'UPLOADED' })
        }

    }, (err) => {
        console.log(err);

    })

}
export { fileUpload, store }
