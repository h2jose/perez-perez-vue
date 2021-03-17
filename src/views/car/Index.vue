<template>
  <Layout>
    <v-container>
      <v-row>
        <v-col>
          <v-data-table
              :loading="loading"
              :headers="headers"
              :items="carsList"
              :search="search"
          >
            <!-- slot Top table -->
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title><h2><v-icon large class="mr-2">mdi-card-text</v-icon>GESTIÓN DE AUTOS</h2></v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-btn class="mt-2" fab dark color="primary" @click.stop="newCar">
                  <v-icon dark>mdi-plus</v-icon>
                </v-btn>
              </v-toolbar>
              <v-toolbar flat color="white">
                <v-select
                    class="mt-2"
                    v-model="client"
                    :items="customersList"
                    item-text="name"
                    item-value="_id"
                    return-object
                    label="Filtrar por Cliente"
                    @change="changeClient"
                />

                <v-spacer />
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Buscar"
                  single-line
                  hide-details
                />
              </v-toolbar>
            </template>
            <!-- columna accion -->
            <template v-slot:item.action="{ item }">
              <v-icon
                  class="action_button"
                  @click.stop="editCar(item)"
              >
                mdi-file-edit
              </v-icon>
              <v-icon
                  class="action_button"
                  @click="removeCar(item)"
                  color="red"
              >
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>

    <car-dialog />

  </Layout>
</template>

<script>
import axios from 'axios';
import { mapState, mapActions } from "vuex";
import store from '@/store'
import CarDialog from '@/components/dialog/CarDialog.vue'
const header = {"Token": store.state.userModule.token}
const configuration = {headers: header}

export default {
  name: 'CarView',
  components: { CarDialog },
  data: ()=>({
    customersList: [],
    carsList: [],
    client: '',
    search: '',
    headers: [
      { text: 'CLIENTE', align: 'start', value: 'customer.name', width: '25%'},
      { text: 'PLACA', value: 'number' },
      { text: 'MARCA', value: 'marca' },
      { text: 'MODELO', value: 'modelo', },
      { text: 'AÑO', value: 'anno'},
      {text: '', value: 'action', sortable: false,align: 'end', },
    ],
    items: [],
    editedIndex: -1,
    editedItem: [{
      _id: '',
      customer: '',
      number: '',
      marca: '',
      modelo: '',
      anno: '',
    }],

  }),
  created(){
    this.getCars()
    this.getCustomers()
  },
  methods: {
    ...mapActions('carModule',['getCars','deleteCar']),
    ...mapActions('customerModule',['getCustomers']),
    newCar(){
      this.$store.commit('carModule/SET_CAR', [], { root: true } )
      this.$store.commit('setDialog', true, { root: true })
    },
    editCar(item){
      this.editedItem = Object.assign({}, item)
      this.$store.commit('carModule/SET_CAR', this.editedItem, { root: true } )
      this.$store.commit('setDialog', true, { root: true })
    },
    async removeCar(item){
      await this.$confirm('Realmente quiere eliminar definitivamente este auto?', {
        title: 'Warning',
        color: 'error',
        icon: 'mdi-hand',
        buttonTrueColor: 'primary',
      })
        .then(res => {
          if (res){
            const id = item._id
            this.deleteCar(id)
            const index = this.cars.findIndex(item => item._id === id);
            this.cars.splice(index, 1);
          }
        })
    },
    changeClient(selectObj) {
      if (selectObj._id == 0) {
        this.carsList = this.cars
      } else {
        this.carsList = this.cars.filter( x => x.customer._id == selectObj._id)
      }
    }


  },
  computed: {
    ...mapState(['loading']),
    ...mapState('carModule',['cars','car']),
    ...mapState('customerModule',['customers']),
  },
  watch: {
    'customers': function () {
      this.customersList = [
        {
          '_id': '0',
          'name': 'Todos'
        }
      ]
      this.customersList.push( ...this.customers);
    },
    'cars': function () {
      this.carsList = this.cars;
    }
  },

}
</script>

<style lang="scss" scoped>
.action_button {
  margin: 0px 10px 10px 0px;
  font-size: xx-large;
}

</style>