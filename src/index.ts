import { createElement, ReactNode } from "react";

type Target = string | number | HTMLElement;
type Direction = "vertical" | "horizontal";

interface AnimatedScrollProps {
    target: Target;
    children?: ReactNode;
    duration?: number;
    direction?: Direction;
    beforeScroll?: () => void;
    afterScroll?: () => void;
}

const initializeTo = (target: Target, direction: Direction) => {
    switch (typeof target) {
        case "number":
            return target;
        case "string":
            return direction === "vertical"
                ? document.getElementById(target)?.getBoundingClientRect()?.y ||
                      0
                : document.getElementById(target)?.getBoundingClientRect()?.x ||
                      0;
        default:
            return direction === "vertical"
                ? target.getBoundingClientRect()?.y || 0
                : target.getBoundingClientRect()?.x || 0;
    }
};

const AnimatedScroll = ({
    target,
    children,
    duration = 0,
    direction = "vertical",
    beforeScroll,
    afterScroll,
}: AnimatedScrollProps) => {
    const to = initializeTo(target, direction);
    const from = window.scrollY;

    const scroll = () => {
        beforeScroll?.();
        // TODO: 애니메이션 처리
        window.scrollTo(0, from + (to - from));
        afterScroll?.();
    };

    return createElement("div", { children });
};

export default AnimatedScroll;
