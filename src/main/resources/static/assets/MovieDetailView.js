import {
    _ as _export_sfc,
    a as openBlock,
    A as resolveComponent,
    b as createBaseVNode,
    c as createElementBlock,
    d as defineComponent,
    e as renderList,
    F as Fragment,
    f as createTextVNode,
    g as createVNode,
    h as createCommentVNode,
    m as unref,
    n as normalizeClass,
    o as onMounted,
    p as createBlock,
    r as ref,
    s as computed,
    t as toDisplayString,
    u as useRouter,
    w as watch,
    x as useRoute,
    y as withCtx,
    z as normalizeStyle
} from "./index.js";
import {e as fetchMovieDetail, g as getPosterUrl, r as request} from "./movie.js";
import {f as formatDate, g as getInitial, h as hashColor, p as parseWorkerIds} from "./parse.js";
import {B as Breadcrumb} from "./Breadcrumb.js";
import {P as Pagination} from "./Pagination.js";

const fetchComments = (movieId, pageNum = 1, pageSize = 20) => request.get(`/comments/${movieId}`, { params: { pageNum, pageSize } });
const _hoisted_1$1 = {
  key: 0,
  viewBox: "0 0 24 24",
  fill: "currentColor",
  class: "star-icon star-full"
};
const _hoisted_2$1 = {
  key: 1,
  viewBox: "0 0 24 24",
  class: "star-icon star-half"
};
const _hoisted_3$1 = ["id"];
const _hoisted_4$1 = ["fill"];
const _hoisted_5$1 = {
  key: 2,
  viewBox: "0 0 24 24",
  fill: "currentColor",
  class: "star-icon star-empty"
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "StarRating",
  props: {
    score: {},
    size: { default: "md" },
    max: { default: 10 }
  },
  setup(__props) {
    const props = __props;
    const starRating = computed(() => {
      return props.max === 5 ? props.score : props.score / 2;
    });
    const stars = computed(() => {
      const rating = starRating.value;
      const result = [];
      for (let i = 1; i <= 5; i++) {
        if (rating >= i) {
          result.push("full");
        } else if (rating >= i - 0.5) {
          result.push("half");
        } else {
          result.push("empty");
        }
      }
      return result;
    });
    const sizeClass = computed(() => `star-${props.size}`);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["star-rating", sizeClass.value])
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(stars.value, (state, index) => {
          return openBlock(), createElementBlock("span", {
            key: index,
            class: "star-item"
          }, [
            state === "full" ? (openBlock(), createElementBlock("svg", _hoisted_1$1, [..._cache[0] || (_cache[0] = [
              createBaseVNode("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }, null, -1)
            ])])) : state === "half" ? (openBlock(), createElementBlock("svg", _hoisted_2$1, [
              createBaseVNode("defs", null, [
                createBaseVNode("linearGradient", {
                  id: "half-grad-" + index
                }, [..._cache[1] || (_cache[1] = [
                  createBaseVNode("stop", {
                    offset: "50%",
                    "stop-color": "var(--color-gold)"
                  }, null, -1),
                  createBaseVNode("stop", {
                    offset: "50%",
                    "stop-color": "#444"
                  }, null, -1)
                ])], 8, _hoisted_3$1)
              ]),
              createBaseVNode("path", {
                fill: `url(#half-grad-${index})`,
                d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              }, null, 8, _hoisted_4$1)
            ])) : (openBlock(), createElementBlock("svg", _hoisted_5$1, [..._cache[2] || (_cache[2] = [
              createBaseVNode("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }, null, -1)
            ])]))
          ]);
        }), 128))
      ], 2);
    };
  }
});
const StarRating = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-e3974d73"]]);
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
  class: "movie-detail-page"
};
const _hoisted_4 = { class: "hero-section" };
const _hoisted_5 = { class: "hero-bg" };
const _hoisted_6 = ["src"];
const _hoisted_7 = { class: "hero-content page-container" };
const _hoisted_8 = { class: "hero-poster" };
const _hoisted_9 = ["src", "alt"];
const _hoisted_10 = {
  key: 1,
  class: "poster-placeholder"
};
const _hoisted_11 = { class: "hero-info" };
const _hoisted_12 = { class: "movie-title" };
const _hoisted_13 = {
  key: 0,
  class: "movie-alias"
};
const _hoisted_14 = {
  key: 1,
  class: "rating-block"
};
const _hoisted_15 = { class: "rating-score" };
const _hoisted_16 = {
  key: 0,
  class: "rating-votes"
};
const _hoisted_17 = { class: "info-list" };
const _hoisted_18 = {
  key: 0,
  class: "info-row"
};
const _hoisted_19 = { class: "info-value" };
const _hoisted_20 = { key: 0 };
const _hoisted_21 = {
  key: 1,
  class: "info-row"
};
const _hoisted_22 = { class: "info-value" };
const _hoisted_23 = { key: 0 };
const _hoisted_24 = {
  key: 2,
  class: "info-row"
};
const _hoisted_25 = { class: "info-value" };
const _hoisted_26 = {
  key: 3,
  class: "info-row"
};
const _hoisted_27 = { class: "info-value" };
const _hoisted_28 = {
  key: 4,
  class: "info-row"
};
const _hoisted_29 = { class: "info-value" };
const _hoisted_30 = {
  key: 5,
  class: "info-row"
};
const _hoisted_31 = { class: "info-value" };
const _hoisted_32 = {
  key: 6,
  class: "info-row"
};
const _hoisted_33 = { class: "info-value" };
const _hoisted_34 = {
  key: 7,
  class: "info-row"
};
const _hoisted_35 = { class: "info-value" };
const _hoisted_36 = ["href"];
const _hoisted_37 = {
  key: 8,
  class: "info-row"
};
const _hoisted_38 = { class: "info-value" };
const _hoisted_39 = ["href"];
const _hoisted_40 = {
  key: 2,
  class: "tags-cloud"
};
const _hoisted_41 = {
  key: 0,
  class: "content-section page-container"
};
const _hoisted_42 = { class: "description-text" };
const _hoisted_43 = {
  key: 1,
  class: "content-section page-container"
};
const _hoisted_44 = { class: "cast-scroll" };
const _hoisted_45 = { class: "cast-name" };
const _hoisted_46 = { class: "cast-name" };
const _hoisted_47 = {
  id: "comments-section",
  class: "content-section page-container"
};
const _hoisted_48 = { class: "section-title" };
const _hoisted_49 = {
  key: 0,
  class: "comment-loading"
};
const _hoisted_50 = {
  key: 1,
  class: "comment-empty"
};
const _hoisted_51 = {
  key: 2,
  class: "comment-list"
};
const _hoisted_52 = { class: "comment-body" };
const _hoisted_53 = { class: "comment-header" };
const _hoisted_54 = { class: "comment-nick" };
const _hoisted_55 = { class: "comment-content" };
const _hoisted_56 = { class: "comment-footer" };
const _hoisted_57 = { class: "comment-likes" };
const _hoisted_58 = { class: "comment-time" };
const commentPageSize = 20;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MovieDetailView",
  setup(__props) {
    const route = useRoute();
    const router = useRouter();
    const movie = ref(null);
    const loading = ref(true);
    const notFound = ref(false);
    const comments = ref([]);
    const commentPage = ref(1);
    const commentTotal = ref(0);
    const commentTotalPages = ref(0);
    const commentLoading = ref(false);
    const actorsExpanded = ref(false);
    const directors = computed(() => parseWorkerIds(movie.value?.directorIds));
    const actors = computed(() => parseWorkerIds(movie.value?.actorIds));
    const displayActors = computed(() => actorsExpanded.value ? actors.value : actors.value.slice(0, 6));
    const tags = computed(() => {
      if (!movie.value?.tags) return [];
      return movie.value.tags.split("/").map((t) => t.trim()).filter(Boolean);
    });
    const breadcrumbs = computed(() => [
      { label: "首页", to: "/" },
      { label: "电影列表", to: "/movies" },
      { label: movie.value?.movieName || "电影详情" }
    ]);
    const posterUrl = computed(() => getPosterUrl(movie.value?.cover));
    const bgUrl = computed(() => getPosterUrl(movie.value?.cover));
    const loadDetail = async () => {
      loading.value = true;
      notFound.value = false;
      try {
        const res = await fetchMovieDetail(route.params.movieId);
        movie.value = res?.data || res;
        commentTotal.value = movie.value?.commentTotal || 0;
        commentTotalPages.value = Math.ceil(commentTotal.value / commentPageSize) || 0;
        comments.value = movie.value?.comments || [];
      } catch (e) {
        if (e?.code === 404) {
          notFound.value = true;
        } else {
          console.error("加载电影详情失败", e);
        }
      } finally {
        loading.value = false;
      }
    };
    const loadComments = async () => {
      if (!movie.value?.movieId) return;
      commentLoading.value = true;
      try {
        const res = await fetchComments(movie.value.movieId, commentPage.value, commentPageSize);
        comments.value = res?.data || [];
        commentTotal.value = res?.total || commentTotal.value;
        commentTotalPages.value = Math.ceil(commentTotal.value / commentPageSize) || 0;
      } catch (e) {
        console.error("加载评论失败", e);
      } finally {
        commentLoading.value = false;
      }
    };
    const handleCommentPageChange = (page) => {
      commentPage.value = page;
      loadComments();
      const el = document.getElementById("comments-section");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    };
    onMounted(loadDetail);
    watch(() => route.params.movieId, () => {
      commentPage.value = 1;
      loadDetail();
    });
    return (_ctx, _cache) => {
      const _component_router_link = resolveComponent("router-link");
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(Breadcrumb, { items: breadcrumbs.value }, null, 8, ["items"]),
        loading.value ? (openBlock(), createElementBlock("div", _hoisted_1, [..._cache[2] || (_cache[2] = [
          createBaseVNode("div", { class: "spinner" }, null, -1)
        ])])) : notFound.value ? (openBlock(), createElementBlock("div", _hoisted_2, [
          _cache[3] || (_cache[3] = createBaseVNode("h2", null, "电影不存在", -1)),
          _cache[4] || (_cache[4] = createBaseVNode("p", null, "该电影可能已被删除或 ID 无效", -1)),
          createBaseVNode("button", {
            class: "btn-primary",
            onClick: _cache[0] || (_cache[0] = ($event) => unref(router).push("/movies"))
          }, "返回电影列表")
        ])) : movie.value ? (openBlock(), createElementBlock("div", _hoisted_3, [
          createBaseVNode("section", _hoisted_4, [
            createBaseVNode("div", _hoisted_5, [
              bgUrl.value ? (openBlock(), createElementBlock("img", {
                key: 0,
                src: bgUrl.value,
                alt: "",
                class: "hero-bg-img"
              }, null, 8, _hoisted_6)) : createCommentVNode("", true),
              _cache[5] || (_cache[5] = createBaseVNode("div", { class: "hero-overlay" }, null, -1))
            ]),
            createBaseVNode("div", _hoisted_7, [
              createBaseVNode("div", _hoisted_8, [
                posterUrl.value ? (openBlock(), createElementBlock("img", {
                  key: 0,
                  src: posterUrl.value,
                  alt: movie.value.movieName
                }, null, 8, _hoisted_9)) : (openBlock(), createElementBlock("div", _hoisted_10, [..._cache[6] || (_cache[6] = [
                  createBaseVNode("span", null, "🎬", -1)
                ])]))
              ]),
              createBaseVNode("div", _hoisted_11, [
                createBaseVNode("h1", _hoisted_12, toDisplayString(movie.value.movieName), 1),
                movie.value.movieAlias ? (openBlock(), createElementBlock("p", _hoisted_13, toDisplayString(movie.value.movieAlias), 1)) : createCommentVNode("", true),
                movie.value.doubanScore ? (openBlock(), createElementBlock("div", _hoisted_14, [
                  createBaseVNode("span", _hoisted_15, toDisplayString(movie.value.doubanScore), 1),
                  createVNode(StarRating, {
                    score: movie.value.doubanScore,
                    size: "lg"
                  }, null, 8, ["score"]),
                  movie.value.doubanVotes ? (openBlock(), createElementBlock("span", _hoisted_16, toDisplayString(movie.value.doubanVotes) + " 人评价", 1)) : createCommentVNode("", true)
                ])) : createCommentVNode("", true),
                createBaseVNode("div", _hoisted_17, [
                  directors.value.length ? (openBlock(), createElementBlock("div", _hoisted_18, [
                    _cache[7] || (_cache[7] = createBaseVNode("span", { class: "info-label" }, "导演", -1)),
                    createBaseVNode("span", _hoisted_19, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(directors.value, (d, i) => {
                        return openBlock(), createElementBlock(Fragment, {
                          key: d.id
                        }, [
                          createVNode(_component_router_link, {
                            to: `/workers/${d.id}`,
                            class: "worker-link"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(d.name), 1)
                            ]),
                            _: 2
                          }, 1032, ["to"]),
                          i < directors.value.length - 1 ? (openBlock(), createElementBlock("span", _hoisted_20, " / ")) : createCommentVNode("", true)
                        ], 64);
                      }), 128))
                    ])
                  ])) : createCommentVNode("", true),
                  actors.value.length ? (openBlock(), createElementBlock("div", _hoisted_21, [
                    _cache[8] || (_cache[8] = createBaseVNode("span", { class: "info-label" }, "主演", -1)),
                    createBaseVNode("span", _hoisted_22, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(displayActors.value, (a, i) => {
                        return openBlock(), createElementBlock(Fragment, {
                          key: a.id
                        }, [
                          createVNode(_component_router_link, {
                            to: `/workers/${a.id}`,
                            class: "worker-link"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(a.name), 1)
                            ]),
                            _: 2
                          }, 1032, ["to"]),
                          i < displayActors.value.length - 1 ? (openBlock(), createElementBlock("span", _hoisted_23, " / ")) : createCommentVNode("", true)
                        ], 64);
                      }), 128)),
                      actors.value.length > 6 && !actorsExpanded.value ? (openBlock(), createElementBlock("button", {
                        key: 0,
                        class: "expand-btn",
                        onClick: _cache[1] || (_cache[1] = ($event) => actorsExpanded.value = true)
                      }, " 展开全部 (" + toDisplayString(actors.value.length) + "人) ", 1)) : createCommentVNode("", true)
                    ])
                  ])) : createCommentVNode("", true),
                  movie.value.type ? (openBlock(), createElementBlock("div", _hoisted_24, [
                    _cache[9] || (_cache[9] = createBaseVNode("span", { class: "info-label" }, "类型", -1)),
                    createBaseVNode("span", _hoisted_25, toDisplayString(movie.value.type), 1)
                  ])) : createCommentVNode("", true),
                  movie.value.languages ? (openBlock(), createElementBlock("div", _hoisted_26, [
                    _cache[10] || (_cache[10] = createBaseVNode("span", { class: "info-label" }, "语言", -1)),
                    createBaseVNode("span", _hoisted_27, toDisplayString(movie.value.languages), 1)
                  ])) : createCommentVNode("", true),
                  movie.value.regions ? (openBlock(), createElementBlock("div", _hoisted_28, [
                    _cache[11] || (_cache[11] = createBaseVNode("span", { class: "info-label" }, "地区", -1)),
                    createBaseVNode("span", _hoisted_29, toDisplayString(movie.value.regions), 1)
                  ])) : createCommentVNode("", true),
                  movie.value.releaseDate ? (openBlock(), createElementBlock("div", _hoisted_30, [
                    _cache[12] || (_cache[12] = createBaseVNode("span", { class: "info-label" }, "上映", -1)),
                    createBaseVNode("span", _hoisted_31, toDisplayString(unref(formatDate)(movie.value.releaseDate)), 1)
                  ])) : createCommentVNode("", true),
                  movie.value.minutes ? (openBlock(), createElementBlock("div", _hoisted_32, [
                    _cache[13] || (_cache[13] = createBaseVNode("span", { class: "info-label" }, "片长", -1)),
                    createBaseVNode("span", _hoisted_33, toDisplayString(movie.value.minutes) + " 分钟", 1)
                  ])) : createCommentVNode("", true),
                  movie.value.imdbId ? (openBlock(), createElementBlock("div", _hoisted_34, [
                    _cache[14] || (_cache[14] = createBaseVNode("span", { class: "info-label" }, "IMDb", -1)),
                    createBaseVNode("span", _hoisted_35, [
                      createBaseVNode("a", {
                        href: `https://www.imdb.com/title/${movie.value.imdbId}`,
                        target: "_blank",
                        rel: "noopener",
                        class: "external-link"
                      }, toDisplayString(movie.value.imdbId) + " ↗ ", 9, _hoisted_36)
                    ])
                  ])) : createCommentVNode("", true),
                  movie.value.officialSite ? (openBlock(), createElementBlock("div", _hoisted_37, [
                    _cache[15] || (_cache[15] = createBaseVNode("span", { class: "info-label" }, "官网", -1)),
                    createBaseVNode("span", _hoisted_38, [
                      createBaseVNode("a", {
                        href: movie.value.officialSite,
                        target: "_blank",
                        rel: "noopener",
                        class: "external-link"
                      }, " 访问官网 ↗ ", 8, _hoisted_39)
                    ])
                  ])) : createCommentVNode("", true)
                ]),
                tags.value.length ? (openBlock(), createElementBlock("div", _hoisted_40, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(tags.value, (tag) => {
                    return openBlock(), createElementBlock("span", {
                      key: tag,
                      class: "tag-capsule"
                    }, toDisplayString(tag), 1);
                  }), 128))
                ])) : createCommentVNode("", true)
              ])
            ])
          ]),
          movie.value.description ? (openBlock(), createElementBlock("section", _hoisted_41, [
            _cache[16] || (_cache[16] = createBaseVNode("h2", { class: "section-title" }, "剧情简介", -1)),
            createBaseVNode("p", _hoisted_42, toDisplayString(movie.value.description), 1)
          ])) : createCommentVNode("", true),
          directors.value.length || actors.value.length ? (openBlock(), createElementBlock("section", _hoisted_43, [
            _cache[19] || (_cache[19] = createBaseVNode("h2", { class: "section-title" }, "演职人员", -1)),
            createBaseVNode("div", _hoisted_44, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(directors.value, (d) => {
                return openBlock(), createBlock(_component_router_link, {
                  key: "d" + d.id,
                  to: `/workers/${d.id}`,
                  class: "cast-card"
                }, {
                  default: withCtx(() => [
                    createBaseVNode("div", {
                      class: "cast-avatar",
                      style: normalizeStyle({ background: unref(hashColor)(d.id) })
                    }, toDisplayString(unref(getInitial)(d.name)), 5),
                    createBaseVNode("div", _hoisted_45, toDisplayString(d.name), 1),
                    _cache[17] || (_cache[17] = createBaseVNode("div", { class: "cast-role" }, "导演", -1))
                  ]),
                  _: 2
                }, 1032, ["to"]);
              }), 128)),
              (openBlock(true), createElementBlock(Fragment, null, renderList(actors.value, (a) => {
                return openBlock(), createBlock(_component_router_link, {
                  key: "a" + a.id,
                  to: `/workers/${a.id}`,
                  class: "cast-card"
                }, {
                  default: withCtx(() => [
                    createBaseVNode("div", {
                      class: "cast-avatar",
                      style: normalizeStyle({ background: unref(hashColor)(a.id) })
                    }, toDisplayString(unref(getInitial)(a.name)), 5),
                    createBaseVNode("div", _hoisted_46, toDisplayString(a.name), 1),
                    _cache[18] || (_cache[18] = createBaseVNode("div", { class: "cast-role" }, "演员", -1))
                  ]),
                  _: 2
                }, 1032, ["to"]);
              }), 128))
            ])
          ])) : createCommentVNode("", true),
          createBaseVNode("section", _hoisted_47, [
            createBaseVNode("h2", _hoisted_48, "用户评论（共 " + toDisplayString(commentTotal.value) + " 条）", 1),
            commentLoading.value ? (openBlock(), createElementBlock("div", _hoisted_49, [..._cache[20] || (_cache[20] = [
              createBaseVNode("div", { class: "spinner" }, null, -1)
            ])])) : comments.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_50, [..._cache[21] || (_cache[21] = [
              createBaseVNode("p", { class: "empty-hint" }, "暂无评论", -1)
            ])])) : (openBlock(), createElementBlock("div", _hoisted_51, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(comments.value, (c) => {
                return openBlock(), createElementBlock("div", {
                  key: c.commentId,
                  class: "comment-card"
                }, [
                  createBaseVNode("div", {
                    class: "comment-avatar",
                    style: normalizeStyle({ background: unref(hashColor)(c.commentId || 0) })
                  }, toDisplayString(c.userNickname ? unref(getInitial)(c.userNickname) : "?"), 5),
                  createBaseVNode("div", _hoisted_52, [
                    createBaseVNode("div", _hoisted_53, [
                      createBaseVNode("span", _hoisted_54, toDisplayString(c.userNickname || "匿名用户"), 1),
                      c.rating ? (openBlock(), createBlock(StarRating, {
                        key: 0,
                        score: c.rating,
                        max: 5,
                        size: "sm"
                      }, null, 8, ["score"])) : createCommentVNode("", true)
                    ]),
                    createBaseVNode("p", _hoisted_55, toDisplayString(c.commentContent), 1),
                    createBaseVNode("div", _hoisted_56, [
                      createBaseVNode("span", _hoisted_57, "❤️ " + toDisplayString(c.likeCount || 0), 1),
                      createBaseVNode("span", _hoisted_58, toDisplayString(unref(formatDate)(c.commentTime)), 1)
                    ])
                  ])
                ]);
              }), 128))
            ])),
            commentTotalPages.value > 1 ? (openBlock(), createBlock(Pagination, {
              key: 3,
              currentPage: commentPage.value,
              totalPages: commentTotalPages.value,
              total: commentTotal.value,
              "onUpdate:currentPage": handleCommentPageChange
            }, null, 8, ["currentPage", "totalPages", "total"])) : createCommentVNode("", true)
          ])
        ])) : createCommentVNode("", true)
      ], 64);
    };
  }
});
const MovieDetailView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-095b1214"]]);
export {
  MovieDetailView as default
};
//# sourceMappingURL=MovieDetailView.js.map
