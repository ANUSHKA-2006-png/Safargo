import { useAppSelector } from "./useAppDispatch";

export function useAuth() {
  const auth = useAppSelector((state) => state.auth);
  return {
    ...auth,
    isAuthenticated: Boolean(auth.accessToken)
  };
}
