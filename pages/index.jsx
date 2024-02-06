import {
  useConnectionStatus,
  useDisconnect,
  useSigner,
} from "@thirdweb-dev/react";
import { useEffect } from "react";
// import { ConnectWallet } from './components'; // Adjust the path to where your ConnectWallet component is
import { ConnectWallet } from "@thirdweb-dev/react";

export default function Home() {
  const connectionStatus = useConnectionStatus();
  const signer = useSigner();
  const disconnect = useDisconnect();

  // Integrated simplified getSignature function
  async function getSignature() {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay
    return {
      data: {
        getSignatureMessage: "placeholderMessage",
      },
    };
  }

  function getSignatureMessage() {
    getSignature().then((result) => {
      const message = result.data.getSignatureMessage;
      console.log(`sig message ${message}`);
      signMessage(message);
    });
  }

  async function signMessage(message) {
    try {
      const signedHash = await signer.signMessage(message);
      console.log(`signed hash ${signedHash}`);
      localStorage.setItem("signature_token", signedHash);
      // Assuming getToken and subsequent logic are defined or integrated here
    } catch (e) {
      console.error("Error signing message", e);
      disconnect();
    }
  }

  useEffect(() => {
    if (signer && connectionStatus && connectionStatus === "connected") {
      getSignatureMessage();
    }
  }, [connectionStatus, signer]);

  return <ConnectWallet />;
}
