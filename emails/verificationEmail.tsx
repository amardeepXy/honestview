import * as React from 'react';
import {
  Html,
  Head,
  Body,
  Preview,
  Heading,
  Text,
  Hr
} from "@react-email/components";

interface IVerificationEmail{
  username: string;
  code: string;
}

export default function VerificationEmail({username, code}: IVerificationEmail){

  return <Html>
    <Head>
      <title>OTP verification</title>
      <Preview>{code} is your OTP</Preview>
    </Head>
      <Body style={{paddingLeft: "20px", paddingRight: "20px", padding: "10px"}}>
        <Heading as='h2' style={{color: "gray", fontSize: "23px", paddingLeft: "10px"}}>
        Welcome <Text style={{fontWeight: "bold"}}>{username}</Text> to HonestView
        </Heading>
        <Text>Your account verification OTP is {code}</Text>
        <Hr/>
        <Text style={{color: "red", marginTop: "5px"}}>Don&apos;t share OTP with others</Text>
      </Body>
  </Html>
}