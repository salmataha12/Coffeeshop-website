const OPTIONS = { enableHighAccuracy: true, timeout: 10000 };

const getErrorMessage = (error) => {
  const messages = {
    [error.PERMISSION_DENIED]: 'Location access denied. Please enable location services and try again.',
    [error.POSITION_UNAVAILABLE]: 'Location information is unavailable. Please try again.',
    [error.TIMEOUT]: 'Location request timed out. Please try again.'
  };
  return messages[error.code] || 'Could not detect your location. ';
};

export const getCurrentPosition = () => {
  if (!navigator.geolocation) {
    return Promise.reject(new Error('Geolocation is not supported by your browser.'));
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve({ 
        latitude: position.coords.latitude, 
        longitude: position.coords.longitude 
      }),
      (error) => reject(new Error(getErrorMessage(error))),
      OPTIONS
    );
  });
};

export const isGeolocationSupported = () => !!navigator.geolocation;
