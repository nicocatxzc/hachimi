import mitt from "mitt";
import type { Emitter } from "mitt";
import { onScopeDispose, getCurrentScope } from "vue";

type Events = Record<string, any>;

const emitter: Emitter<Events> = mitt<Events>();

export default function useEventBus() {
    if (!getCurrentScope()) {
        throw new Error("useEventBus()只能在vue组件作用域中生效。");
    }

    function on<T = any>(
        name: string,
        callback: (data: T) => void,
        options?: { once?: boolean }
    ) {
        let active = true;
        const handler = (data: T) => {
            if (!active) return;

            callback(data);

            if (options?.once) {
                stop();
            }
        };

        const stop = () => {
            if (!active) return;
            active = false;
            emitter.off(name, handler);
        };

        emitter.on(name, handler);

        // 自动回收
        onScopeDispose(stop);

        return {
            destroy: stop,
        };
    }

    function once<T = any>(name: string, callback: (data: T) => void) {
        return on(name, callback, { once: true });
    }

    function emit<T = any>(name: string, data: T) {
        emitter.emit(name, data);
    }

    return {
        on,
        once,
        emit,
    };
}
