import { Button, Card, Divider, Input } from '@nextui-org/react';
import { FcGoogle } from 'react-icons/fc';
import { useGetGoogleAuthUrlMutation, useLoginWithEmailMutation, useVerifyTokenMutation } from '../api';
import toast from 'react-hot-toast';
import { popupWindow } from '@/libs/utils';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useGetUserProfileMutation } from '@/features/user';
import { useAuthStore } from '@/libs/store';
import { COOKIE_ACCESS_TK, COOKIE_REFRESH_TK, COOKIE_USER_ID } from '@/common/const/auth';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';

export default function LoginPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { setUser } = useAuthStore();
  const navigate = useNavigate();
  const [, setCookie] = useCookies([COOKIE_ACCESS_TK, COOKIE_REFRESH_TK, COOKIE_USER_ID]);

  const loginGoogleMutation = useGetGoogleAuthUrlMutation({
    onSuccess: (data) => {
      const handleMessage = (event: MessageEvent<any>) => {
        // check if the origin is the same
        if (event.origin !== window.location.origin || event.data !== 'GoogleOAuthSuccess') return;
        verifyTokenMutation.mutate(data.data.token);
        window.removeEventListener('message', handleMessage);
      };
      const popup = popupWindow(data.data.redirectLink, 'Google Auth', 500, 600);
      setIsPopupOpen(true);
      // when receive message from popup then verify token
      window.addEventListener('message', handleMessage);
      // check if the popup is closed
      const checkPopup = setInterval(() => {
        if (popup?.closed) {
          setIsPopupOpen(false);
          window.removeEventListener('message', handleMessage);
          clearInterval(checkPopup);
        }
      }, 1000);
    },
    onError: () => {
      toast.error('Something went wrong. Please try again.');
    },
  });

  const verifyTokenMutation = useVerifyTokenMutation({
    onMutate: () => {
      toast.loading('Login in...', { id: 'login' });
    },
    onSuccess: (data) => {
      if (data.code === 200) {
        userProfileMutation.mutate();
      }
    },
    onError: () => {
      toast.error('Something went wrong. Please try again.', { id: 'login' });
    },
  });

  const userProfileMutation = useGetUserProfileMutation({
    onSuccess: (data) => {
      setUser(data.data);
      toast.success('Login successfully', { id: 'login' });
      setTimeout(() => {
        navigate('/');
      }, 200);
    },
  });

  const loginWithEmailMutation = useLoginWithEmailMutation({
    onSuccess: (data) => {
      if (data.code === 200) {
        setCookie(COOKIE_ACCESS_TK, data.data.accessToken);
        setCookie(COOKIE_REFRESH_TK, data.data.refreshToken);
        setCookie(COOKIE_USER_ID, data.data.userId);
        userProfileMutation.mutate();
      }
    },
    onError: () => {
      toast.error('Something went wrong. Please try again.');
    },
  });

  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: { email: string; password: string }) => {
    loginWithEmailMutation.mutate(data);
  };

  useEffect(() => {
    if (Cookies.get(COOKIE_ACCESS_TK) || Cookies.get(COOKIE_REFRESH_TK)) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="h-[calc(100dvh)]">
      <div className="p-6 h-full w-full flex items-center justify-center">
        <Card shadow="lg" className="w-full max-w-[480px] mx-auto p-8">
          <div className="flex flex-col items-center">
            <img src="/logo.jpg" alt="logo" className="w-[100px] h-[100px] mb-6" />
            <p className="text-xl font-medium">Welcome To HoHo Dashboard</p>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-6 mt-6">
              <Input label="Email" placeholder="Enter your email" {...register('email')} />
              <Input label="Password" placeholder="Enter your password" {...register('password')} />
              <Button type="submit" isLoading={loginWithEmailMutation.isPending}>
                Login
              </Button>
            </form>
            <Divider className="my-6" />
            <Button
              isLoading={
                loginGoogleMutation.isPending ||
                isPopupOpen ||
                verifyTokenMutation.isPending ||
                userProfileMutation.isPending
              }
              onClick={() => loginGoogleMutation.mutate(self.location.origin + '/auth/google/callback')}
              fullWidth
              variant="faded"
              startContent={<FcGoogle size={24} />}
            >
              Continue with Google
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
