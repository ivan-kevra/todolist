import {store} from './app/store'
import {Provider} from 'react-redux'
import {App} from "./app/App";
import {createRoot} from "react-dom/client";
import {BrowserRouter} from "react-router-dom";

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);