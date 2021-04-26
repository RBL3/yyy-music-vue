<template>
  <svg
    :fill="color"
    :class="['yy-icon', `yy-${svgValue.substr(1)}`, `yy-icon-${size}`, className]"
    aria-hidden="true"
    v-on="$listeners"
  >
       <use :xlink:href="svgValue" />
  </svg>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from '@vue/composition-api';

type IconSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg'

export default defineComponent({
    props: {
        iconClass: {
            type: String,
            required: true
        },
        size: {
            type: String as unknown as PropType<IconSize>,
            default: 'md',
        },
        color: {
            type: String
        },
        className: {
            type: String
        }
    },
    setup(props) {
        const svgValue = computed(() => `#icon-${props.iconClass}`)
        return {
            svgValue
        }
    }
})
</script>

<style lang="less" scoped>
.yy-icon-xxs {
    width: 15px;
    height: 15px;
}
.yy-icon-xs {
    width: 18px;
    height: 18px;
}
.yy-icon-sm {
    width: 21px;
    height: 21px;
}
.yy-icon-md {
    width: 22px;
    height: 22px;    
}
.yy-icon-lg {
    width: 36px;
    height: 36px; 
}

</style>