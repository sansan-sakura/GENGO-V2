import { SignUp } from '@clerk/clerk-react'
import { styleOption } from '../statics/clerk'

export const SignUpPage = () => {
  return (
    <div>
      <SignUp
        appearance={{ ...styleOption }}
        path='/sign-up'
        signInUrl='/sign-in'
        afterSignUpUrl='/'
      />
    </div>
  )
}
