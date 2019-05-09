<template lang="pug">
    .service-search
        Input.service-search-input(
        placeholder='搜索问题'
        v-model='keyword'
        v-clickoutside='handleClose'
        ref='serviceSearch'
        @on-focus='visible = true'
        @on-blur='dely'
        @on-change='throttle(getSuggestions(), 50, 200)'
        @on-enter='onSearch'
        @compositionstart='inputLock=true'
        @compositionend='inputLock=false'
        )
            Button(
            slot='append'
            @click='onSearch'
            ) 搜索
        ul.service-search-result(v-show='visible && searchSuggestionsList.length > 0' ref='searchResult')
            li(
            v-for='(item,index) in searchSuggestionsList'
            :key='index'
            v-html='item.title'
            @click='jumpToDetail(item.category, item.id, item.title)'
            )
</template>

<script>
    import api from '@/api'
    import throttle from '@/util/throttle.js'

    export default {
        data () {
            return {
                keyword: '',
                searchSuggestionsList: [],
                visible: false,
                inputLock: false,
                isall: true,
                id: this.$route.params.id,
                targetObj: {}
            }
        },
        watch: {
            $route () {
                this.changeRoute()
            }
        },
        computed: {
            focusElment () {
                return this.$refs.searchResult
            }
        },
        methods: {
            changeRoute () {
                if (this.$route.name !== 'result-list') {
                    // this.keyword = ''
                    // console.log(this.$route)
                    this.configName = this.$route.params.name || ''
                    this.contentId = this.$route.params.id || ''
                    // this.getDetail()
                }
                if (this.$route.name === 'service-list') {
                    // 非全局搜索
                    this.isall = false
                    this.id = this.$route.params.id
                }
                let tree = JSON.parse(localStorage.getItem('tree'))
                if (this.$route.name === 'service-classification' && tree.length !== 1) {
                    // 全局搜索
                    this.isall = true
                }
                this.$emit('isall', this.isall)
            },
            throttle: throttle,
            handleClose () {
                this.visible = false
            },
            dely () {
                setTimeout(() => {
                    this.visible = false
                }, 500)
            },
            // getDetail () {
            //   console.log(this.configName)
            //   api.service.getQuestionDetail(this.configName, this.contentId)
            //     .then(res => {
            //       // this.content = res.data || {}
            //       // this.getCrumb()
            //       // this.keyword = res.data.title || ''
            //     })
            // },
            getSuggestions () {
                setTimeout(() => {
                    const username = this.$store.state.circuit.userInfo.userInfo || {}
                    // if (this.isall) {
                    api.service.getSuggestions(this.keyword, 1, 15, username.ldap).then(res => {
                        this.searchSuggestionsList = res.data ? res.data.items : []
                        this.getName()
                        this.getId()
                    })
                    // } else {
                    //   let tree = JSON.parse(localStorage.getItem('tree'))
                    //   if (!this.id) {
                    //     this.id = tree[0][0].id || 0
                    //   }
                    //   api.service.getSuggestionsonly(this.keyword, 1, 15, username.ldap, this.id).then(res => {
                    //     this.searchSuggestionsList = res.result.list
                    //   })
                    // }
                }, 60)
            },
            getId () {
                let arr = []
                for (var i = 0; i < this.searchSuggestionsList.length; i++) {
                    if (this.searchSuggestionsList[i].subCategorys) {
                        arr.push(this.searchSuggestionsList[i].subCategorys.reverse().splice(0, 2))
                    }
                }
                for (var z = 0; z < arr.length; z++) {
                    for (var x = 0; x < arr[z].length; x++) {
                        arr[z][x] = this.targetObj[Number(arr[z][x])]
                    }
                }
                localStorage.setItem('froms', JSON.stringify(arr))
            },
            getName () {
                let objone = {}
                let objtwo = {}
                let objthree = {}
                let tree = JSON.parse(localStorage.getItem('tree'))
                for (var i = 0; i < tree.length; i++) {
                    // console.log(tree[i])
                    objone[tree[i][0].id] = tree[i][0].name
                    // console.log(tree[i][0].children)
                    if (tree[i][0].children != null) {
                        for (var z = 0; z < tree[i][0].children.length; z++) {
                            objtwo[tree[i][0].children[z].id] = tree[i][0].children[z].name
                            if (tree[i][0].children[z].children != null) {
                                for (var y = 0; y < tree[i][0].children[z].children.length; y++) {
                                    objthree[tree[i][0].children[z].children[y].id] = tree[i][0].children[z].children[y].name
                                }
                            }
                        }
                    }
                }
                this.targetObj = Object.assign({}, objone, objtwo, objthree)
            },
            // selectedSuggest (keyword) {
            //   this.keyword = keyword.replace(/<\/?em>/g, '')
            //   this.onSearch()
            // },
            jumpToDetail (category, contentId, keyword) {
                this.keyword = keyword.replace(/<\/?em>/g, '')
                let contentName = ''
                if (typeof category === 'string') {
                    contentName = category
                } else {
                    for (let i = 0; i < category.length; i++) {
                        contentName += category[i]
                        if (i < category.length - 1) {
                            contentName += ','
                        }
                    }
                }
                console.log(contentName)
                this.$router.push({name: 'service-detail', params: {'name': contentName, 'id': contentId}})
                this.handleClose()
            },
            onSearch () {
                this.$mirrorTrack('知识库', '点击搜索')
                if (this.keyword) {
                    this.$refs.serviceSearch.blur()
                    this.handleClose()
                    this.id = JSON.parse(localStorage.getItem('id'))
                    if (this.isall) {
                        this.$router.push({name: 'result-list', query: {'keyword': encodeURIComponent(this.keyword), page: 1, 'isall': true}})
                    } else {
                        this.$router.push({name: 'result-list', query: {'keyword': encodeURIComponent(this.keyword), page: 1, 'isall': false, 'id': this.id}})
                        // localStorage.removeItem('id')
                    }
                } else {
                    this.$refs.serviceSearch.focus()
                }
            }
        },
        mounted () {
            let k = this.$route.query.keyword
            this.keyword = k ? decodeURIComponent(k) : ''
        },
        created () {
            this.changeRoute()
            let tree = JSON.parse(localStorage.getItem('tree'))
            if (tree.length === 1) {
                this.isall = false
            }
        }
    }
