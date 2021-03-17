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
                      v-model="editedItem.customer"
                      :items="customers"
                      item-text="name"
                      item-value="_id"
                      return-object
                      :rules="[rules.required]"
                      label="Seleccione Cliente"
                  />
                </v-col>
                <v-col cols="12" sm="5">
                  <v-text-field
                      color="primary"
                      v-model="editedItem.number"
                      label="PLACA"
                      :rules="[rules.required]"
                      dense
                      outlined
                  />
                  <v-text-field
                      color="primary"
                      v-model="editedItem.marca"
                      label="Marca"
                      :rules="[rules.required]"
                      dense
                      outlined
                  />
                </v-col>
                <v-col cols="12" sm="5">
                  <v-text-field
                      color="primary"
                      v-model="editedItem.modelo"
                      label="Modelo"
                      :rules="[rules.required]"
                      dense
                      outlined
                  />
                  <v-text-field
                      color="primary"
                      v-model="editedItem.anno"
                      label="Año"
                      dense
                      outlined
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
  name: 'CustomerDialog',
  data () {
    return {
      client: {},
      saving: false,
      editedIndex: -1,
      valid: true,
      editedItem: {
        _id: '',
        customer: '',
        number: '',
        marca: '',
        modelo: '',
        anno: '',
      },
      rules: {
        required: value => !!value || 'Campo obligatorio.',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid Correo electrónico'
        },
      },

    }
  },
  methods: {
    ...mapActions('carModule',['getCars','addCar','updateCar']),
    closeDialog() {
      this.$store.commit('setDialog', false, { root: true })
    },
    validate () {
      if (this.$refs.form.validate()) {
        this.saveCar()
      }
    },
    saveCar(){
      this.saving = true;
      if (this.car._id != null) {
        this.updateCar(this.editedItem)
      } else {
        this.addCar(this.editedItem)
      }
      this.getCars()
      this.editedItem = {
        _id: '',
        customer: '',
        number: '',
        marca: '',
        modelo: '',
        anno: '',
      }
      this.$refs.form.resetValidation()
      this.closeDialog()
      // setTimeout(() => { this.closeDialog() }, 2500);
      this.saving = false;
    },
  },
  computed: {
    ...mapState(['loading', 'dialog']),
    ...mapState('carModule',['cars','car']),
    ...mapState('customerModule',['customers']),
    formTitle () {
      return this.car._id != null ? 'Editar Auto' : 'Nuevo Auto'
    },
  },
  watch: {
    'car': function() {
      if (this.car != null){
        this.editedItem = this.car;
      }
    }
  }

}
</script>

<style lang="scss" scoped>
</style>