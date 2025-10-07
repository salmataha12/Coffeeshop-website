import { createSlice } from '@reduxjs/toolkit';
import { DrinksApi } from './DrinksApi';
import toast from 'react-hot-toast';

const LOCAL_STORAGE_KEY = 'userLocationInfo';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch {
    return undefined;
  }
};
const saveState = (state) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  } catch {}
};

const initialState = loadState() || {
  currentLocation: {
    locationTag: 'Select location',
    longitude: null,
    latitude: null,
  },
  savedLocations: [],
  // favorites: [],
  ordersconfirmed:[],
};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: {
    currentLocation: {
      locationTag: 'Select location',
      longitude: null,
      latitude: null,
    },
    savedLocations: [],
    orderNote: localStorage.getItem('userInfo'),
    favourites: [],
    drinksData: [],
    ordersconfirmed:[],
  },
  reducers: {
    saveLocation: (state, action) => {
      const newLocation = action.payload;
      // Error handling: Check if all required fields are present
      if (
        !newLocation.longitude ||
        !newLocation.latitude ||
        !newLocation.locationTag
      ) {
        throw new Error(
          `Missing required fields for location. Received: ${JSON.stringify(newLocation)}`
        );
      }
      // Check if coordinates already exist (regardless of location tag)
      const locationExists = state.savedLocations.some(
        (location) =>
          location.longitude === newLocation.longitude &&
          location.latitude === newLocation.latitude
      );
      if (locationExists) {
        state.savedLocations = state.savedLocations.map((location) =>
          location.longitude === newLocation.longitude &&
          location.latitude === newLocation.latitude
            ? newLocation
            : location
        );
        saveState(state);
        return;
      }
      // Create location object after validation
      const locationToSave = {
        longitude: newLocation.longitude,
        latitude: newLocation.latitude,
        locationTag: newLocation.locationTag,
      };
      state.savedLocations.push(locationToSave);
    },

    setCurrentLocation: (state, action) => {
      const location = action.payload;
      // Error handling: Check if all required fields are present
      if (
        !location.locationTag ||
        location.longitude === undefined ||
        location.latitude === undefined)
        throw new Error(
          `Missing required fields for current location. Received: ${JSON.stringify(location)}`
        );
      state.currentLocation.locationTag = location.locationTag;
      state.currentLocation.longitude = location.longitude;
      state.currentLocation.latitude = location.latitude;
    },
    updateLocationTag: (state, action) => {
      const { oldTag, newTag } = action.payload;
      if (!newTag || newTag.trim() === '') {
        throw new Error('Location tag cannot be empty');
      }

      const locationIndex = state.savedLocations.findIndex(
        (loc) => loc.locationTag === oldTag
      );

      if (locationIndex !== -1) {
        state.savedLocations[locationIndex].locationTag = newTag;
      }

      if (state.currentLocation?.locationTag === oldTag) {
        state.currentLocation.locationTag = newTag;
      }

      state.error = null;
    },
    orderNote: (state, action) => {
      const note = action.payload;
      // Error handling: Check if note is empty
      if (!note || note.trim() === '') {
        throw new Error(
          `Empty note cannot be added. Please provide a valid note.`
        );
      }
      state.orderNote = note;
      localStorage.setItem('userInfo', JSON.stringify(state));
    },

    addToFavourite: (state, action) => {
      const productId = action.payload;
      const product = state.drinksData.find((p) => p.id === productId);
      if (product && !state.favourites.find((p) => p.id === productId)) {
        state.favourites.push(product);
      }
      toast.success("added to favourites!")
    },

    removeFromFavourites: (state, action) => {
      const productId = action.payload;
      state.favourites = state.favourites.filter((p) => p.id !== productId);
      toast.success("removed from favourites!")
    },
     addOrder: (state, action) => {
      const order = action.payload;
      state.ordersconfirmed.push(order);
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      DrinksApi.endpoints.getDrinksList.matchFulfilled,
      (state, action) => {
        state.drinksData = action.payload;
      }
    );
  },
});

export const {
  saveLocation,
  setCurrentLocation,
  updateLocationTag,
  orderNote,
  addToFavourite,
  removeFromFavourites,
  getAllFavourites,
  addOrder,
} = userInfoSlice.actions;

export const userInfoReducer = userInfoSlice.reducer;