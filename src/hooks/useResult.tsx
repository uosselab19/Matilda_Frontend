import { useState } from 'react';

export default function useResult() {
  const loadedResult = useState(undefined as any);
  const errorResult = useState(undefined as any);
  const responseResult = useState(undefined as any);

  return { loadedResult, errorResult, responseResult };
}
