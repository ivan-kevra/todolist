import {store} from './state/store'
import {Provider} from 'react-redux'
import ReactDOM from 'react-dom'
import {AppWithRedux} from "./AppWithRedux";

ReactDOM.render(
    <Provider store={store}>
        <AppWithRedux/>
    </Provider>, document.getElementById('root')
)
