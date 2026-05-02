import './main.css'
import { useEffect } from 'react'
import AppRoutes from '@/routes'
import { initializeAuth, setAuthSession } from '@/store/auth'
import { useAppDispatch } from '@/store/hooks'
import { getSupabaseBrowserClient } from '@/lib/supabase'

export default function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const client = getSupabaseBrowserClient()

    void dispatch(initializeAuth())

    if (!client) {
      return undefined
    }

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((_event, session) => {
      dispatch(setAuthSession(session))
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [dispatch])

  const renderMain = () => <AppRoutes />

  return renderMain()
}
