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
import { formatarCel, formatarTel } from "../assets/js/mask.js";

export default {
  name: "Contact",
  props: {
    contact: Object,
  },
  methods: {
    formatarCel() {
      this.contact.whatsapp = formatarCel(this.contact.whatsapp);
    },
    formatarTel() {
      this.contact.phone = formatarTel(this.contact.phone);
    },
  },
};
</script>
