import { Context, Middleware } from "@nuxt/types"
import { Auth } from "@nuxtjs/auth-next"

const loginGuard: Middleware = ({ redirect, $auth }: Context & {$auth: Auth}) => {
  // Check if the user is logged in and redirect to /admin if they are
  if ($auth.loggedIn) {
    return redirect(307, '/admin')
  }
}

export default loginGuard