</script>

<style lang="less">
    @import '~@/styles/var.less';
    @import '~@/styles/mixin.less';

    .service-search {
        position: relative;
        .size(620px, 40px);
        padding: 1px 2px;
        border-radius: 60px;
        background-image: linear-gradient(170deg, #ff8731 0%, #ff6331 99%);
        box-shadow:0 2px 20px 0 rgba(252,145,83,0.20);

        .service-search-input {
            .size(616px, 36px);
            background: @ip-bg-color-base;
            // box-shadow: 0 2px 20px 0 rgba(252,145,83,0.20);
            box-sizing: border-box;
            // border-radius: 60px 0 0 60px;
            border-radius: 60px;
            .ivu-input {
                .size(500px, 36px);
                padding-left: 30px;
                font-size: @ip-font-size-middle;
                border: none;
                border-radius: 60px 0 0 60px;
            }

            .ivu-input-group-append {
                position: absolute;
                right: -2px;
                top: -2px;
                .size(120px, 40px);
                padding: 0;
                border: none;
                border-radius: 0 70px 70px 0;
                color: @ip-bg-color-base;
                box-sizing: content-box;
                background-image: linear-gradient(170deg, #ff8731 0%, #ff6331 99%);
                // box-shadow: 0 2px 10px 0 rgba(255,125,49,0.44);

                .ivu-btn {
                    padding: 0;
                    margin: 0;
                    font-family: PingFangSC-Semibold;
                    font-size: @ip-font-size-large;
                    line-height: 40px;
                }
            }
        }

        .service-search-result {
            position: absolute;
            left: 15px;
            top: 50px;
            z-index: 1000;
            width: 767px;
            max-height: 248px;
            overflow-y: auto;
            background: @ip-bg-color-base;
            box-shadow: 0 0 20px 0 rgba(0,0,0,0.08);
            border-radius: @border-radius-base;
            li {
                height: 40px;
                line-height: 40px;
                padding: 0 16px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                cursor: default;
                &:hover {
                    background-color: #f7f7f7;
                    // color: @ip-primary-color;
                }
                em {
                    font-style: normal;
                }
            }
        }
    }
</style>
