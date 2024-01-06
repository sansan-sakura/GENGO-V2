import { SignIn } from "@clerk/clerk-react";
import { styleOption } from "../statics/clerk";


export const SignInPage = () => {
  return <SignIn 
  appearance={{...styleOption}} path="/sign-in" signUpUrl="/sign-up" redirectUrl='/'/>
}
