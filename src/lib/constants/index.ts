import { Home, Banknote, Clipboard, PlayCircle } from "lucide-react";

export const sidebarLinks = [
  {
    icon: Home,
    route: "/",
    label: "Home",
  },
  {
    icon: Banknote,
    route: "/my-banks",
    label: "My Banks",
  },
  {
    icon: Clipboard,
    route: "/transaction-history",
    label: "Transaction History",
  },
  {
    icon: PlayCircle,
    route: "/payment-transfer",
    label: "Transfer Funds",
  },
];

// good_user / good_password - Bank of America
export const TEST_USER_ID = "6627ed3d00267aa6fa3e";

// custom_user -> Chase Bank
export const TEST_ACCESS_TOKEN =
  "access-sandbox-229476cf-25bc-46d2-9ed5-fba9df7a5d63";
