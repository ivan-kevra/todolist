import {store} from './state/store'
import {Provider} from 'react-redux'
import {AppWithRedux} from "./AppWithRedux";
import {createRoot} from "react-dom/client";

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <AppWithRedux/>
    </Provider>
);