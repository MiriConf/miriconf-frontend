import Dashboard from '@/components/Dashboard'
import { SnackbarProvider } from 'notistack';

export default function Home() {
  return (
    <>
    <SnackbarProvider maxSnack={3}>
      <Dashboard></Dashboard>
    </SnackbarProvider>
    </>
  )
}
