import { r as registerInstance, h } from './index-745b6bec.js';

const scSkeletonCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{--border-radius:var(--sc-border-radius-pill);--color:var(--sc-skeleton-color, var(--sc-color-gray-300));--sheen-color:var(--sc-skeleton-sheen-color, var(--sc-color-gray-400));display:block;position:relative}.skeleton{display:flex;width:100%;height:100%;min-height:1rem}.skeleton__indicator{flex:1 1 auto;background:var(--color);border-radius:var(--border-radius)}.skeleton--sheen .skeleton__indicator{background:linear-gradient(270deg, var(--sheen-color), var(--color), var(--color), var(--sheen-color));background-size:400% 100%;background-size:400% 100%;animation:sheen 3s ease-in-out infinite}.skeleton--pulse .skeleton__indicator{animation:pulse 2s ease-in-out 0.5s infinite}@keyframes sheen{0%{background-position:200% 0}to{background-position:-200% 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}";
const ScSkeletonStyle0 = scSkeletonCss;

const ScSkeleton = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.effect = 'sheen';
    }
    render() {
        return (h("div", { key: '0c8e2b84bb679bff9fd756d1449a07192bc43c12', part: "base", class: {
                'skeleton': true,
                'skeleton--pulse': this.effect === 'pulse',
                'skeleton--sheen': this.effect === 'sheen',
            }, "aria-busy": "true", "aria-live": "polite" }, h("div", { key: 'f3ddd77e02feee61c05731ab5d353e8009d4224e', part: "indicator", class: "skeleton__indicator" })));
    }
};
ScSkeleton.style = ScSkeletonStyle0;

export { ScSkeleton as sc_skeleton };

//# sourceMappingURL=sc-skeleton.entry.js.map