import {
    _ as _export_sfc,
    a as openBlock,
    b as createBaseVNode,
    B as withKeys,
    c as createElementBlock,
    d as defineComponent,
    e as renderList,
    F as Fragment,
    h as createCommentVNode,
    k as withDirectives,
    n as normalizeClass,
    r as ref,
    s as computed,
    t as toDisplayString,
    v as vModelText,
    w as watch
} from "./index.js";

const _hoisted_1 = {
  key: 0,
  class: "pagination"
};
const _hoisted_2 = ["disabled"];
const _hoisted_3 = {
  key: 0,
  class: "page-ellipsis"
};
const _hoisted_4 = ["onClick"];
const _hoisted_5 = ["disabled"];
const _hoisted_6 = { class: "page-info" };
const _hoisted_7 = { class: "page-jump" };
const _hoisted_8 = ["max"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Pagination",
  props: {
    currentPage: {},
    totalPages: {},
    total: {}
  },
  emits: ["update:currentPage"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const jumpPage = ref("");
    const pages = computed(() => {
      const total = props.totalPages;
      const current = props.currentPage;
      if (total <= 7) {
        return Array.from({ length: total }, (_, i) => i + 1);
      }
      const result = [1];
      if (current > 3) result.push(-1);
      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);
      for (let i = start; i <= end; i++) result.push(i);
      if (current < total - 2) result.push(-1);
      result.push(total);
      return result;
    });
    const goToPage = (page) => {
      if (page < 1 || page > props.totalPages || page === props.currentPage) return;
      emit("update:currentPage", page);
    };
    const handleJump = () => {
      const page = parseInt(jumpPage.value);
      if (!isNaN(page) && page >= 1 && page <= props.totalPages) {
        goToPage(page);
      }
      jumpPage.value = "";
    };
    watch(() => props.currentPage, () => {
      jumpPage.value = "";
    });
    return (_ctx, _cache) => {
      return __props.totalPages > 0 ? (openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("button", {
          class: "page-btn",
          disabled: __props.currentPage <= 1,
          onClick: _cache[0] || (_cache[0] = ($event) => goToPage(__props.currentPage - 1))
        }, " 上一页 ", 8, _hoisted_2),
        (openBlock(true), createElementBlock(Fragment, null, renderList(pages.value, (page, index) => {
          return openBlock(), createElementBlock(Fragment, { key: index }, [
            page === -1 ? (openBlock(), createElementBlock("span", _hoisted_3, "…")) : (openBlock(), createElementBlock("button", {
              key: 1,
              class: normalizeClass(["page-btn", "page-num", { active: page === __props.currentPage }]),
              onClick: ($event) => goToPage(page)
            }, toDisplayString(page), 11, _hoisted_4))
          ], 64);
        }), 128)),
        createBaseVNode("button", {
          class: "page-btn",
          disabled: __props.currentPage >= __props.totalPages,
          onClick: _cache[1] || (_cache[1] = ($event) => goToPage(__props.currentPage + 1))
        }, " 下一页 ", 8, _hoisted_5),
        createBaseVNode("div", _hoisted_6, " 第 " + toDisplayString(__props.currentPage) + " 页 / 共 " + toDisplayString(__props.totalPages) + " 页，共 " + toDisplayString(__props.total) + " 条 ", 1),
        createBaseVNode("div", _hoisted_7, [
          _cache[3] || (_cache[3] = createBaseVNode("span", null, "跳至", -1)),
          withDirectives(createBaseVNode("input", {
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => jumpPage.value = $event),
            type: "number",
            min: "1",
            max: __props.totalPages,
            class: "jump-input",
            onKeyup: withKeys(handleJump, ["enter"])
          }, null, 40, _hoisted_8), [
            [vModelText, jumpPage.value]
          ]),
          _cache[4] || (_cache[4] = createBaseVNode("span", null, "页", -1))
        ])
      ])) : createCommentVNode("", true);
    };
  }
});
const Pagination = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c40f8cf4"]]);
export {
  Pagination as P
};
//# sourceMappingURL=Pagination.js.map
