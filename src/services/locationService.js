import axios from 'axios';

const GEOCODING_API_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

/**
 * Get location name from coordinates using reverse geocoding
 * @param {number} latitude - The latitude coordinate
 * @param {number} longitude - The longitude coordinate
 * @returns {Promise<string>} The formatted location name (city, country)
 * @throws {Error} When API request fails
 */
export const getLocationName = async (latitude, longitude) => {

  try {
    const response = await axios.get(GEOCODING_API_URL, {
      params: {
        latitude,
        longitude,
        localityLanguage: 'en'
      }
    });

    const { city = '', countryName: country = '' } = response.data;

    return city && country ? `${city}, ${country}` : city || country || 'Unknown Location';
  } catch (error) {
    if (error.response) {
      // Server responded with error status
      throw new Error(`Failed to get location name. Please try again later. (${error.response.status})`);
    } else if (error.request) {
      // Network error
      throw new Error('Network error. Please check your internet connection and try again.');
    } else {
      // Other error
      throw new Error('Unable to get location name. Please try again.');
    }
  }
};
