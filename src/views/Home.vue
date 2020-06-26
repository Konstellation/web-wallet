<template>
    <div class="home-container">
        <div class="banner">
            <h1>
                {{ $t('home.title') }}
            </h1>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Home',
    };
</script>

<style lang="scss" scoped>
    .home-container {
        text-align: center;

        .banner {
            padding: $padding-large;
            max-width: $max-width;
            margin: 0 auto;

            h1 {
                font-size: 32px;
                margin-top: 40px;
            }

            img {
                width: 90%;
                margin-top: 56px;
                margin-bottom: -140px;
            }
        }

        .banner-img {
            max-width: $max-width;
            margin: 0 auto -100px;
            padding: $padding-large;
            background: transparent;
            position: relative;
            z-index: 9;

            & > img {
                width: 100%;
            }
        }

        .home-items {
            background: white;

            .items {
                display: flex;
                max-width: $max-width;
                padding: 180px $padding-large 160px;
                margin: 0 auto;
                justify-content: space-between;

                .item {
                    flex-basis: 360px;
                    background: white;
                    box-shadow: 1px 1px 16px 0px rgba(0, 0, 0, 0.06);
                    border-radius: 16px;
                    padding: $padding-large;
                    margin: 16px;
                    color: gray;
                    font-size: 14px;

                    img {
                        width: 80px;
                    }

                    h4 {
                        font-size: 18px;
                        color: rgba(0, 0, 0, 0.85);
                        margin-bottom: 16px;
                    }
                }
            }
        }

        .home-links {
            padding: 100px 16px 160px;
            margin: 0 auto -72px;
            background-color: #3d3b58;

            .link {
                color: $color-font;
                display: inline-block;
                width: 64px;
                height: 64px;
                padding: 16px;
                margin: 16px;
                border-radius: 32px;
                background: $color-background-card;

                &:hover {
                    background: $color-primary-light;
                }
            }
        }
    }

    @include responsive($sm) {
        .home-container {
            .banner {
                img {
                    width: 100%;
                    margin-bottom: -80px;
                }
            }

            .banner-img {
                padding: 0;
                margin-bottom: -40px;
            }

            .home-items {
                .items {
                    padding: 100px $padding-large 80px;
                    flex-direction: column;
                }
            }

            .home-links {
                .link {
                    margin: 8px;
                }
            }
        }
    }
</style>
