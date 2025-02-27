import { COOKIE_ACCESS_TK, COOKIE_REFRESH_TK, COOKIE_USER_ID } from '@/common/const/auth';
import { useRefreshTokenMutation } from '@/features/auth';
import { getUserProfile } from '@/features/user';
import { useAuthStore } from '@/libs/store';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useLayoutEffect } from 'react';

import { useCookies } from 'react-cookie';
import { LoaderIcon } from 'react-hot-toast';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setAccessToken } = useAuthStore();
  const [cookies, , removeCookie] = useCookies([COOKIE_ACCESS_TK, COOKIE_REFRESH_TK, COOKIE_USER_ID]);

  const {
    data: profile,
    isLoading: profileLoading,
    refetch: refetchProfile,
  } = useQuery({
    queryKey: ['user-profile'],
    queryFn: () => {
      return getUserProfile();
    },
    retry: false,
  });

  const refreshTokenMutation = useRefreshTokenMutation({
    onSuccess: () => {
      refetchProfile();
    },
    onError: () => {
      removeCookie(COOKIE_ACCESS_TK);
      removeCookie(COOKIE_REFRESH_TK);
      removeCookie(COOKIE_USER_ID);
    },
  });

  const isLoading = profileLoading;

  useLayoutEffect(() => {
    if (cookies[COOKIE_ACCESS_TK]) {
      refetchProfile();
      setAccessToken(cookies[COOKIE_ACCESS_TK]);
    } else {
      if (cookies[COOKIE_REFRESH_TK] && cookies[COOKIE_USER_ID]) {
        refreshTokenMutation.mutate({ refreshToken: cookies[COOKIE_REFRESH_TK], userId: cookies[COOKIE_USER_ID] });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies[COOKIE_ACCESS_TK], cookies[COOKIE_REFRESH_TK], cookies[COOKIE_USER_ID]]);

  useEffect(() => {
    if (profile) {
      setUser(profile.data);
    }
  }, [profile]);

  if (isLoading) {
    return <LoaderIcon />;
  }

  return children;
}
