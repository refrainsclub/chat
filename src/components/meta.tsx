import Head from "next/head";
import { useRouter } from "next/router";

export default function Meta() {
  const router = useRouter();
  const title = "PieChat";
  const description = "Chat application using PieAuth";
  const domain = "https://piechat.vercel.app";
  const url = domain + router.pathname;
  const image = `${domain + "/pies.png"}`;

  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="favicon.ico" />
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Head>
  );
}
