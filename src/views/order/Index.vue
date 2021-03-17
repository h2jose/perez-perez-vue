<template>
  <Layout>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="9">
          <v-data-table
              :loading="loading"
              :headers="headers"
              :items="orders"
              :search="search"
          >
            <!-- slot Top table -->
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title><h2><v-icon large class="mr-2">mdi-alert</v-icon>GESTIÓN DE ORDENES DE SERVICIO</h2></v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
              </v-toolbar>
              <v-toolbar flat color="white">
                <v-toolbar-items>
                  <v-text-field
                      v-model="search"
                      append-icon="mdi-magnify"
                      label="Buscar"
                      single-line
                      hide-details
                  />
                </v-toolbar-items>
                <v-spacer></v-spacer>
                <v-btn class="mt-2" fab dark color="primary" @click.stop="newOrder">
                  <v-icon dark>mdi-plus</v-icon>
                </v-btn>
              </v-toolbar>
            </template>
            <!-- columna accion -->
            <template v-slot:item.action="{ item }">
              <v-icon
                  class="action_button"
                  @click.stop="editOrder(item)"
              >
                mdi-file-edit
              </v-icon>
              <v-icon
                  class="action_button"
                  @click="removeOrder(item)"
                  color="red"
              >
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>

    <order-dialog />

  </Layout>
</template>

<script>
import axios from 'axios';
import { mapState, mapActions } from "vuex";
import store from '@/store'
import OrderDialog from '@/components/dialog/OrderDialog.vue'
const header = {"Token": store.state.userModule.token}
const configuration = {headers: header}

export default {
  name: 'OrderView',
  components: { OrderDialog },
  data: ()=>({
    search: '',
    headers: [
      { text: 'FECHA', value: 'createdAt' },
      { text: 'AUTO', align: 'start', value: 'car.number', width: '25%'},
      { text: 'ESTATUS', value: 'status' },
      {text: '', value: 'action', sortable: false,align: 'end', },
    ],
    items: [],
    editedIndex: -1,
    editedItem: [{
      _id: '',
      car: '',
      notes: '',
      status: '',
    }],

  }),
  created(){
    this.getOrders()
    this.getCars()
  },
  methods: {
    ...mapActions('orderModule',['getOrders','deleteOrder']),
    ...mapActions('carModule',['getCars']),
    newOrder(){
      this.$store.commit('orderModule/SET_ORDER', [], { root: true } )
      this.$store.commit('setDialog', true, { root: true })
    },
    editOrder(item){
      this.editedItem = Object.assign({}, item)
      this.$store.commit('orderModule/SET_ORDER', this.editedItem, { root: true } )
      this.$store.commit('setDialog', true, { root: true })
    },
    async removeOrder(item){
      await this.$confirm('Realmente quiere eliminar definitivamente est Orden?', {
        title: 'Warning',
        color: 'error',
        icon: 'mdi-hand',
        buttonTrueColor: 'primary',
      })
          .then(res => {
            if (res){
              const id = item._id
              this.deleteOrder(id)
              const index = this.orders.findIndex(item => item._id === id);
              this.orders.splice(index, 1);
            }
          })
    },


  },
  computed: {
    ...mapState(['loading']),
    ...mapState('orderModule',['orders','order']),
    ...mapState('carModule',['cars']),
  },


}
</script>

<style lang="scss" scoped>
.action_button {
  margin: 0px 10px 10px 0px;
  font-size: xx-large;
}

</style>