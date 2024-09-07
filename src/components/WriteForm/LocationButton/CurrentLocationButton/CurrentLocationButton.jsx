import { useState, useEffect } from 'react';
import S from './CurrentLocationButton.module.css';

function CurrentLocationButton({ onLocationUpdate, standalone = false }) {
  const [permissionStatus, setPermissionStatus] = useState('prompt');
  const [isLoading, setIsLoading] = useState(false);
  const [buttonText, setButtonText] = useState('현재 위치');

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    if ('permissions' in navigator) {
      const status = await navigator.permissions.query({ name: 'geolocation' });
      setPermissionStatus(status.state);
      status.onchange = () => setPermissionStatus(status.state);
    }
  };

  const getAddressFromCoords = async (latitude, longitude) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      return (
        data.address.suburb ||
        data.address.town ||
        data.address.village ||
        '주소를 찾을 수 없습니다'
      );
    } catch (error) {
      console.error('Error fetching address:', error);
      return '주소 변환 중 오류가 발생했습니다';
    }
  };

  const requestLocation = () => {
    if ('geolocation' in navigator) {
      setIsLoading(true);
      setButtonText('로딩 중...');
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const address = await getAddressFromCoords(latitude, longitude);
          setButtonText(address);
          if (onLocationUpdate) {
            onLocationUpdate(address);
          }
          setIsLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          if (error.code === error.PERMISSION_DENIED) {
            setPermissionStatus('denied');
            setButtonText('위치 권한 필요');
          }
          setIsLoading(false);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  };

  const handleClick = () => {
    if (permissionStatus === 'granted') {
      requestLocation();
    } else {
      checkPermission();
      requestLocation();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={standalone ? S.standaloneButton : S.button}
      disabled={isLoading}
    >
      <span className="i_location_filled" />
      {buttonText}
    </button>
  );
}

export default CurrentLocationButton;
