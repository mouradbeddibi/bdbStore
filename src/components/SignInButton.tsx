import { signIn } from '@/auth'
import React from 'react'

const SignInButton = () => {
    return (
        <form
            action={async () => {
                "use server"
                await signIn("google")
            }}
        >
            <button type="submit">Signin with Google</button>
        </form>
    )
}

export default SignInButton