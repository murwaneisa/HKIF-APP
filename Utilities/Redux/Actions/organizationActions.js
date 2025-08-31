import { createAsyncThunk } from '@reduxjs/toolkit'
import { getActiveOrganizations } from '../../Axios/organization'

// Async thunk for fetching active organizations
export const fetchActiveOrganizations = createAsyncThunk(
  'organizations/fetchActive',
  async (_, { rejectWithValue }) => {
    try {
      const organizations = await getActiveOrganizations()
      return organizations
    } catch (error) {
      console.error('Failed to fetch active organizations:', error)
      return rejectWithValue(error.message || 'Failed to fetch organizations')
    }
  }
)
