<template lang="pug">
    .service-result-list
        p(v-html="'为您在知识库找到'+ total +'个相关结果'" v-show='!isall' class='cls')
        ul(v-show='list && list.length > 0')
            li.service-result-item(v-for='item in list' :key='item.fields.id' @click='jumpToDetail([item.fields.contentType], item.fields.id)')
                span(v-if='item.fields.category=="knowledge_faq"' v-html="'Q:[' + item.fields.id + ']' + item.fields.title")
                span(v-else v-html="'K:[' + item.fields.id + ']' + item.fields.title")
                <!--span(v-html="item.subCategorys.join('&#45;&#45;')" class=['rig']  v-show='isall')-->
                div.detail-info
                    span.views-count {{`更新时间：${item.fields.updateTime}`}}
                    span.views-count(v-html="item.explanation ? item.explanation.join('--') : ''")
                    p.detail-content(v-html="item.highlight.content ? item.highlight.content[0] : ''")
        div.service-result-nothing(v-show='list && list.length < 1 && !waiting')
            img(src='../../../assets/nothing.png')
            p 没有您要搜索的内容哦，换个关键词试试吧~
        Page.ip-pagination(
        :total='total'
        :page-size='pageSize'
        :current='currentPage'
        v-show='total > pageSize'
        @on-change='changeCurrentPage'
        )
</template>

<script>
    import api from '@/api'
    import {scrollTop} from '@/util/scrolltop.js'

    export default {
        data () {
            return {
                list: [],
                total: 0,
                pageSize: 15,
                currentPage: parseInt(this.$route.query.page) || 1,
                waiting: true,
                isall: true,
                id: this.$route.params.id,
                froms: []
            }
        },
        watch: {
            $route () {
                this.getSearchList()
            }
        },
        methods: {
            getSearchList () {
                this.waiting = true
                this.currentPage = parseInt(this.$route.query.page)
                this.isall = this.$route.query.isall
                this.id = this.$route.query.id
                setTimeout(() => {
                    const username = this.$store.state.circuit.userInfo.userInfo || {}
                    if (this.isall) {
                        api.service.getSuggestions(this.$route.query.keyword, this.currentPage, this.pageSize, username.ldap).then(res => {
                            const json = res.data || {}
                            this.total = json.total || 0
                            this.list = json.items
                            this.froms = JSON.parse(localStorage.getItem('froms'))
                            for (var i = 0; i < this.froms.length; i++) {
                                this.froms[i][0] = `[${this.froms[i][0]}]`
                                this.list[i].fields.categorys = this.froms[i]
                            }
                            this.waiting = false
                            // document.documentElement.scrollTop = document.body.scrollTop = 0
                            scrollTop(0, 150, 'linear')
                        })
                    } else {
                        let tree = JSON.parse(localStorage.getItem('tree'))
                        // if (tree.length === 1) {
                        //   this.id = tree[0][0].id || 0
                        // }
                        if (!this.id) {
                            this.id = tree[0][0].id || 0
                        }
                        let keyword = this.$route.query.keyword
                        api.service.getSuggestions(keyword, this.currentPage, this.pageSize, username.ldap, this.id).then(res => {
                            const json = res.data || {}
                            this.total = json.total || 0
                            this.list = json.items
                            this.waiting = false
                            // document.documentElement.scrollTop = document.body.scrollTop = 0
                            scrollTop(0, 150, 'linear')
                        })
                    }
                }, 60)
            },
            changeCurrentPage (page) {
                this.currentPage = page
                this.$router.push({name: 'result-list', query: Object.assign({}, this.$route.query, {'page': page})})
            },
            jumpToDetail (category, contentId) {
                let contentName = ''
                for (let i = 0; i < category.length; i++) {
                    contentName += category[i]
                    if (i < category.length - 1) {
                        contentName += ','
                    }
                }
                this.$router.push({name: 'service-detail', params: {'name': contentName, 'id': contentId}})
            }
        },
        mounted () {
            this.$nextTick(() => {
                this.list = this.getSearchList()
            })
        },
        created () {
            let tree = JSON.parse(localStorage.getItem('tree'))
            if (tree.length === 1) {
                this.isall = false
            }
        }
    }
</script>


<style lang="less">
    @import '~@/styles/var.less';
    @import '~@/styles/comps/page.less';

    .service-result-list {
        padding: 30px;
        padding-top:0;
        .cls {
            padding-bottom: 20px;
        }
        .service-result-item {
            padding-bottom: 18px;
            font-size: @ip-font-size-middle;
            cursor: pointer;
            &:before {
                content: '·';
                display: inline-block;
                padding-right: 5px;
            }
            em {
                font-style: normal;
                color: @ip-primary-color;
            }
            .rig {
                float: right;
            }
            .detail-info {
                .views-count {
                    margin-right:10px;
                    font-size: 12px;
                    color:#bbb;
                }
            }
            .detail-content {
                font-size: 14px;
                color: #666;
            }
        }
        .service-result-nothing {
            text-align: center;
            padding: 20px 0;
        }
    }
</style>

