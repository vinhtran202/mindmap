import { useUser } from "@auth0/nextjs-auth0";

export default function useAuthUser() {
  const { user, error, isLoading } = useUser();
  return { user, error, isLoading };
}
