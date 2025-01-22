import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import type { User } from "../utils/_types";
import useUiStore from "./ui.store";
import { useRouter } from "vue-router";

function authStoreSetup() {
  const ui = useUiStore();
  const router = useRouter();

  const user = ref<User | null>(null);
  const userHasMasterPassword = ref<boolean>(false);

  const userIsLoggedIn = computed(() => user.value !== null);
  const userFullName = computed(
    () => `${user.value?.firstname} ${user.value?.lastname}`
  );

  function setUser(userObj: User | null) {
    user.value = userObj;
  }

  async function login(token: string) {
    try {
      if (token) {
        localStorage.setItem("accessToken", token);
        const decoded: any = jwtDecode(token);

        // Determine if user has vartija profile
        const resp = await axios.get("/vartija-profiles/has-vartija-profile");
        userHasMasterPassword.value = resp.data.hasVartijaProfile;
        user.value = {
          email: decoded.email,
          firstname: decoded.firstname,
          lastname: decoded.lastname,
        };
        ui.setError("");
        router.push("/home");
      }
    } catch (e) {
      ui.setError(e);
    }
  }

  function logout(error?: string) {
    localStorage.clear();
    setUser(null);
    ui.setError(error ? error : "");
    router.push("/").catch((_) => {});
  }
  async function fetchProfile() {
    try {
      const resp = await axios.get("/users/profile");
      if (resp.data) {
        setUser({
          email: resp.data.email,
          firstname: resp.data.firstname,
          lastname: resp.data.lastname,
        });
      }
    } catch (error) {
      ui.setError(error);
    }
  }

  async function setupMasterPassword(payload: any) {
    try {
      await axios.post("/vartija-profiles/", payload);
      userHasMasterPassword.value = true;
    } catch (error) {
      ui.setError(error);
    }
  }

  async function changeMasterPassword(payload: any) {
    try {
      await axios.patch("/vartija-profiles/change-master-password", payload);
    } catch (error) {
      ui.setError(error);
    }
  }

  return {
    userIsLoggedIn,
    userHasMasterPassword,
    user,
    userFullName,
    setUser,
    login,
    logout,
    setupMasterPassword,
    changeMasterPassword,
    fetchProfile,
  };
}

const useAuthStore = defineStore("auth", authStoreSetup, { persist: true });

export default useAuthStore;
