import { PlaidLinkOptions } from "react-plaid-link";

const PlaidLinkConfig: PlaidLinkOptions = {
  onSuccess: (public_token, metadata) => {},
  onExit: (err, metadata) => {},
  onEvent: (eventName, metadata) => {},
  token: "Gen",
};

export default PlaidLinkConfig;
