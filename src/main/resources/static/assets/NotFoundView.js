import {
    _ as _export_sfc,
    a as openBlock,
    b as createBaseVNode,
    c as createElementBlock,
    d as defineComponent,
    m as unref,
    u as useRouter
} from "./index.js";

const _hoisted_1 = { class: "error-page" };
const _hoisted_2 = { class: "error-content" };
const _hoisted_3 = { class: "error-actions" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "NotFoundView",
  setup(__props) {
    const router = useRouter();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          _cache[2] || (_cache[2] = createBaseVNode("h1", { class: "error-code" }, "404", -1)),
          _cache[3] || (_cache[3] = createBaseVNode("h2", { class: "error-title" }, "页面不见了", -1)),
          _cache[4] || (_cache[4] = createBaseVNode("p", { class: "error-desc" }, "您访问的页面可能已被移动或删除", -1)),
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("button", {
              class: "btn-primary",
              onClick: _cache[0] || (_cache[0] = ($event) => unref(router).push("/"))
            }, "返回首页"),
            createBaseVNode("button", {
              class: "btn-outline",
              onClick: _cache[1] || (_cache[1] = ($event) => unref(router).go(-1))
            }, "返回上一页")
          ])
        ])
      ]);
    };
  }
});
const NotFoundView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5cfa0962"]]);
export {
  NotFoundView as default
};
//# sourceMappingURL=NotFoundView.js.map
