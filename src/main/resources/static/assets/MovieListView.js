import {
    _ as _export_sfc,
    a as openBlock,
    b as createBaseVNode,
    c as createElementBlock,
    d as defineComponent,
    e as renderList,
    F as Fragment,
    g as createVNode,
    h as createCommentVNode,
    i as defineStore,
    j as createStaticVNode,
    k as withDirectives,
    l as vModelSelect,
    m as unref,
    n as normalizeClass,
    o as onMounted,
    p as createBlock,
    q as reactive,
    r as ref,
    s as computed,
    t as toDisplayString,
    u as useRouter,
    v as vModelText,
    w as watch,
    x as useRoute
} from "./index.js";
import {a as fetchMovieTypes, b as fetchMovieRegions, c as fetchMovieLanguages, d as fetchMovieList} from "./movie.js";
import {u as useMovieStore} from "./movieStore.js";
import {B as Breadcrumb} from "./Breadcrumb.js";
import {M as MovieCard} from "./MovieCard.js";
import {P as Pagination} from "./Pagination.js";

const useFilterStore = defineStore("filter", () => {
  const types = ref([]);
  const regions = ref([]);
  const languages = ref([]);
  const loaded = ref(false);
  async function loadFilters() {
    if (loaded.value) return;
    try {
      const [typesRes, regionsRes, languagesRes] = await Promise.all([
        fetchMovieTypes(),
        fetchMovieRegions(),
        fetchMovieLanguages()
      ]);
      types.value = typesRes?.data || [];
      regions.value = regionsRes?.data || [];
      languages.value = languagesRes?.data || [];
      loaded.value = true;
    } catch (e) {
      console.error("加载筛选条件失败", e);
    }
  }
  return {
    types,
    regions,
    languages,
    loaded,
    loadFilters
  };
});
const _hoisted_1$1 = { class: "empty-state" };
const _hoisted_2$1 = { class: "empty-text" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "EmptyState",
  props: {
    message: { default: "暂无数据" }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        _cache[0] || (_cache[0] = createStaticVNode('<svg class="empty-icon" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-02a11d8c><circle cx="60" cy="60" r="50" stroke="#333" stroke-width="2" stroke-dasharray="6 4" data-v-02a11d8c></circle><path d="M42 55c0-2 1.5-3.5 3.5-3.5S49 53 49 55M71 55c0-2 1.5-3.5 3.5-3.5S78 53 78 55" stroke="#555" stroke-width="2.5" stroke-linecap="round" data-v-02a11d8c></path><path d="M45 75c4.5-4 12-6 15-6s10.5 2 15 6" stroke="#555" stroke-width="2.5" stroke-linecap="round" fill="none" data-v-02a11d8c></path><circle cx="95" cy="25" r="6" fill="#333" data-v-02a11d8c></circle><circle cx="25" cy="90" r="4" fill="#2a2a2a" data-v-02a11d8c></circle></svg>', 1)),
        createBaseVNode("p", _hoisted_2$1, toDisplayString(__props.message), 1)
      ]);
    };
  }
});
const EmptyState = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-02a11d8c"]]);
const _hoisted_1 = { class: "movie-list-page page-container" };
const _hoisted_2 = { key: 0 };
const _hoisted_3 = { key: 1 };
const _hoisted_4 = { class: "list-layout" };
const _hoisted_5 = { class: "filter-group" };
const _hoisted_6 = { class: "filter-group" };
const _hoisted_7 = ["value"];
const _hoisted_8 = { class: "filter-group" };
const _hoisted_9 = ["value"];
const _hoisted_10 = { class: "filter-group" };
const _hoisted_11 = ["value"];
const _hoisted_12 = { class: "filter-group" };
const _hoisted_13 = { class: "filter-group" };
const _hoisted_14 = { class: "filter-range" };
const _hoisted_15 = { class: "filter-group" };
const _hoisted_16 = ["value"];
const _hoisted_17 = ["value"];
const _hoisted_18 = { class: "list-main" };
const _hoisted_19 = { class: "list-header" };
const _hoisted_20 = { class: "list-total" };
const _hoisted_21 = {
  key: 0,
  class: "movie-grid"
};
const _hoisted_22 = {
  key: 1,
  class: "movie-grid"
};
const skeletonCount = 12;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MovieListView",
  setup(__props) {
    const route = useRoute();
    const router = useRouter();
    const filterStore = useFilterStore();
    useMovieStore();
    const breadcrumbs = [
      { label: "首页", to: "/" },
      { label: "电影列表" }
    ];
    const filters = reactive({
      keyword: "",
      type: "",
      language: "",
      region: "",
      year: "",
      minMinutes: "",
      maxMinutes: "",
      sortField: "douban_score",
      sortOrder: "desc",
      pageNum: 1,
      pageSize: 20
    });
    const loading = ref(false);
    const movies = ref([]);
    const total = ref(0);
    const totalPages = ref(0);
    const mobileFilterOpen = ref(false);
    const sortOptions = [
      { label: "豆瓣评分从高到低", sortField: "douban_score", sortOrder: "desc" },
      { label: "豆瓣评分从低到高", sortField: "douban_score", sortOrder: "asc" },
      { label: "上映时间从新到旧", sortField: "release_date", sortOrder: "desc" },
      { label: "上映时间从旧到新", sortField: "release_date", sortOrder: "asc" },
      { label: "电影时长从长到短", sortField: "minutes", sortOrder: "desc" },
      { label: "电影时长从短到长", sortField: "minutes", sortOrder: "asc" },
      { label: "片名 A-Z", sortField: "movie_name", sortOrder: "asc" }
    ];
    const initFromUrl = () => {
      const q = route.query;
      filters.keyword = q.keyword || "";
      filters.type = q.type || "";
      filters.language = q.language || "";
      filters.region = q.region || "";
      filters.year = q.year || "";
      filters.minMinutes = q.minMinutes || "";
      filters.maxMinutes = q.maxMinutes || "";
      filters.sortField = q.sortField || "douban_score";
      filters.sortOrder = q.sortOrder || "desc";
      filters.pageNum = parseInt(q.pageNum) || 1;
      filters.pageSize = parseInt(q.pageSize) || 20;
    };
    const syncToUrl = () => {
      const query = {};
      if (filters.keyword) query.keyword = filters.keyword;
      if (filters.type) query.type = filters.type;
      if (filters.language) query.language = filters.language;
      if (filters.region) query.region = filters.region;
      if (filters.year) query.year = filters.year;
      if (filters.minMinutes) query.minMinutes = filters.minMinutes;
      if (filters.maxMinutes) query.maxMinutes = filters.maxMinutes;
      if (filters.sortField !== "douban_score" || filters.sortOrder !== "desc") {
        query.sortField = filters.sortField;
        query.sortOrder = filters.sortOrder;
      }
      if (filters.pageNum > 1) query.pageNum = String(filters.pageNum);
      router.replace({ query });
    };
    const loadMovies = async () => {
      loading.value = true;
      try {
        const params = {
          pageNum: filters.pageNum,
          pageSize: filters.pageSize,
          sortField: filters.sortField,
          sortOrder: filters.sortOrder
        };
        if (filters.keyword) params.keyword = filters.keyword;
        if (filters.type) params.type = filters.type;
        if (filters.language) params.language = filters.language;
        if (filters.region) params.region = filters.region;
        if (filters.year) params.year = filters.year;
        if (filters.minMinutes) params.minMinutes = Number(filters.minMinutes);
        if (filters.maxMinutes) params.maxMinutes = Number(filters.maxMinutes);
        const res = await fetchMovieList(params);
        movies.value = res?.data || [];
        total.value = res?.total || 0;
        totalPages.value = Math.ceil(total.value / filters.pageSize) || 0;
        syncToUrl();
      } catch (e) {
        console.error("加载电影列表失败", e);
        movies.value = [];
      } finally {
        loading.value = false;
      }
    };
    const handleSearch = () => {
      filters.pageNum = 1;
      loadMovies();
    };
    const handleReset = () => {
      filters.keyword = "";
      filters.type = "";
      filters.language = "";
      filters.region = "";
      filters.year = "";
      filters.minMinutes = "";
      filters.maxMinutes = "";
      filters.sortField = "douban_score";
      filters.sortOrder = "desc";
      filters.pageNum = 1;
      loadMovies();
    };
    const handleSortChange = (e) => {
      const val = e.target.value;
      const opt = sortOptions[parseInt(val)];
      if (opt) {
        filters.sortField = opt.sortField;
        filters.sortOrder = opt.sortOrder;
        filters.pageNum = 1;
        loadMovies();
      }
    };
    const currentSortIndex = computed(() => {
      return sortOptions.findIndex((o) => o.sortField === filters.sortField && o.sortOrder === filters.sortOrder);
    });
    const handlePageChange = (page) => {
      filters.pageNum = page;
      loadMovies();
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    let debounceTimer = null;
    const handleKeywordInput = () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        filters.pageNum = 1;
        loadMovies();
      }, 500);
    };
    watch(() => route.query, () => {
      initFromUrl();
      loadMovies();
    }, { deep: false });
    onMounted(async () => {
      await filterStore.loadFilters();
      initFromUrl();
      loadMovies();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(Breadcrumb, { items: breadcrumbs }),
        createBaseVNode("div", _hoisted_1, [
          createBaseVNode("button", {
            class: "filter-toggle",
            onClick: _cache[0] || (_cache[0] = ($event) => mobileFilterOpen.value = !mobileFilterOpen.value)
          }, [
            _cache[8] || (_cache[8] = createBaseVNode("span", null, "🔍 筛选", -1)),
            mobileFilterOpen.value ? (openBlock(), createElementBlock("span", _hoisted_2, "▲")) : (openBlock(), createElementBlock("span", _hoisted_3, "▼"))
          ]),
          createBaseVNode("div", _hoisted_4, [
            createBaseVNode("aside", {
              class: normalizeClass(["filter-sidebar", { open: mobileFilterOpen.value }])
            }, [
              createBaseVNode("div", _hoisted_5, [
                _cache[9] || (_cache[9] = createBaseVNode("label", { class: "filter-label" }, "关键词", -1)),
                withDirectives(createBaseVNode("input", {
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => filters.keyword = $event),
                  type: "text",
                  placeholder: "电影名/演员/导演",
                  class: "filter-input",
                  onInput: handleKeywordInput
                }, null, 544), [
                  [vModelText, filters.keyword]
                ])
              ]),
              createBaseVNode("div", _hoisted_6, [
                _cache[11] || (_cache[11] = createBaseVNode("label", { class: "filter-label" }, "类型", -1)),
                withDirectives(createBaseVNode("select", {
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => filters.type = $event),
                  class: "filter-select"
                }, [
                  _cache[10] || (_cache[10] = createBaseVNode("option", { value: "" }, "全部", -1)),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(filterStore).types, (g) => {
                    return openBlock(), createElementBlock("option", {
                      key: g,
                      value: g
                    }, toDisplayString(g), 9, _hoisted_7);
                  }), 128))
                ], 512), [
                  [vModelSelect, filters.type]
                ])
              ]),
              createBaseVNode("div", _hoisted_8, [
                _cache[13] || (_cache[13] = createBaseVNode("label", { class: "filter-label" }, "语言", -1)),
                withDirectives(createBaseVNode("select", {
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => filters.language = $event),
                  class: "filter-select"
                }, [
                  _cache[12] || (_cache[12] = createBaseVNode("option", { value: "" }, "全部", -1)),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(filterStore).languages, (l) => {
                    return openBlock(), createElementBlock("option", {
                      key: l,
                      value: l
                    }, toDisplayString(l), 9, _hoisted_9);
                  }), 128))
                ], 512), [
                  [vModelSelect, filters.language]
                ])
              ]),
              createBaseVNode("div", _hoisted_10, [
                _cache[15] || (_cache[15] = createBaseVNode("label", { class: "filter-label" }, "地区", -1)),
                withDirectives(createBaseVNode("select", {
                  "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => filters.region = $event),
                  class: "filter-select"
                }, [
                  _cache[14] || (_cache[14] = createBaseVNode("option", { value: "" }, "全部", -1)),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(filterStore).regions, (r) => {
                    return openBlock(), createElementBlock("option", {
                      key: r,
                      value: r
                    }, toDisplayString(r), 9, _hoisted_11);
                  }), 128))
                ], 512), [
                  [vModelSelect, filters.region]
                ])
              ]),
              createBaseVNode("div", _hoisted_12, [
                _cache[16] || (_cache[16] = createBaseVNode("label", { class: "filter-label" }, "年份", -1)),
                withDirectives(createBaseVNode("input", {
                  "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => filters.year = $event),
                  type: "text",
                  placeholder: "如 2024",
                  class: "filter-input"
                }, null, 512), [
                  [vModelText, filters.year]
                ])
              ]),
              createBaseVNode("div", _hoisted_13, [
                _cache[18] || (_cache[18] = createBaseVNode("label", { class: "filter-label" }, "时长（分钟）", -1)),
                createBaseVNode("div", _hoisted_14, [
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => filters.minMinutes = $event),
                    type: "number",
                    placeholder: "最短",
                    class: "filter-input range-input"
                  }, null, 512), [
                    [vModelText, filters.minMinutes]
                  ]),
                  _cache[17] || (_cache[17] = createBaseVNode("span", { class: "range-sep" }, "-", -1)),
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => filters.maxMinutes = $event),
                    type: "number",
                    placeholder: "最长",
                    class: "filter-input range-input"
                  }, null, 512), [
                    [vModelText, filters.maxMinutes]
                  ])
                ])
              ]),
              createBaseVNode("div", _hoisted_15, [
                _cache[19] || (_cache[19] = createBaseVNode("label", { class: "filter-label" }, "排序", -1)),
                createBaseVNode("select", {
                  value: currentSortIndex.value,
                  class: "filter-select",
                  onChange: handleSortChange
                }, [
                  (openBlock(), createElementBlock(Fragment, null, renderList(sortOptions, (opt, idx) => {
                    return createBaseVNode("option", {
                      key: idx,
                      value: idx
                    }, toDisplayString(opt.label), 9, _hoisted_17);
                  }), 64))
                ], 40, _hoisted_16)
              ]),
              createBaseVNode("div", { class: "filter-actions" }, [
                createBaseVNode("button", {
                  class: "btn-primary filter-btn",
                  onClick: handleSearch
                }, "搜索"),
                createBaseVNode("button", {
                  class: "btn-outline filter-btn",
                  onClick: handleReset
                }, "重置")
              ])
            ], 2),
            createBaseVNode("main", _hoisted_18, [
              createBaseVNode("div", _hoisted_19, [
                createBaseVNode("span", _hoisted_20, "共找到 " + toDisplayString(total.value) + " 部电影", 1)
              ]),
              loading.value ? (openBlock(), createElementBlock("div", _hoisted_21, [
                (openBlock(), createElementBlock(Fragment, null, renderList(skeletonCount, (i) => {
                  return createBaseVNode("div", {
                    key: i,
                    class: "skeleton-card"
                  }, [..._cache[20] || (_cache[20] = [
                    createBaseVNode("div", { class: "skeleton skeleton-poster" }, null, -1),
                    createBaseVNode("div", { class: "skeleton-info" }, [
                      createBaseVNode("div", { class: "skeleton skeleton-title" }),
                      createBaseVNode("div", { class: "skeleton skeleton-text" })
                    ], -1)
                  ])]);
                }), 64))
              ])) : movies.value.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_22, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(movies.value, (movie) => {
                  return openBlock(), createBlock(MovieCard, {
                    key: movie.movieId,
                    movie
                  }, null, 8, ["movie"]);
                }), 128))
              ])) : (openBlock(), createBlock(EmptyState, {
                key: 2,
                message: "没有找到匹配的电影，试试调整筛选条件"
              })),
              totalPages.value > 1 ? (openBlock(), createBlock(Pagination, {
                key: 3,
                currentPage: filters.pageNum,
                totalPages: totalPages.value,
                total: total.value,
                "onUpdate:currentPage": handlePageChange
              }, null, 8, ["currentPage", "totalPages", "total"])) : createCommentVNode("", true)
            ])
          ])
        ])
      ], 64);
    };
  }
});
const MovieListView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d8ca046c"]]);
export {
  MovieListView as default
};
//# sourceMappingURL=MovieListView.js.map
