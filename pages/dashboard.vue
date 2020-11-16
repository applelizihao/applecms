<template>
  <v-app id="dashboard">
    {{ $route.query.title }}
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <v-list dense>
        <template v-for="item in items">
          <v-row v-if="item.heading" :key="item.heading" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col cols="6" class="text-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title> {{ item.text }}</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item v-for="(child, i) in item.children" :key="i" link>
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ child.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item v-else :key="item.text" link @click="routerLink(item.link)">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">后台管理系统</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="搜索"
        class="hidden-sm-and-down"
      />
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <userdropdown />
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <div class="app-row-content pa-4">
          <nuxt />
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Userdropdown from '../components/user/userdropdown.vue'
export default {
  components: { Userdropdown },
  props: {},
  middleware: 'authenticated',
  data () {
    return {
      drawer: null,
      items: [
        {
          icon: 'mdi-contacts',
          text: '基础信息',
          link: ''
        },
        {
          icon: 'mdi-contacts',
          text: '模块管理',
          link: ''
        },
        {
          icon: 'mdi-contacts',
          text: '文章列表',
          link: 'modal/category/articles'
        },
        {
          icon: 'mdi-contacts',
          text: '文章详情',
          link: 'modal/detail/article'
        },
        {
          icon: 'mdi-book',
          text: '管理员中心',
          link: 'managingusers'
        },
        {
          icon: 'mdi-book',
          text: '消息日志',
          link: ''
        },
        {
          icon: 'mdi-contacts',
          text: '系统设置',
          link: 'systeminfo'
        }
      ]
    }
  },
  beforeMount () {
  },
  methods: {
    routerLink (link) {
      this.$router.push('/dashboard/' + link)
    }
  },
  head () {
    return {
      title: '登录',
      meta: [
        { hid: 'description', name: 'description', content: '登录页面' }
      ]
    }
  }
}
</script>

<style lang="scss">
  #Dashboard {
    .app-row-content {
      padding: 0 15px;
    }
  }

</style>
