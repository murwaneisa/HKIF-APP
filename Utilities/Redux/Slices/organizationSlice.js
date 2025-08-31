import { createSlice } from '@reduxjs/toolkit'
import { fetchActiveOrganizations } from '../Actions/organizationActions'

const initialState = {
  organizations: [],
  selectedOrganization: null,
  recentOrganizations: [],
  loading: false,
  error: null,
  lastFetch: null,
}

const organizationSlice = createSlice({
  name: 'organization',
  initialState,
  reducers: {
    setSelectedOrganization: (state, action) => {
      state.selectedOrganization = action.payload
      // Add to recent organizations if not already there
      const exists = state.recentOrganizations.find(org => org.id === action.payload.id)
      if (!exists) {
        state.recentOrganizations.unshift(action.payload)
        // Keep only the last 6 recent organizations
        if (state.recentOrganizations.length > 6) {
          state.recentOrganizations = state.recentOrganizations.slice(0, 6)
        }
      }
    },
    clearSelectedOrganization: (state) => {
      state.selectedOrganization = null
    },
    clearError: (state) => {
      state.error = null
    },
    clearOrganizations: (state) => {
      state.organizations = []
      state.lastFetch = null
    },
    addRecentOrganization: (state, action) => {
      const exists = state.recentOrganizations.find(org => org.id === action.payload.id)
      if (!exists) {
        state.recentOrganizations.unshift(action.payload)
        // Keep only the last 6 recent organizations
        if (state.recentOrganizations.length > 6) {
          state.recentOrganizations = state.recentOrganizations.slice(0, 6)
        }
      }
    },
    removeRecentOrganization: (state, action) => {
      state.recentOrganizations = state.recentOrganizations.filter(
        org => org.id !== action.payload
      )
    },
    clearRecentOrganizations: (state) => {
      state.recentOrganizations = []
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch active organizations
      .addCase(fetchActiveOrganizations.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchActiveOrganizations.fulfilled, (state, action) => {
        state.loading = false
        state.organizations = action.payload
        state.lastFetch = Date.now()
        state.error = null
      })
      .addCase(fetchActiveOrganizations.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const {
  setSelectedOrganization,
  clearSelectedOrganization,
  clearError,
  clearOrganizations,
  addRecentOrganization,
  removeRecentOrganization,
  clearRecentOrganizations,
} = organizationSlice.actions

export default organizationSlice.reducer
