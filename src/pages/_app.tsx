import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { UserProvider } from "~/hooks/useUser";
import Layout from "~/components/layout";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
};

export default api.withTRPC(MyApp);
