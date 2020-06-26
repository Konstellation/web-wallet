<template>
    <a
        v-if="type === 'tx'"
        target="_blank"
        :href="`${explorerDomain}tx/${content}`"
        :class="`${ellipsis ? 'ellipsis' : ''}`">
        {{ content }}
    </a>
    <a
        v-else-if="type === 'address'"
        target="_blank"
        :href="`${explorerDomain}address/${content}`"
        :class="`${ellipsis ? 'ellipsis' : ''}`">
        {{ content }}
    </a>
    <a
        v-else-if="type === 'block'"
        target="_blank"
        :href="`${explorerDomain}block/${content}`"
        :class="`${ellipsis ? 'ellipsis' : ''}`">
        {{ content }}
    </a>
    <a
        v-else-if="type === 'validator'"
        target="_blank"
        :href="`${explorerDomain}validator/${content}`"
        :class="`${ellipsis ? 'ellipsis' : ''}`">
        {{ content }}
    </a>
</template>

<script>
    import {explorerDomain} from '../../constants';

    export default {
        props: {
            type: String,
            content: String,
            ellipsis: {type: Boolean, default: true},
        },
        data () {
            return {
                explorerDomain,
            };
        },
    };
</script>
