import { StorageSerializers } from "@vueuse/core";
import { authenticate, createUser, toSessionUser } from "~/service/auth";
import { users as seedUsers } from "~/service/data/users";
import type {
  LoginInput,
  RegisterInput,
  SessionUser,
  User,
} from "~/service/types/user";

/**
 * Mock auth backed by `service/data/users.ts`. Accounts created at sign-up
 * and the current session are kept in localStorage until a real backend
 * (Supabase) replaces this.
 */
export const useAuthStore = defineStore("authStore", () => {
  const registeredUsers = useLocalStorage<User[]>(
    "otobisi:registered-users",
    [],
  );
  const currentUser = useLocalStorage<SessionUser | null>(
    "otobisi:session",
    null,
    { serializer: StorageSerializers.object },
  );

  const allUsers = computed(() => [...seedUsers, ...registeredUsers.value]);
  const isLoggedIn = computed(() => currentUser.value !== null);

  const login = (input: LoginInput) => {
    const user = authenticate(allUsers.value, input);
    currentUser.value = {
      ...toSessionUser(user),
      lastLogin: new Date().toISOString(),
    };
    return currentUser.value;
  };

  const register = (input: RegisterInput) => {
    const user = createUser(allUsers.value, input);
    registeredUsers.value = [...registeredUsers.value, user];
    currentUser.value = toSessionUser(user);
    return currentUser.value;
  };

  const logout = () => {
    currentUser.value = null;
  };

  return { currentUser, isLoggedIn, login, register, logout };
});
