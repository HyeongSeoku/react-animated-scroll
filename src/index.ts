import { createElement, ReactNode } from "react";

type Target = string | number | HTMLElement;

interface AnimatedScrollProps {
    target: Target;
    children?: ReactNode;
    duration?: number;
    beforeScroll?: () => void;
    afterScroll?: () => void;
}

const AnimatedScroll = ({
    target,
    children,
    duration = 0,
    beforeScroll,
    afterScroll,
}: AnimatedScrollProps) => {
    const to =
        typeof target === "number"
            ? target
            : typeof target === "string"
            ? document.getElementById(target)?.getBoundingClientRect()?.y || 0
            : target.getBoundingClientRect()?.y || 0;
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
