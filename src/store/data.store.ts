import { defineStore } from "pinia";
import useUiStore from "./ui.store";
import { ref, shallowRef, watch } from "vue";
import type {
  Entry,
  Category,
  Pagination,
  SearchFilter,
} from "../utils/_types";
import axios from "axios";
import type {
  ChangeCategoryForEntryPayload,
  CreateEntryPayload,
  EditEntryPayload,
} from "../utils/payload-types";
import { defaultFilterObject } from "../utils/constants";

export const DEFAULT_ENTRIES_PER_PAGE = 9;

function dataStoreSetup() {
  const ui = useUiStore();

  const entriesCount = ref(0);
  const entries = ref<Entry[]>([]);
  const categories = shallowRef<Category[]>([]);

  const isLoading = ref<boolean>(false);

  const pagination = ref<Pagination>({
    page: 1,
    perPage: DEFAULT_ENTRIES_PER_PAGE,
  });

  const filter = ref<SearchFilter>(defaultFilterObject);

  watch(
    pagination,
    async (_new: Pagination) => {
      await searchEntries();
    },
    { deep: true }
  );

  watch(
    filter,
    async (_new: SearchFilter) => {
      pagination.value = { page: 1, perPage: DEFAULT_ENTRIES_PER_PAGE };
    },
    { deep: true }
  );

  async function searchEntries() {
    const queryItems = [];
    const queryObj: Partial<SearchFilter> = {};
    if (filter.value.search) queryObj.search = filter.value.search;
    if (filter.value.category) queryObj.category = filter.value.category;
    if (filter.value.status) queryObj.status = filter.value.status;

    for (const key of Object.keys(queryObj)) {
      queryItems.push(`${key}=${queryObj[key as keyof SearchFilter]}`);
    }
    queryItems.push(`page=${pagination.value.page}`);
    queryItems.push(`perPage=${pagination.value.perPage}`);
    const queryString = queryItems.join("&");
    isLoading.value = true;
    try {
      const responseData = (await axios.get("/entries/?" + queryString)).data;
      entries.value = [...responseData.results];
      entriesCount.value = responseData.count;
    } catch (e) {
      ui.setError(e);
    } finally {
      isLoading.value = false;
    }
  }

  async function loadCategories() {
    isLoading.value = true;
    try {
      const response = await axios.get("/categories");
      categories.value = response.data;
    } catch (e) {
      ui.setError(e);
    } finally {
      isLoading.value = false;
    }
  }

  async function addCategory(payload: any) {
    try {
      await axios.post("/categories/", payload);
      await loadCategories();
    } catch (e) {
      ui.setError(e);
    }
  }

  async function removeCategory(id: string) {
    try {
      await axios.delete("/categories/" + id);
      await loadCategories();
    } catch (e) {
      ui.setError(e);
    }
  }

  async function editCategory(id: string, payload: any) {
    try {
      await axios.put("/categories/" + id, { newName: payload.name });
      await loadCategories();
    } catch (e) {
      ui.setError(e);
    }
  }

  async function addEntry(categId: string, entry: CreateEntryPayload) {
    try {
      await axios.post("/entries/?categoryId=" + categId, entry);
      await searchEntries();
      await loadCategories();
    } catch (e) {
      ui.setError(e);
    }
  }

  async function editEntry(
    id: string,
    entry: EditEntryPayload,
    changeCategoryPayload?: ChangeCategoryForEntryPayload
  ) {
    try {
      await axios.put("/entries/" + id, entry);
      if (changeCategoryPayload) {
        await axios.patch(
          `/entries/${id}/change-category`,
          changeCategoryPayload
        );
      }
      await searchEntries();
    } catch (e) {
      ui.setError(e);
    }
  }

  async function removeEntry(id: string) {
    try {
      await axios.delete("/entries/" + id);
      await searchEntries();
    } catch (e) {
      ui.setError(e);
    }
  }

  async function requestEntryPasswordReveal(
    id: string,
    masterPassword: string
  ) {
    if (!id || !masterPassword) return;
    try {
      const resp = await axios.get(
        `/entries/${id}/reveal-password?masterPassword=${masterPassword}`
      );
      return resp.data;
    } catch (e) {
      ui.setError(e);
    }
  }

  async function editEntryPassword(id: string, newPassword: string) {
    try {
      await axios.patch(`/entries/${id}/change-password`, {
        password: newPassword,
      });
    } catch (e) {
      ui.setError(e);
    }
  }

  async function downloadData(masterPassword: string) {
    try {
      return await axios.get(
        `/download/vartija?masterPassword=${masterPassword}`,
        { responseType: "blob" }
      );
    } catch (e) {
      ui.setError(e);
    }
  }

  return {
    pagination,
    entries,
    categories,
    filter,
    isLoading,
    entriesCount,
    searchEntries,
    addEntry,
    editEntry,
    removeEntry,
    loadCategories,
    addCategory,
    editCategory,
    removeCategory,
    requestEntryPasswordReveal,
    editEntryPassword,
    downloadData,
  };
}
const useDataStore = defineStore("data", dataStoreSetup, { persist: true });

export default useDataStore;
