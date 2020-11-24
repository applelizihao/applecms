<template>
  <v-card>
    <v-toolbar
      color="primary"
      dark
      flat
    >
      <v-icon>mdi-silverware</v-icon>
      <v-toolbar-title>源码在线编辑</v-toolbar-title>
    </v-toolbar>

    <v-row>
      <v-col>
        <v-card-text>
          <v-treeview
            v-model="tree"
            :items="listFile"
            activatable
            item-key="name"
            open-on-click
          >
            <template v-slot:prepend="{ item, open }">
              <v-icon v-if="!item.file">
                {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
              </v-icon>
              <v-icon v-else>
                {{ files[item.file] }}
              </v-icon>
            </template>
          </v-treeview>
        </v-card-text>
      </v-col>

      <v-divider vertical />
      <v-col cols="12" md="8">
        <codeedit />
      </v-col>
    </v-row>

    <v-divider />

    <v-card-actions>
      <v-btn
        text
        @click="tree = []"
      >
        Reset
      </v-btn>

      <v-spacer />

      <v-btn
        class="white--text"
        color="green darken-1"
        depressed
      >
        Save
        <v-icon right>
          mdi-content-save
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import Codeedit from '@/components/editor/codeedit.vue'
export default {
  components: {
    Codeedit
  },
  props: {
    listFile: {
      type: Array,
      default: null
    }
  },
  data: () => ({
    breweries: [],
    isLoading: false,
    tree: [],
    types: [],
    files: {
      html: 'mdi-language-html5',
      js: 'mdi-nodejs',
      json: 'mdi-code-json',
      md: 'mdi-language-markdown',
      pdf: 'mdi-file-pdf',
      png: 'mdi-file-image',
      txt: 'mdi-file-document-outline',
      xls: 'mdi-file-excel'
    }
  }),
  computed: {
    items () {
      const children = this.types.map(type => ({
        id: type,
        name: this.getName(type),
        children: this.getChildren(type)
      }))
      return [{
        id: 1,
        name: 'All Breweries',
        children
      }]
    },
    shouldShowTree () {
      return this.breweries.length > 0 && !this.isLoading
    }
  },
  watch: {
    breweries (val) {
      this.types = val.reduce((acc, cur) => {
        const type = cur.brewery_type
        if (!acc.includes(type)) { acc.push(type) }
        return acc
      }, []).sort()
    }
  },
  created () {
  },
  mounted () {
    // this.createFile()
  },
  methods: {
    createFile () {
      const filePath = '/123'
      const url = `/api/v1/editor/write/${filePath}`
      this.$axios
        .post(url)
        .then((res) => {
          console.log(res)
        })
        .catch((error) => {
          this.$toast.error(error.response.data)
        })
    },
    getChildren (type) {
      const breweries = []
      for (const brewery of this.breweries) {
        if (brewery.brewery_type !== type) { continue }

        breweries.push({
          ...brewery,
          name: this.getName(brewery.name)
        })
      }

      return breweries.sort((a, b) => {
        return a.name > b.name ? 1 : -1
      })
    },
    getName (name) {
      return `${name.charAt(0).toUpperCase()}${name.slice(1)}`
    }
  }
}
</script>
