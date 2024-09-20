import { __VLS_internalComponent, __VLS_componentsOption, __VLS_name } from './CalendarDay.vue.js';

function __VLS_template() {
let __VLS_ctx!: InstanceType<import('./__VLS_types.js').PickNotAny<typeof __VLS_internalComponent, new () => {}>> & {};
/* Components */
let __VLS_localComponents!: NonNullable<typeof __VLS_internalComponent extends { components: infer C; } ? C : {}> & typeof __VLS_componentsOption & typeof __VLS_ctx;
let __VLS_otherComponents!: typeof __VLS_localComponents & import('./__VLS_types.js').GlobalComponents;
let __VLS_own!: import('./__VLS_types.js').SelfComponent<typeof __VLS_name, typeof __VLS_internalComponent & typeof __VLS_publicComponent & (new () => { $slots: typeof __VLS_slots; }) >;
let __VLS_components!: typeof __VLS_otherComponents & Omit<typeof __VLS_own, keyof typeof __VLS_otherComponents>;
/* Style Scoped */
type __VLS_StyleScopedClasses = {};
let __VLS_styleScopedClasses!: __VLS_StyleScopedClasses | keyof __VLS_StyleScopedClasses | (keyof __VLS_StyleScopedClasses)[];
/* CSS variable injection */
/* CSS variable injection end */
let __VLS_templateComponents!: {};
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = { class: ("day"), };
type __VLS_0 = JSX.IntrinsicElements['div'];
const __VLS_1: import('./__VLS_types.js').EventObject<typeof undefined, 'click', {}, __VLS_0['onClick']> = {
click: (__VLS_ctx.handleClick)
};
// @ts-ignore
[handleClick,];
(__VLS_ctx.day.id);
// @ts-ignore
[day,];
if (__VLS_ctx.day.event) {
// @ts-ignore
[day,];
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = { class: ("event"), draggable: ("true"), };
type __VLS_2 = JSX.IntrinsicElements['div'];
const __VLS_3: import('./__VLS_types.js').EventObject<typeof undefined, 'dragstart', {}, __VLS_2['onDragstart']> = {
dragstart: $event => {
__VLS_ctx.drag(__VLS_ctx.event);
}
};
// @ts-ignore
[drag, event,];
(__VLS_ctx.day.event.title);
// @ts-ignore
[day,];
}
}
}
if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
}
declare var __VLS_slots: {};
return __VLS_slots;
}
