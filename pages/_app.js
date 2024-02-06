import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Ethereum, Sepolia } from "@thirdweb-dev/chains"; // Import chains
import {
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  embeddedWallet,
  rainbowWallet,
} from "@thirdweb-dev/react"; // Import wallets

// Assuming globalValues and other necessary variables/functions are defined
const globalValues = {
  chain_id: "2", // Example chain_id
  third_web_clientid: process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID, // Example client ID
  // other global values as needed
};
function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      activeChain={globalValues.chain_id === "1" ? "ethereum" : "sepolia"}
      clientId={globalValues.third_web_clientid}
      supportedChains={[globalValues.chain_id === "1" ? Ethereum : Sepolia]}
      supportedWallets={[
        metamaskWallet(),
        coinbaseWallet({ recommended: true }),
        walletConnect(),
        embeddedWallet({
          auth: { options: ["google", "apple", "email"] },
        }),
        rainbowWallet(),
      ]}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
