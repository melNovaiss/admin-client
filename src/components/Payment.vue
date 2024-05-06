<template>
  <div class="modal-header h-success py-2">
    <h1 class="modal-title fs-5" id="exampleModalLabel">
      Pagamento | {{ selectedBilling ? selectedBilling.companyName : "" }}
    </h1>
    <button
      type="button"
      class="btn-close"
      data-bs-dismiss="modal"
      aria-label="Close"
    ></button>
  </div>
  <div class="modal-body">
    <form class="form" method="POST" @submit.prevent="createPayment" novalidate>
      <div class="row">
        <div class="col-md-6">
          <div class="mb-3">
            <label class="form-label">Código</label>
            <input
              type="text"
              class="form-control"
              :value="selectedBilling ? selectedBilling.company : ''"
              disabled
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="mb-3">
            <label class="form-label">R$ Valor *</label>
            <input
              type="number"
              class="form-control"
              id="amountReceived"
              v-model="amountReceived"
              required="required"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="mb-3">
            <label class="form-label">Data de Pagamento *</label>
            <input
              type="date"
              class="form-control"
              id="payDate"
              v-model="payDate"
              required="required"
            />
          </div>
        </div>
        <div class="col-md-6">
          <label class="form-label">Estado do Pagamento</label>
          <select class="form-select" v-model="formOfPayment" required>
            <option selected value="DINHEIRO">Dinheiro</option>
            <option value="PIX">Pix</option>
            <option value="BOLETO">Boleto</option>
          </select>
        </div>
      </div>
      <div class="d-flex justify-content-center pt-3">
        <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Cancelar
          </button>
          <button type="submit" class="btn btn-success">Confirmar</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "payment",
  props: {
    selectedBilling: Object,
    showModal: Boolean
  },
  data() {
    return {
      company: "",
      companyName: "",
      referenceMonth: "",
      amount: "",
      dueDate: "",
      stateBilling: "",
      amountReceived: "",
      payDate: "",
      formOfPayment: "",
      formSubmitted: false,
    };
  },
  methods: {
    async createPayment() {
      this.formSubmitted = true;

      const data = {
        company: this.selectedBilling.id,
        companyName: this.selectedBilling.companyName,
        referenceMonth: this.selectedBilling.referenceMonth,
        amount: this.selectedBilling.amount,
        dueDate: this.selectedBilling.dueDate,
        stateBilling: this.selectedBilling.stateBilling,
        amountReceived: this.amountReceived,
        payDate: this.payDate,
        formOfPayment: this.formOfPayment,
      };

      try {
        let res = await axios.post("http://localhost:3000/payment", data);
        this.$emit("close-modal");
        console.log(res);
      } catch (error) {
        console.error("Erro ao fazer requisição POST:", error);
      }
    },
  },
};
</script>

<style scoped>
.fs-8 {
  font-size: 0.8rem !important;
}
.h-success {
  background-color: #157347;
  color: white;
}
</style>
