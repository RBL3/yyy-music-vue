import { useState } from '@/utils';
import {
    Ref, UnwrapRef, watch, ComputedRef,
} from '@vue/composition-api';

export type QueryKey = Ref<UnwrapRef<string | readonly unknown[]>>
export type QueryContext = {
    queryKey: QueryKey
}
export type QueryFunction<T> = (ctx: QueryContext) => Promise<T>
export type RefWrap<T> = Ref<UnwrapRef<T>>
export type QueryBaseResult<TData, TError> = {
    data: RefWrap<TData | undefined>
    error: RefWrap<TError | undefined>
    isLoading: RefWrap<boolean | undefined>
}
export type QueryOptions = {
    enabled?: Ref<UnwrapRef<boolean>> | ComputedRef<boolean>,
    // 请求钩子函数
    featchOnMount?: () => void,
    onError?: () => void,
    onSuccess?: () => void
}

function useQuery<TData = any, TError = any>(queryKey: QueryKey, fn: QueryFunction<UnwrapRef<TData>>, options?: QueryOptions): QueryBaseResult<TData, TError> {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<TData | undefined>(undefined);
    const [error, setError] = useState<TError | undefined>(undefined);

    function innerRequest() {
        options?.featchOnMount && options?.featchOnMount();
        setIsLoading(true);
        fn({ queryKey }).then((res) => {
            setData(res);
            options?.onSuccess && options.onSuccess();
        }).catch((err) => {
            setError(err);
            options?.onError && options?.onError();
        }).finally(() => {
            setIsLoading(false);
        });
    }

    watch(queryKey, () => {
        if (options && !options.enabled?.value) {
            setData(undefined);
            return;
        }
        innerRequest();
    }, {
        deep: true,
        immediate: true,
    });

    return {
        data,
        error,
        isLoading,
    };
}

export default useQuery;
