import "../styles/globals.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { UberProvider } from "../context/uberContext";
// import { Analytics } from '@vercel/analytics/next';
function MyApp({ Component, pageProps }) {
  return (
      <UberProvider>
        <Component {...pageProps} />
        {/* <Analytics /> */}
      </UberProvider>
    
  );
}

export default MyApp;
