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
    h as createCommentVNode,
    p as createBlock,
    t as toDisplayString,
    y as withCtx
} from "./index.js";

const _hoisted_1 = { class: "breadcrumb-bar" };
const _hoisted_2 = { class: "breadcrumb-inner" };
const _hoisted_3 = {
  key: 1,
  class: "breadcrumb-current"
};
const _hoisted_4 = {
  key: 2,
  class: "breadcrumb-sep"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Breadcrumb",
  props: {
    items: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_router_link = resolveComponent("router-link");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(__props.items, (item, index) => {
            return openBlock(), createElementBlock(Fragment, { key: index }, [
              item.to && index < __props.items.length - 1 ? (openBlock(), createBlock(_component_router_link, {
                key: 0,
                to: item.to,
                class: "breadcrumb-link"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(item.label), 1)
                ]),
                _: 2
              }, 1032, ["to"])) : (openBlock(), createElementBlock("span", _hoisted_3, toDisplayString(item.label), 1)),
              index < __props.items.length - 1 ? (openBlock(), createElementBlock("span", _hoisted_4, "›")) : createCommentVNode("", true)
            ], 64);
          }), 128))
        ])
      ]);
    };
  }
});
const Breadcrumb = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cc67584f"]]);
export {
  Breadcrumb as B
};
//# sourceMappingURL=Breadcrumb.js.map
