<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" fullscreen  transition="dialog-bottom-transition" >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ formTitle }} </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn :loading="saving" dark text @click.stop="validate()" > <v-icon color="white">mdi-check-circle</v-icon> Guardar</v-btn>
            <v-btn dark text @click="closeDialog"> <v-icon color="white">mdi-close</v-icon> Cancelar</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-container class="pt-5">
            <v-form ref="form" v-model="valid">
              <v-row justify="center">
                <v-col cols="12" sm="8">
                  <v-select
                      class="mt-2"
                      v-model="editedItem.car"
                      :items="cars"
                      item-text="number"
                      item-value="_id"
                      return-object
                      :rules="[rules.required]"
                      label="Seleccione Auto"
                  />
                </v-col>
                <v-col cols="12" sm="5">
                  <v-textarea
                      outlined
                      prepend-icon="mdi-map-marker-radius-outline"
                      v-model="editedItem.notes"
                      label="Detalle del Servicio"
                      :value="editedItem.notes"
                      rows="3"
                      :rules="[rules.required]"
                  />
                  <v-select
                      v-model="editedItem.status"
                      :items="['PENDIENTE','PROCESANDO','CERRADA']"
                      prepend-icon="mdi-focus-field"
                      menu-props="auto"
                      hide-details
                      label="Seleccione Estatus"
                  />
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import {mapState, mapActions} from 'vuex';
export default {
  name: 'OrderDialog',
  data () {
    return {
      client: {},
      saving: false,
      editedIndex: -1,
      valid: true,
      editedItem: {
        _id: '',
        car: '',
        notes: '',
        status: ''
      },
      rules: {
        required: value => !!value || 'Campo obligatorio.',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        },
      },

    }
  },
  methods: {
    ...mapActions('orderModule',['getOrders','addOrder','updateOrder']),
    closeDialog() {
      this.$store.commit('setDialog', false, { root: true })
    },
    validate () {
      if (this.$refs.form.validate()) {
        this.saveOrder()
      }
    },
    saveOrder(){
      this.saving = true;
      if (this.order._id != null) {
        this.updateOrder(this.editedItem)
      } else {
        this.addOrder(this.editedItem)
      }
      this.getOrders()
      this.editedItem = {
        _id: '',
        car: '',
        notes: '',
        status: ''
      }
      this.$refs.form.resetValidation()
      this.closeDialog()
      this.saving = false;
    },
  },
  computed: {
    ...mapState(['loading', 'dialog']),
    ...mapState('orderModule',['orders','order']),
    ...mapState('carModule',['cars']),
    formTitle () {
      return this.order._id != null ? 'Editar Orden' : 'Nuevo Orden'
    },
  },
  watch: {
    'order': function() {
      if (this.order != null){
        this.editedItem = this.order;
      }
    },

  }

}
</script>

<style lang="scss" scoped>
</style>