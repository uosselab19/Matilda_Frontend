import { useState } from 'react';

export default function useResult() {
  const loadedResult = useState(undefined);
  const errorResult = useState(undefined);
  const responseResult = useState(undefined);

  return { loadedResult, errorResult, responseResult };
}
