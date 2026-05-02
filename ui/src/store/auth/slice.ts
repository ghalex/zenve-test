import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Session, User } from '@supabase/supabase-js'
import { isSupabaseConfigured } from '@/config'
import { getSupabaseBrowserClient } from '@/lib/supabase'
import { getErrorMessage } from '@/lib/utils'
import type { AppRootState } from '@/store'
import type { AuthMode } from '@/types'

interface AuthState {
  currentUser: User | null
  currentSession: Session | null
  errorMessage: string | null
  infoMessage: string | null
  initialized: boolean
  mode: AuthMode
  status: 'idle' | 'loading' | 'authenticated' | 'unauthenticated'
}

interface AuthCredentials {
  email: string
  password: string
}

interface AuthResult {
  session: Session | null
  user: User | null
  infoMessage?: string | null
}

const missingSupabaseMessage =
  'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to the frontend env file.'

const initialState: AuthState = {
  currentUser: null,
  currentSession: null,
  errorMessage: null,
  infoMessage: null,
  initialized: false,
  mode: 'sign-in',
  status: 'idle',
}

function getConfiguredClient() {
  const client = getSupabaseBrowserClient()

  if (!client) {
    throw new Error(missingSupabaseMessage)
  }

  return client
}

export const initializeAuth = createAsyncThunk<AuthResult, void, { rejectValue: string }>(
  'auth/initializeAuth',
  async (_arg, { rejectWithValue }) => {
    try {
      const client = getConfiguredClient()
      const { data, error } = await client.auth.getSession()

      if (error) {
        throw error
      }

      return {
        session: data.session,
        user: data.session?.user ?? null,
      }
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, missingSupabaseMessage))
    }
  },
)

export const signInWithPassword = createAsyncThunk<AuthResult, AuthCredentials, { rejectValue: string }>(
  'auth/signInWithPassword',
  async (credentials, { rejectWithValue }) => {
    try {
      const client = getConfiguredClient()
      const { data, error } = await client.auth.signInWithPassword(credentials)

      if (error) {
        throw error
      }

      return {
        session: data.session,
        user: data.user,
      }
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Unable to sign in right now.'))
    }
  },
)

export const signUp = createAsyncThunk<AuthResult, AuthCredentials, { rejectValue: string }>(
  'auth/signUp',
  async (credentials, { rejectWithValue }) => {
    try {
      const client = getConfiguredClient()
      const { data, error } = await client.auth.signUp(credentials)

      if (error) {
        throw error
      }

      return {
        session: data.session,
        user: data.user,
        infoMessage: data.session
          ? 'Account created and signed in.'
          : 'Check your inbox to confirm your account before signing in.',
      }
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Unable to create your account right now.'))
    }
  },
)

export const signOut = createAsyncThunk<void, void, { rejectValue: string }>('auth/signOut', async (_arg, { rejectWithValue }) => {
  try {
    const client = getConfiguredClient()
    const { error } = await client.auth.signOut()

    if (error) {
      throw error
    }
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, 'Unable to sign out right now.'))
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthFeedback(state) {
      state.errorMessage = null
      state.infoMessage = null
    },
    setAuthMode(state, action: PayloadAction<AuthMode>) {
      state.mode = action.payload
      state.errorMessage = null
      state.infoMessage = null
    },
    setAuthSession(state, action: PayloadAction<Session | null>) {
      state.currentSession = action.payload
      state.currentUser = action.payload?.user ?? null
      state.initialized = true
      state.status = action.payload?.user ? 'authenticated' : 'unauthenticated'
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeAuth.pending, (state) => {
        state.errorMessage = null
        state.status = 'loading'
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.currentSession = action.payload.session
        state.currentUser = action.payload.user
        state.errorMessage = null
        state.infoMessage = null
        state.initialized = true
        state.status = action.payload.user ? 'authenticated' : 'unauthenticated'
      })
      .addCase(initializeAuth.rejected, (state, action) => {
        state.currentSession = null
        state.currentUser = null
        state.errorMessage = action.payload || missingSupabaseMessage
        state.infoMessage = isSupabaseConfigured ? null : 'The auth page is waiting for your Supabase frontend env values.'
        state.initialized = true
        state.status = 'unauthenticated'
      })
      .addCase(signInWithPassword.pending, (state) => {
        state.errorMessage = null
        state.infoMessage = null
        state.status = 'loading'
      })
      .addCase(signInWithPassword.fulfilled, (state, action) => {
        state.currentSession = action.payload.session
        state.currentUser = action.payload.user
        state.errorMessage = null
        state.infoMessage = null
        state.initialized = true
        state.status = action.payload.user ? 'authenticated' : 'unauthenticated'
      })
      .addCase(signInWithPassword.rejected, (state, action) => {
        state.errorMessage = action.payload || 'Unable to sign in right now.'
        state.infoMessage = null
        state.initialized = true
        state.status = 'unauthenticated'
      })
      .addCase(signUp.pending, (state) => {
        state.errorMessage = null
        state.infoMessage = null
        state.status = 'loading'
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.currentSession = action.payload.session
        state.currentUser = action.payload.user
        state.errorMessage = null
        state.infoMessage = action.payload.infoMessage || null
        state.initialized = true
        state.status = action.payload.user ? 'authenticated' : 'unauthenticated'
      })
      .addCase(signUp.rejected, (state, action) => {
        state.errorMessage = action.payload || 'Unable to create your account right now.'
        state.infoMessage = null
        state.initialized = true
        state.status = 'unauthenticated'
      })
      .addCase(signOut.pending, (state) => {
        state.errorMessage = null
        state.status = 'loading'
      })
      .addCase(signOut.fulfilled, (state) => {
        state.currentSession = null
        state.currentUser = null
        state.errorMessage = null
        state.infoMessage = null
        state.initialized = true
        state.status = 'unauthenticated'
      })
      .addCase(signOut.rejected, (state, action) => {
        state.errorMessage = action.payload || 'Unable to sign out right now.'
        state.status = state.currentUser ? 'authenticated' : 'unauthenticated'
      })
  },
})

export const { clearAuthFeedback, setAuthMode, setAuthSession } = authSlice.actions

export const selectAuthErrorMessage = (state: AppRootState) => state.auth.errorMessage
export const selectAuthInfoMessage = (state: AppRootState) => state.auth.infoMessage
export const selectAuthMode = (state: AppRootState) => state.auth.mode
export const selectAuthStatus = (state: AppRootState) => state.auth.status
export const selectCurrentUser = (state: AppRootState) => state.auth.currentUser
export const selectIsAuthenticated = (state: AppRootState) => Boolean(state.auth.currentUser)
export const selectIsAuthInitialized = (state: AppRootState) => state.auth.initialized

export default authSlice.reducer
