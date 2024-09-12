import { SignInButton } from "@clerk/nextjs"

const Guest = () => {
  return (
    <div className='guest'>
      <h1>Welcome</h1>
      <p>Please sign in to continue</p>
      <SignInButton />
    </div>
  )
}

export default Guest
