<template>
    <span
        :class="`${ellipsis ? 'ellipsis' : ''}`">
        {{ content }}
    </span>
</template>

<script>
    export default {
        props: {
            content: String,
            ellipsis: {type: Boolean, default: true},
        },
    };
</script>
