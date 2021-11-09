import React, { useEffect } from "react";
import tw from "tailwind-styled-components";
import { useRouter } from "next/router";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "../firebase";

const Login = () => {
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/");
      }
    });
  });

  return (
    <Wrapper>
      <UberLogo src="https://i.ibb.co/n6LWQM4/Post.png" />
      <Title>Log in to access your account</Title>
      <HeadImage src="https://i.ibb.co/CsV9RYZ/login-image.png" />
      <SigninButton onClick={() => signInWithPopup(auth, provider)}>
        Sign in with google
      </SigninButton>
    </Wrapper>
  );
};

export default Login;

const Wrapper = tw.div`
    flex flex-col h-screen bg-gray-200 w-screen p-4
`;

const UberLogo = tw.img`
    w-auto h-8 object-contain self-start my-5
`;

const SigninButton = tw.button` 
    bg-black text-white text-center py-4 mt-2 self-center w-full
`;

const Title = tw.div`
    text-4xl pt-4 text-gray-500
`;

const HeadImage = tw.img`
h-60 object-contain w-full
`;
