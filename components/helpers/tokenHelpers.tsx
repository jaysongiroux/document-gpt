import { Dispatch, SetStateAction } from 'react';

export const handleLocalTokenChange = (
  val: string | null | undefined,
  setToken: Dispatch<SetStateAction<string | null>>,
  setLocalToken: (val: string | null | undefined) => void,
) => {
  if (val) {
    setToken(val);
    setLocalToken(val);
  } else {
    setToken(null);
    setLocalToken(null);
  }
};
