import SignIn from '@/components/SignIn'
import { SnackbarProvider } from 'notistack';

export default function Login() {
  return (
    <>
    <SnackbarProvider maxSnack={3}>
      <SignIn></SignIn>
    </SnackbarProvider>
    </>
  )
}
