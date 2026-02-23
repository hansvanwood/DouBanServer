import {
    _ as _export_sfc,
    a as openBlock,
    b as createBaseVNode,
    c as createElementBlock,
    d as defineComponent,
    e as renderList,
    F as Fragment,
    f as createTextVNode,
    g as createVNode,
    h as createCommentVNode,
    n as normalizeClass,
    o as onMounted,
    r as ref,
    t as toDisplayString,
    u as useRouter,
    w as watch
} from "./index.js";
import {f as fetchMovieStats} from "./movie.js";
import {u as useMovieStore} from "./movieStore.js";

const _hoisted_1$1 = { class: "count-up" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "CountUp",
  props: {
    target: {}
  },
  setup(__props) {
    const props = __props;
    const current = ref(0);
    const animate = () => {
      const startTime = performance.now();
      const duration = 1500;
      const step = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        current.value = Math.floor(eased * props.target);
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          current.value = props.target;
        }
      };
      requestAnimationFrame(step);
    };
    onMounted(() => {
      if (props.target > 0) animate();
    });
    watch(() => props.target, (newVal) => {
      if (newVal > 0) animate();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("span", _hoisted_1$1, toDisplayString(current.value.toLocaleString()), 1);
    };
  }
});
const CountUp = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-d44a52bb"]]);
const _hoisted_1 = { class: "home-page" };
const _hoisted_2 = { class: "hero-section" };
const _hoisted_3 = { class: "hero-bg" };
const _hoisted_4 = { class: "hero-particles" };
const _hoisted_5 = { class: "hero-content" };
const _hoisted_6 = {
  key: 0,
  class: "hero-subtitle"
};
const _hoisted_7 = {
  key: 1,
  class: "hero-subtitle"
};
const _hoisted_8 = {
  key: 0,
  class: "stats-section"
};
const _hoisted_9 = { class: "stats-grid" };
const _hoisted_10 = { class: "stat-card" };
const _hoisted_11 = { class: "stat-number" };
const _hoisted_12 = { class: "stat-card" };
const _hoisted_13 = { class: "stat-number" };
const _hoisted_14 = { class: "stat-card" };
const _hoisted_15 = { class: "stat-number" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "HomeView",
  setup(__props) {
    const router = useRouter();
    const movieStore = useMovieStore();
    const loaded = ref(false);
    const movieCount = ref(0);
    const commentCount = ref(0);
    const workerCount = ref(0);
    onMounted(async () => {
      try {
        if (movieStore.stats) {
          movieCount.value = movieStore.stats.movieCount;
          commentCount.value = movieStore.stats.commentCount;
          workerCount.value = movieStore.stats.workerCount;
          loaded.value = true;
          return;
        }
        const res = await fetchMovieStats();
        const data = res?.data || res;
        movieCount.value = data.movieCount || 0;
        commentCount.value = data.commentCount || 0;
        workerCount.value = data.workerCount || 0;
        movieStore.setStats({ movieCount: movieCount.value, commentCount: commentCount.value, workerCount: workerCount.value });
        loaded.value = true;
      } catch (e) {
        console.error("获取统计数据失败", e);
        loaded.value = true;
      }
    });
    const goToMovies = () => router.push("/movies");
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("section", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", _hoisted_4, [
              (openBlock(), createElementBlock(Fragment, null, renderList(6, (i) => {
                return createBaseVNode("span", {
                  key: i,
                  class: normalizeClass("particle p" + i)
                }, null, 2);
              }), 64))
            ])
          ]),
          createBaseVNode("div", _hoisted_5, [
            _cache[3] || (_cache[3] = createBaseVNode("h1", { class: "hero-title" }, [
              createBaseVNode("span", { class: "title-line" }, "探索"),
              createBaseVNode("span", { class: "title-line accent" }, "光影世界")
            ], -1)),
            loaded.value ? (openBlock(), createElementBlock("p", _hoisted_6, [
              _cache[0] || (_cache[0] = createTextVNode(" 收录 ", -1)),
              createBaseVNode("strong", null, toDisplayString(movieCount.value.toLocaleString()), 1),
              _cache[1] || (_cache[1] = createTextVNode(" 部电影，", -1)),
              createBaseVNode("strong", null, toDisplayString(commentCount.value.toLocaleString()), 1),
              _cache[2] || (_cache[2] = createTextVNode(" 条真实评论 ", -1))
            ])) : (openBlock(), createElementBlock("p", _hoisted_7, "加载中..."))
          ])
        ]),
        loaded.value ? (openBlock(), createElementBlock("section", _hoisted_8, [
          createBaseVNode("div", _hoisted_9, [
            createBaseVNode("div", _hoisted_10, [
              _cache[4] || (_cache[4] = createBaseVNode("div", { class: "stat-icon" }, "🎬", -1)),
              createBaseVNode("div", _hoisted_11, [
                createVNode(CountUp, { target: movieCount.value }, null, 8, ["target"])
              ]),
              _cache[5] || (_cache[5] = createBaseVNode("div", { class: "stat-label" }, "部电影", -1))
            ]),
            createBaseVNode("div", _hoisted_12, [
              _cache[6] || (_cache[6] = createBaseVNode("div", { class: "stat-icon" }, "💬", -1)),
              createBaseVNode("div", _hoisted_13, [
                createVNode(CountUp, { target: commentCount.value }, null, 8, ["target"])
              ]),
              _cache[7] || (_cache[7] = createBaseVNode("div", { class: "stat-label" }, "条评论", -1))
            ]),
            createBaseVNode("div", _hoisted_14, [
              _cache[8] || (_cache[8] = createBaseVNode("div", { class: "stat-icon" }, "🎭", -1)),
              createBaseVNode("div", _hoisted_15, [
                createVNode(CountUp, { target: workerCount.value }, null, 8, ["target"])
              ]),
              _cache[9] || (_cache[9] = createBaseVNode("div", { class: "stat-label" }, "位电影人", -1))
            ])
          ])
        ])) : createCommentVNode("", true),
        createBaseVNode("section", { class: "cta-section" }, [
          createBaseVNode("button", {
            class: "btn-cta",
            onClick: goToMovies
          }, [..._cache[10] || (_cache[10] = [
            createBaseVNode("span", null, "探索电影", -1),
            createBaseVNode("svg", {
              width: "20",
              height: "20",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2",
              "stroke-linecap": "round",
              "stroke-linejoin": "round"
            }, [
              createBaseVNode("path", { d: "M5 12h14M12 5l7 7-7 7" })
            ], -1)
          ])])
        ]),
        _cache[11] || (_cache[11] = createBaseVNode("footer", { class: "home-footer" }, [
          createBaseVNode("p", null, "© 2026 豆瓣酱. 全栈技术展示.")
        ], -1))
      ]);
    };
  }
});
const HomeView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b2d029f3"]]);
export {
  HomeView as default
};
//# sourceMappingURL=HomeView.js.map
