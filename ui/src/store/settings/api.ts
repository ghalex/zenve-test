import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import config from '@/config'
import { getMockSettingsProfile, updateMockSettingsProfile } from '@/lib/mock-settings'
import { getSupabaseBrowserClient } from '@/lib/supabase'
import type { SettingsProfile, UpdateSettingsProfileResponse } from '@/types'

function getMetadataValue(metadata: unknown, key: string) {
  if (typeof metadata !== 'object' || metadata === null || !(key in metadata)) {
    return null
  }

  const value = (metadata as Record<string, unknown>)[key]

  return typeof value === 'string' && value.length > 0 ? value : null
}

async function getProfileSeed() {
  const client = getSupabaseBrowserClient()

  if (!client) {
    return getMockSettingsProfile()
  }

  const {
    data: { session },
  } = await client.auth.getSession()
  const metadata = session?.user.user_metadata

  return getMockSettingsProfile({
    name: getMetadataValue(metadata, 'full_name') ?? session?.user.email ?? undefined,
    avatarUrl: getMetadataValue(metadata, 'avatar_url'),
  })
}

async function getAuthorizationHeaders() {
  const client = getSupabaseBrowserClient()

  if (!client) {
    return undefined
  }

  const {
    data: { session },
  } = await client.auth.getSession()

  if (!session?.access_token) {
    return undefined
  }

  return {
    Authorization: `Bearer ${session.access_token}`,
  }
}

function shouldUseMockFallback(error: FetchBaseQueryError) {
  return error.status === 'FETCH_ERROR' || error.status === 404
}

export const settingsApi = createApi({
  reducerPath: 'settingsApi',
  baseQuery: fetchBaseQuery({ baseUrl: config.apiBaseUrl }),
  tagTypes: ['SettingsProfile'],
  endpoints: (builder) => ({
    getSettingsProfile: builder.query<SettingsProfile, void>({
      async queryFn(_arg, _api, _extraOptions, fetchWithBQ) {
        const profileSeed = await getProfileSeed()

        if (!config.apiBaseUrl) {
          return { data: profileSeed }
        }

        const result = await fetchWithBQ({
          url: '/settings/profile',
          headers: await getAuthorizationHeaders(),
        })

        if (result.error) {
          if (shouldUseMockFallback(result.error as FetchBaseQueryError)) {
            return { data: profileSeed }
          }

          return { error: result.error as FetchBaseQueryError }
        }

        return { data: result.data as SettingsProfile }
      },
      providesTags: ['SettingsProfile'],
    }),
    updateSettingsProfile: builder.mutation<UpdateSettingsProfileResponse, SettingsProfile>({
      async queryFn(profile, _api, _extraOptions, fetchWithBQ) {
        if (!config.apiBaseUrl) {
          return { data: updateMockSettingsProfile(profile) }
        }

        const result = await fetchWithBQ({
          url: '/settings/profile',
          method: 'PUT',
          body: profile,
          headers: await getAuthorizationHeaders(),
        })

        if (result.error) {
          if (shouldUseMockFallback(result.error as FetchBaseQueryError)) {
            return { data: updateMockSettingsProfile(profile) }
          }

          return { error: result.error as FetchBaseQueryError }
        }

        return { data: result.data as UpdateSettingsProfileResponse }
      },
      invalidatesTags: ['SettingsProfile'],
    }),
  }),
})

export const { useGetSettingsProfileQuery, useUpdateSettingsProfileMutation } = settingsApi
