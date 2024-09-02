import { useState } from 'react';
import { Toggle } from '../Toggle/Toggle';

export function ToggleWrapper() {
  const [toggleState, setToggleState] = useState(false);

  const handleToggleChange = (newState) => {
    setToggleState(newState);
  };

  return <Toggle initialState={toggleState} onChange={handleToggleChange} />;
}
