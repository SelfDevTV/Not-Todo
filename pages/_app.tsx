import "../css/normalize.min.css";
import Head from "next/head";
import { Provider } from "next-auth/client";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Not To-Do</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
        />
      </Head>

      <div className="grid wrapper">
        <Provider session={pageProps.session}>
          <Component {...pageProps} />
        </Provider>
      </div>
    </>
  );
}

export default MyApp;
