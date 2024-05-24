import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import interceptors from './utils/Interceptors';
import Layout from './components/layout/layout/Layout';
import { Helmet } from 'react-helmet';

interceptors.create();

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Vacations</title>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Vacations</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,600;1,9..40,600&display=swap" rel="stylesheet" />
            </Helmet>
        </Helmet>
        <Layout />
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
