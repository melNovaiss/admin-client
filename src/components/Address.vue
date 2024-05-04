<template>
  <div class="row">
    <div class="col-md-2">
      <div class="mb-3">
        <label class="form-label">CEP *</label>
        <input type="text" @input="searchAddress" class="form-control" id="zipCode" v-model="zipCode" />
      </div>
    </div>
    <div class="col-md-4">
      <div class="mb-3">
        <label class="form-label">Endereço *</label>
        <input type="text" class="form-control" id="street" v-model="address.street" />
      </div>
    </div>
    <div class="col-md-3">
      <div class="mb-3">
        <label class="form-label">Bairro *</label>
        <input
          type="text"
          class="form-control"
          id="neighborhood"
          v-model="address.neighborhood"
        />
      </div>
    </div>
    <div class="col-md-2">
      <div class="mb-3">
        <label class="form-label">Cidade *</label>
        <input type="text" class="form-control" id="city" v-model="address.city" />
      </div>
    </div>
    <div class="col-md-1">
      <div class="mb-3">
        <label class="form-label">N *</label>
        <input
          type="text"
          class="form-control"
          id="number"
          v-model="address.number"
          ref="numInput"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "address",
  props: {
    address: Object,
  },
  methods: {
    async searchAddress(event) {
      const cep = event.target.value;

      if (cep && cep.length === 8) {
        try {
          const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
          const addressData = response.data;

          this.address.street = addressData.logradouro || "";
          this.address.neighborhood = addressData.bairro || "";
          this.address.city = addressData.localidade || "";
          this.address.number = "";
          this.$refs.numInput.focus();
        } catch (error) {
          console.error("Erro ao buscar endereço:", error);
        }
      }
    },
  },
};
</script>
