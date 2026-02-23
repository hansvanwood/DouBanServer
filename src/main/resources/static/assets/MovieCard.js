import {g as getPosterUrl} from "./movie.js";
import {
    _ as _export_sfc,
    a as openBlock,
    A as resolveComponent,
    b as createBaseVNode,
    c as createElementBlock,
    d as defineComponent,
    e as renderList,
    F as Fragment,
    h as createCommentVNode,
    p as createBlock,
    r as ref,
    s as computed,
    t as toDisplayString,
    y as withCtx
} from "./index.js";

const _hoisted_1 = { class: "card-poster" };
const _hoisted_2 = ["src", "alt"];
const _hoisted_3 = {
  key: 1,
  class: "poster-placeholder"
};
const _hoisted_4 = {
  key: 2,
  class: "card-score"
};
const _hoisted_5 = { class: "score-value" };
const _hoisted_6 = { class: "card-info" };
const _hoisted_7 = ["title"];
const _hoisted_8 = {
  key: 0,
  class: "card-actors"
};
const _hoisted_9 = { class: "card-meta" };
const _hoisted_10 = {
  key: 0,
  class: "card-types"
};
const _hoisted_11 = {
  key: 1,
  class: "card-year"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MovieCard",
  props: {
    movie: {}
  },
  setup(__props) {
    const props = __props;
    const imgError = ref(false);
    const posterUrl = computed(() => {
      if (!props.movie?.cover || imgError.value) return "";
      return getPosterUrl(props.movie.cover);
    });
    const actors = computed(() => {
      if (!props.movie?.actors) return "";
      return props.movie.actors.split("/").slice(0, 3).map((s) => s.trim()).join(" / ");
    });
    const types = computed(() => {
      if (!props.movie?.type) return [];
      return props.movie.type.split("/").map((g) => g.trim()).filter(Boolean);
    });
    const onImgError = () => {
      imgError.value = true;
    };
    return (_ctx, _cache) => {
      const _component_router_link = resolveComponent("router-link");
      return openBlock(), createBlock(_component_router_link, {
        to: `/movies/${__props.movie.movieId}`,
        class: "movie-card"
      }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1, [
            posterUrl.value ? (openBlock(), createElementBlock("img", {
              key: 0,
              src: posterUrl.value,
              alt: __props.movie.movieName,
              loading: "lazy",
              onError: onImgError
            }, null, 40, _hoisted_2)) : (openBlock(), createElementBlock("div", _hoisted_3, [..._cache[0] || (_cache[0] = [
              createBaseVNode("span", { class: "placeholder-icon" }, "🎬", -1)
            ])])),
            __props.movie.doubanScore ? (openBlock(), createElementBlock("div", _hoisted_4, [
              _cache[1] || (_cache[1] = createBaseVNode("span", { class: "score-star" }, "⭐", -1)),
              createBaseVNode("span", _hoisted_5, toDisplayString(__props.movie.doubanScore), 1)
            ])) : createCommentVNode("", true)
          ]),
          createBaseVNode("div", _hoisted_6, [
            createBaseVNode("h3", {
              class: "card-title",
              title: __props.movie.movieName
            }, toDisplayString(__props.movie.movieName), 9, _hoisted_7),
            actors.value ? (openBlock(), createElementBlock("p", _hoisted_8, toDisplayString(actors.value), 1)) : createCommentVNode("", true),
            createBaseVNode("div", _hoisted_9, [
              types.value.length ? (openBlock(), createElementBlock("div", _hoisted_10, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(types.value.slice(0, 2), (g) => {
                  return openBlock(), createElementBlock("span", {
                    key: g,
                    class: "tag-capsule"
                  }, toDisplayString(g), 1);
                }), 128))
              ])) : createCommentVNode("", true),
              __props.movie.year ? (openBlock(), createElementBlock("span", _hoisted_11, toDisplayString(__props.movie.year), 1)) : createCommentVNode("", true)
            ])
          ])
        ]),
        _: 1
      }, 8, ["to"]);
    };
  }
});
const MovieCard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-dde3f4ab"]]);
export {
  MovieCard as M
};
//# sourceMappingURL=MovieCard.js.map
