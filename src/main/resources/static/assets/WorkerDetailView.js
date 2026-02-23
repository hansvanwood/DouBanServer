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
    m as unref,
    o as onMounted,
    p as createBlock,
    r as ref,
    s as computed,
    t as toDisplayString,
    u as useRouter,
    w as watch,
    x as useRoute,
    z as normalizeStyle
} from "./index.js";
import {d as fetchMovieList, r as request} from "./movie.js";
import {f as formatDate, g as getInitial, h as hashColor} from "./parse.js";
import {B as Breadcrumb} from "./Breadcrumb.js";
import {M as MovieCard} from "./MovieCard.js";

const fetchWorkerDetail = (workerId) => request.get(`/workers/${workerId}`);
const _hoisted_1 = {
  key: 0,
  class: "detail-loading"
};
const _hoisted_2 = {
  key: 1,
  class: "detail-not-found"
};
const _hoisted_3 = {
  key: 2,
  class: "worker-detail-page page-container"
};
const _hoisted_4 = { class: "worker-hero" };
const _hoisted_5 = { class: "worker-info" };
const _hoisted_6 = { class: "worker-name-zh" };
const _hoisted_7 = {
  key: 0,
  class: "worker-name-en"
};
const _hoisted_8 = {
  key: 1,
  class: "worker-professions"
};
const _hoisted_9 = { class: "info-list" };
const _hoisted_10 = {
  key: 0,
  class: "info-row"
};
const _hoisted_11 = { class: "info-value" };
const _hoisted_12 = {
  key: 1,
  class: "info-row"
};
const _hoisted_13 = { class: "info-value" };
const _hoisted_14 = {
  key: 2,
  class: "info-row"
};
const _hoisted_15 = { class: "info-value" };
const _hoisted_16 = {
  key: 3,
  class: "info-row"
};
const _hoisted_17 = { class: "info-value" };
const _hoisted_18 = { class: "content-section" };
const _hoisted_19 = {
  key: 0,
  class: "bio-text"
};
const _hoisted_20 = {
  key: 1,
  class: "bio-empty"
};
const _hoisted_21 = { class: "content-section" };
const _hoisted_22 = { class: "related-header" };
const _hoisted_23 = {
  key: 0,
  class: "related-loading"
};
const _hoisted_24 = {
  key: 1,
  class: "related-grid"
};
const _hoisted_25 = {
  key: 2,
  class: "bio-empty"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WorkerDetailView",
  setup(__props) {
    const route = useRoute();
    const router = useRouter();
    const worker = ref(null);
    const loading = ref(true);
    const notFound = ref(false);
    const relatedMovies = ref([]);
    const relatedLoading = ref(false);
    const professions = computed(() => {
      if (!worker.value?.profession) return [];
      return worker.value.profession.split("/").map((p) => p.trim()).filter(Boolean);
    });
    const avatarColor = computed(() => hashColor(worker.value?.workerId || 0));
    const initial = computed(() => getInitial(worker.value?.nameZh || worker.value?.nameEn || ""));
    const breadcrumbs = computed(() => {
      const from = router.options.history.state?.back;
      const items = [{ label: "首页", to: "/" }];
      if (from && from.startsWith("/movies/")) {
        items.push({ label: "电影列表", to: "/movies" });
        items.push({ label: "电影详情", to: from });
      }
      items.push({ label: worker.value?.nameZh || "电影人" });
      return items;
    });
    const loadWorker = async () => {
      loading.value = true;
      notFound.value = false;
      try {
        const res = await fetchWorkerDetail(route.params.workerId);
        worker.value = res?.data || res;
        loadRelatedMovies();
      } catch (e) {
        if (e?.code === 404) {
          notFound.value = true;
        } else {
          console.error("加载电影人详情失败", e);
        }
      } finally {
        loading.value = false;
      }
    };
    const loadRelatedMovies = async () => {
      if (!worker.value) return;
      relatedLoading.value = true;
      try {
        const keyword = worker.value.nameZh || worker.value.workerName || "";
        if (!keyword) return;
        const res = await fetchMovieList({
          keyword,
          pageNum: 1,
          pageSize: 8,
          sortField: "douban_score",
          sortOrder: "desc"
        });
        relatedMovies.value = res?.data || [];
      } catch (e) {
        console.error("加载相关作品失败", e);
      } finally {
        relatedLoading.value = false;
      }
    };
    const goToAllMovies = () => {
      const keyword = worker.value?.nameZh || worker.value?.workerName || "";
      router.push({ path: "/movies", query: { keyword } });
    };
    onMounted(loadWorker);
    watch(() => route.params.workerId, () => {
      loadWorker();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(Breadcrumb, { items: breadcrumbs.value }, null, 8, ["items"]),
        loading.value ? (openBlock(), createElementBlock("div", _hoisted_1, [..._cache[1] || (_cache[1] = [
          createBaseVNode("div", { class: "spinner" }, null, -1)
        ])])) : notFound.value ? (openBlock(), createElementBlock("div", _hoisted_2, [
          _cache[2] || (_cache[2] = createBaseVNode("h2", null, "电影人不存在", -1)),
          _cache[3] || (_cache[3] = createBaseVNode("p", null, "该电影人可能已被删除或 ID 无效", -1)),
          createBaseVNode("button", {
            class: "btn-primary",
            onClick: _cache[0] || (_cache[0] = ($event) => unref(router).push("/movies"))
          }, "返回电影列表")
        ])) : worker.value ? (openBlock(), createElementBlock("div", _hoisted_3, [
          createBaseVNode("section", _hoisted_4, [
            createBaseVNode("div", {
              class: "worker-avatar",
              style: normalizeStyle({ background: avatarColor.value })
            }, toDisplayString(initial.value), 5),
            createBaseVNode("div", _hoisted_5, [
              createBaseVNode("h1", _hoisted_6, toDisplayString(worker.value.nameZh), 1),
              worker.value.nameEn ? (openBlock(), createElementBlock("p", _hoisted_7, toDisplayString(worker.value.nameEn), 1)) : createCommentVNode("", true),
              professions.value.length ? (openBlock(), createElementBlock("div", _hoisted_8, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(professions.value, (p) => {
                  return openBlock(), createElementBlock("span", {
                    key: p,
                    class: "tag-capsule"
                  }, toDisplayString(p), 1);
                }), 128))
              ])) : createCommentVNode("", true),
              createBaseVNode("div", _hoisted_9, [
                worker.value.gender ? (openBlock(), createElementBlock("div", _hoisted_10, [
                  _cache[4] || (_cache[4] = createBaseVNode("span", { class: "info-label" }, "性别", -1)),
                  createBaseVNode("span", _hoisted_11, toDisplayString(worker.value.gender), 1)
                ])) : createCommentVNode("", true),
                worker.value.constellatory ? (openBlock(), createElementBlock("div", _hoisted_12, [
                  _cache[5] || (_cache[5] = createBaseVNode("span", { class: "info-label" }, "星座", -1)),
                  createBaseVNode("span", _hoisted_13, toDisplayString(worker.value.constellatory), 1)
                ])) : createCommentVNode("", true),
                worker.value.birth ? (openBlock(), createElementBlock("div", _hoisted_14, [
                  _cache[6] || (_cache[6] = createBaseVNode("span", { class: "info-label" }, "出生日期", -1)),
                  createBaseVNode("span", _hoisted_15, toDisplayString(unref(formatDate)(worker.value.birth)), 1)
                ])) : createCommentVNode("", true),
                worker.value.birthplace ? (openBlock(), createElementBlock("div", _hoisted_16, [
                  _cache[7] || (_cache[7] = createBaseVNode("span", { class: "info-label" }, "出生地", -1)),
                  createBaseVNode("span", _hoisted_17, toDisplayString(worker.value.birthplace), 1)
                ])) : createCommentVNode("", true)
              ])
            ])
          ]),
          createBaseVNode("section", _hoisted_18, [
            _cache[8] || (_cache[8] = createBaseVNode("h2", { class: "section-title" }, "人物简介", -1)),
            worker.value.biography ? (openBlock(), createElementBlock("p", _hoisted_19, toDisplayString(worker.value.biography), 1)) : (openBlock(), createElementBlock("p", _hoisted_20, "暂无简介"))
          ]),
          createBaseVNode("section", _hoisted_21, [
            createBaseVNode("div", _hoisted_22, [
              _cache[9] || (_cache[9] = createBaseVNode("h2", { class: "section-title" }, "相关作品", -1)),
              relatedMovies.value.length > 0 ? (openBlock(), createElementBlock("button", {
                key: 0,
                class: "btn-outline btn-sm",
                onClick: goToAllMovies
              }, " 查看全部 → ")) : createCommentVNode("", true)
            ]),
            relatedLoading.value ? (openBlock(), createElementBlock("div", _hoisted_23, [..._cache[10] || (_cache[10] = [
              createBaseVNode("div", { class: "spinner" }, null, -1)
            ])])) : relatedMovies.value.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_24, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(relatedMovies.value, (movie) => {
                return openBlock(), createBlock(MovieCard, {
                  key: movie.movieId,
                  movie
                }, null, 8, ["movie"]);
              }), 128))
            ])) : (openBlock(), createElementBlock("p", _hoisted_25, "暂无相关作品"))
          ])
        ])) : createCommentVNode("", true)
      ], 64);
    };
  }
});
const WorkerDetailView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ada15945"]]);
export {
  WorkerDetailView as default
};
//# sourceMappingURL=WorkerDetailView.js.map
