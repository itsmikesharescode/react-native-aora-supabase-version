import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { PostgrestError } from '@supabase/supabase-js';

type FetchDataResult<T> = T[] | PostgrestError;

export const useRenderDB = <T>(fn: () => Promise<FetchDataResult<T>>) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    refetch();
  }, []);

  const refetch = async () => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fn();
        if (Array.isArray(response)) {
          setData(response);
        } else {
          Alert.alert(response.message);
        }
      } catch (error) {
        Alert.alert((error as PostgrestError).message);
      } finally {
        setIsLoading(false);
      }
    };

    await fetchData();
  };

  return { data, isLoading, refetch };
};
