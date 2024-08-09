"use client";
import {
  createLinkToken,
  exchangePublicToken,
} from "@/lib/actions/user.action";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PlaidLinkOptions, usePlaidLink } from "react-plaid-link";
import { Button } from "../ui/button";

export const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const [token, setToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(user);
      setToken(data?.linkToken);
    };

    getLinkToken();
  }, [user]);

  const onSuccess = async (public_token: string) => {
    await exchangePublicToken({
      publicToken: public_token,
      user,
    });

    router.push("/");
  };
  const config: PlaidLinkOptions = {
    token,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);
  return (
    <>
      {variant === "primary" ? (
        <Button onClick={() => open()} disabled={!ready}>
          Connect Bank
        </Button>
      ) : variant === "ghost" ? (
        <Button>Connect Bank</Button>
      ) : (
        <Button>Connect Bank</Button>
      )}
    </>
  );
};
