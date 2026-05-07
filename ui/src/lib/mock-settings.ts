import type { SettingsProfile, UpdateSettingsProfileResponse } from '@/types'

const settingsStorageKey = 'zenve:mock-settings-profile'
const defaultMockDisplayName = 'Skywalker'

function canUseLocalStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

function normalizeDisplayName(name: string | null | undefined) {
  const trimmedName = name?.trim() ?? ''

  return trimmedName.length > 0 ? trimmedName : null
}

function readStoredMockSettingsProfile() {
  if (!canUseLocalStorage()) {
    return null
  }

  const storedValue = window.localStorage.getItem(settingsStorageKey)

  if (!storedValue) {
    return null
  }

  try {
    return JSON.parse(storedValue) as SettingsProfile
  } catch {
    return null
  }
}

function writeStoredMockSettingsProfile(profile: SettingsProfile) {
  if (!canUseLocalStorage()) {
    return
  }

  window.localStorage.setItem(settingsStorageKey, JSON.stringify(profile))
}

export function getMockSettingsProfile(seedProfile?: Partial<SettingsProfile>): SettingsProfile {
  const storedProfile = readStoredMockSettingsProfile()
  const resolvedName =
    normalizeDisplayName(storedProfile?.name) ?? normalizeDisplayName(seedProfile?.name) ?? defaultMockDisplayName

  return {
    name: resolvedName,
    avatarUrl: storedProfile?.avatarUrl ?? seedProfile?.avatarUrl ?? null,
  }
}

export function updateMockSettingsProfile(profile: SettingsProfile): UpdateSettingsProfileResponse {
  const nextProfile: SettingsProfile = {
    name: normalizeDisplayName(profile.name) ?? defaultMockDisplayName,
    avatarUrl: profile.avatarUrl,
  }

  writeStoredMockSettingsProfile(nextProfile)

  return {
    ...nextProfile,
    updatedAt: new Date().toISOString(),
  }
}
