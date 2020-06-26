<template>
    <el-form
        ref="form"
        label-position="top"
        :model="content"
        :rules="rules"
        class="form"
        @submit="onSubmit">
        <template v-for="input in inputs">
            <template v-if="input.type === 'checkbox-group'">
                <el-checkbox-group
                    :key="input.field"
                    v-model="content[input.field]">
                    <template v-for="v in input.values">
                        <el-checkbox
                            :key="'ch'+v.value"
                            :label="v.value"
                            :value="v.value">
                            {{ $t(v.title) }}
                        </el-checkbox>
                    </template>
                </el-checkbox-group>
            </template>
            <template v-else-if="input.type === 'checkbox'">
                <el-checkbox
                    :key="input.field"
                    v-model="content[input.field]"
                    :label="input.value"
                    :value="input.value"
                    @input="handleInput">
                    {{ $t(input.title) }}
                </el-checkbox>
            </template>
            <template v-else>
                <el-form-item
                    :key="input.field"
                    :prop="input.field"
                    :label="$t(input.title)">
                    <template v-if="input.type === 'select'">
                        <el-select v-model="content[input.field]">
                            <el-option
                                v-for="i in input.values"
                                :key="i.denom"
                                :label="i.label"
                                :value="i.denom">
                            </el-option>
                        </el-select>
                    </template>
                    <template v-else>
                        <el-input
                            v-model="content[input.field]"
                            :type="input.type"
                            :min="input.min"
                            :max="input.max"
                            :step="input.step"
                            :rows="input.rows"
                            :placeholder="input.placeholder"
                            :clearable="input.clearable"
                            @input="handleInput">
                        </el-input>
                    </template>
                </el-form-item>
            </template>
        </template>
    </el-form>
</template>

<script>
    export default {
        name: 'Form',
        props: {
            rules: Object,
            inputs: Array,
            value: Object,
        },
        data() {
            return {
                content: this.value,
            };
        },
        methods: {
            handleInput() {
                this.$emit('input', this.content);
            },
            onSubmit(e) {
                this.$emit('submit', e);
            },
            validate(f) {
                return this.$refs.form.validate(f);
            },
        },
    };
</script>

<style scoped>

</style>
