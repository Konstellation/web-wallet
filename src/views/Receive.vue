<template>
    <k-page
        :title="$t('main.receive')"
        class="receive-container">
        <k-card>
            <div class="qr">
                <h4>{{ $t('main.qrcode') }}</h4>
                <div id="qrcode"></div>
                <h4>{{ $t('send.address') }}</h4>
                <k-address
                    class="addr"
                    :address="address || ''"
                    :bright-background="true"/>
            </div>
        </k-card>
    </k-page>
</template>

<script>
    import {mapState} from 'vuex';
    import QRCode from '../utils/qrcode';

    export default {
        name: 'Receive',
        data () {
            return {
                address: '',
            };
        },
        computed: {
            ...mapState('account', ['keyStore']),
        },
        mounted () {
            new QRCode(document.getElementById('qrcode'), this.keyStore.address);
            this.address = this.keyStore.address;
        },
    };
</script>

<style lang="scss" scoped>
    .receive-container {
        margin: 0 auto;
        text-align: center;

        .qr {
            background: $color-primary;
            padding: $padding-basic;
            color: $color-title;

            h4 {
                font-size: 20px;
                font-weight: bold;
            }

            #qrcode {
                width: 256px;
                margin: 16px auto;
            }

            .addr {
                justify-content: center;
                padding: 0 $padding-basic;
                word-break: break-all;
            }
        }
    }
</style>
