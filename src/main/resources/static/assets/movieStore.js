import {i as defineStore, r as ref} from "./index.js";

const useMovieStore = defineStore("movie", () => {
  const movies = ref([]);
  const total = ref(0);
  const totalPages = ref(0);
  const loading = ref(false);
  const lastParams = ref("");
  const stats = ref(null);
  function setMovies(data, totalVal, totalPagesVal) {
    movies.value = data;
    total.value = totalVal;
    totalPages.value = totalPagesVal;
  }
  function setStats(data) {
    stats.value = data;
  }
  function setLoading(val) {
    loading.value = val;
  }
  function setLastParams(params) {
    lastParams.value = params;
  }
  return {
    movies,
    total,
    totalPages,
    loading,
    lastParams,
    stats,
    setMovies,
    setStats,
    setLoading,
    setLastParams
  };
});
export {
  useMovieStore as u
};
//# sourceMappingURL=movieStore.js.map
