<template>
  <div class="row">
    <div class="col-md-3">
      <div class="mb-3">
        <label class="form-label">Telefone</label>
        <input
          type="text"
          class="form-control"
          id="phone"
          maxlength="10"
          v-model="contact.phone"
          @input="formatarTel"
        />
      </div>
    </div>
    <div class="col-md-3">
      <div class="mb-3">
        <label class="form-label">Celular *</label>
        <input
          type="text"
          class="form-control"
          id="whatsapp"
          maxlength="11"
          required="required"
          v-model="contact.whatsapp"
          @input="formatarCel"
        />
      </div>
    </div>
    <div class="col-md-6">
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input
          type="text"
          class="form-control"
          id="email"
          required="required"
          v-model="contact.email"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { formatarCel, formatarTel } from "../assets/js/mask.js"; // Importa as funções de formatação de celular e telefone

export default {
  name: "Contact", // Define o nome do componente
  props: {
    contact: Object, // Define a propriedade contact que é um objeto recebido do componente pai
  },
  methods: {
    // Método para formatar o número de celular (WhatsApp)
    formatarCel() {
      this.contact.whatsapp = formatarCel(this.contact.whatsapp); // Aplica a formatação ao número de WhatsApp
    },
    // Método para formatar o número de telefone
    formatarTel() {
      this.contact.phone = formatarTel(this.contact.phone); // Aplica a formatação ao número de telefone
    },
  },
};
</script>
