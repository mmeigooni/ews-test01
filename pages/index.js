import { useEffect } from "react";
import { useConnectionStatus, useSigner } from "@thirdweb-dev/react";
// import { ConnectWallet } from './components'; // Adjust the path to where your ConnectWallet component is
import { ConnectWallet } from "@thirdweb-dev/react";

export default function Home() {
  const connectionStatus = useConnectionStatus();
  const signer = useSigner();

  // Integrated simplified getSignature function
  async function getSignature() {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay
    return {
      data: {
        getSignatureMessage: "This is a placeholder signature message.",
      },
    };
  }

  useEffect(() => {
    if (connectionStatus && connectionStatus === "connected") {
      getSignatureMessage();
    }
  }, [connectionStatus]);

  const getSignatureMessage = async () => {
    const result = await getSignature();
    const message = result.data.getSignatureMessage;
    signMessage(message);
  };

  const signMessage = async (message) => {
    try {
      const signedHash = await signer.signMessage(message);
      localStorage.setItem("signature_token", signedHash);
      // Assuming getToken and subsequent logic are defined or integrated here
    } catch (e) {
      console.error(e.message);
      // Assuming disconnectAccount or any error handling logic is defined here
    }
  };

  return <ConnectWallet />;
}
