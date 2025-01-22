import { AxiosError } from "axios";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import {
  autoGenerateDefaultOptions,
  SESSION_EXPIRED,
} from "../utils/constants";
import type { EntryDisplayMode } from "../utils/_types";

function uiStoreSetup() {
  const error = ref<string>("");
  const autoGenerateOptions = ref(autoGenerateDefaultOptions);
  const showMoreFilters = ref(true);
  const entryDisplayMode = ref<EntryDisplayMode>("grid");

  const showEntriesInGrid = computed(() => entryDisplayMode.value === "grid");

  function toggleShowMoreFilters() {
    showMoreFilters.value = !showMoreFilters.value;
  }

  function setError(e: string | AxiosError | unknown) {
    if (error.value === SESSION_EXPIRED && e !== "") return;
    if (e instanceof AxiosError) {
      error.value = e.response?.data.message;
    } else if (typeof e === "string") {
      error.value = e;
    } else {
      error.value = "Something unexpected happened";
    }
  }

  function setAutoGenerateOptions(options: any) {
    autoGenerateOptions.value = { ...autoGenerateOptions.value, ...options };
  }

  const errorHappened = computed(() => error.value.length > 0);
  const generateOptions = computed(() => autoGenerateOptions.value);

  return {
    error,
    showMoreFilters,
    autoGenerateOptions,
    entryDisplayMode,
    showEntriesInGrid,
    setError,
    errorHappened,
    generateOptions,
    setAutoGenerateOptions,
    toggleShowMoreFilters,
  };
}

const useUiStore = defineStore("ui", uiStoreSetup, { persist: true });

export default useUiStore;
