import '@/styles/globals.css';
import Layout from '@/components/Layout';
import { Provider } from 'react-redux';
// import {createStore} from 'redux';
import {store} from '@/store';

export default function App({ Component, pageProps }) {

  // const store = createStore(reducer);


  return <Provider store={store} >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
}
