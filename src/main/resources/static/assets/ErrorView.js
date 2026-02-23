import {
    _ as _export_sfc,
    a as openBlock,
    b as createBaseVNode,
    c as createElementBlock,
    d as defineComponent
} from "./index.js";

const _hoisted_1 = { class: "error-page" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ErrorView",
  setup(__props) {
    const reload = () => {
      window.location.reload();
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", { class: "error-content" }, [
          _cache[1] || (_cache[1] = createBaseVNode("h1", { class: "error-code" }, "500", -1)),
          _cache[2] || (_cache[2] = createBaseVNode("h2", { class: "error-title" }, "服务器开小差了", -1)),
          _cache[3] || (_cache[3] = createBaseVNode("p", { class: "error-desc" }, "请稍后重试，或联系管理员", -1)),
          createBaseVNode("div", { class: "error-actions" }, [
            _cache[0] || (_cache[0] = createBaseVNode("a", {
              href: "/",
              class: "btn-primary"
            }, "返回首页", -1)),
            createBaseVNode("button", {
              class: "btn-outline",
              onClick: reload
            }, "刷新页面")
          ])
        ])
      ]);
    };
  }
});
const ErrorView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-05f3d38a"]]);
export {
  ErrorView as default
};
//# sourceMappingURL=ErrorView.js.map
