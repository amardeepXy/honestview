import * as React from "react";
import {
  Html,
  Head,
  Body,
  Preview,
  Heading,
  Text,
  Hr,
} from "@react-email/components";

interface IVerificationEmail {
  username: string;
  code: string;
}

export default function VerificationEmail({
  username,
  code,
}: IVerificationEmail) {
  return (
    <Html>
      <Head>
        <title>OTP verification</title>
        <Preview>Your OTP for registration</Preview>
      </Head>
      <Body
        style={{ paddingLeft: "20px", paddingRight: "20px", padding: "10px" }}
      >
        <Heading
          as="h3"
          style={{ color: "gray", fontSize: "23px", paddingLeft: "10px" }}
        >
          Welcome <span style={{color: "black"}}>{username}</span> to HonestView
        </Heading>
        <Text color="rgb(20, 20, 20)">Your account verification OTP code is <code>{code}</code> </Text>
        <Hr />
        <Text style={{ color: "red", marginTop: "5px", fontWeight: "semibold", paddingLeft: "10px" }}>
          Don&apos;t share OTP code with others
        </Text>
      </Body>
    </Html>
  );
}
