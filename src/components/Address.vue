<template>
  <div class="row">
    <div class="col-md-2">
      <div class="mb-3">
        <label class="form-label">CEP *</label>
        <input
          type="text"
          @input="searchAddress"
          class="form-control"
          id="zipCode"
          required="required"
          v-model="address.zipCode"
        />
      </div>
    </div>
    <div class="col-md-4">
      <div class="mb-3">
        <label class="form-label">Endereço *</label>
        <input
          type="text"
          class="form-control"
          id="street"
          required="required"
          v-model="address.street"
        />
      </div>
    </div>
    <div class="col-md-3">
      <div class="mb-3">
        <label class="form-label">Bairro *</label>
        <input
          type="text"
          class="form-control"
          id="neighborhood"
          required="required"
          v-model="address.neighborhood"
        />
      </div>
    </div>
    <div class="col-md-2">
      <div class="mb-3">
        <label class="form-label">Cidade *</label>
        <input
          type="text"
          class="form-control"
          id="city"
          required="required"
          v-model="address.city"
        />
      </div>
    </div>
    <div class="col-md-1">
      <div class="mb-3">
        <label class="form-label">N *</label>
        <input
          type="text"
          class="form-control"
          id="number"
          required="required"
          v-model="address.number"
          ref="numInput"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"; // Importa a biblioteca axios para realizar requisições HTTP

export default {
  name: "address", // Define o nome do componente
  props: {
    address: Object, // Define a propriedade address que é um objeto recebido do componente pai
  },
  methods: {
    // Método para buscar o endereço baseado no CEP informado
    async searchAddress(event) {
      const cep = event.target.value; // Obtém o valor do campo de entrada do CEP

      // Verifica se o CEP tem 8 caracteres
      if (cep && cep.length === 8) {
        try {
          // Faz uma requisição GET à API do ViaCEP para obter os dados do endereço
          const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
          const addressData = response.data; // Armazena os dados do endereço retornado pela API
          console.log(addressData); // Exibe os dados do endereço no console

          // Atualiza as propriedades do objeto address com os dados retornados pela API
          this.address.zipCode = addressData.cep || "";
          this.address.street = addressData.logradouro || "";
          this.address.neighborhood = addressData.bairro || "";
          this.address.city = addressData.localidade || "";
          this.address.number = ""; // Limpa o campo de número
          this.$refs.numInput.focus(); // Coloca o foco no campo de número
        } catch (error) {
          console.error("Erro ao buscar endereço:", error); // Exibe uma mensagem de erro no console
        }
      }
    },
  },
};
</script>
