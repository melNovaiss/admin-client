<template>
  <form
    class="form"
    method="POST"
    @submit.prevent="createBillings"
    :class="{ 'was-validated': formSubmitted && areRequiredFieldsEmpty() }"
    novalidate
  >
    <div class="row">
      <div class="col-md-2">
        <div class="mb-3">
          <label class="form-label">Código</label>
          <input
            type="text"
            class="form-control"
            id="company"
            v-model="company"
            disabled
          />
        </div>
      </div>
      <div class="col-md-6">
        <div class="mb-3">
          <label class="form-label">Razão Social <i class="bi bi-search px-2"></i></label>
          <input
            type="text"
            class="form-control"
            id="companyName"
            v-model="companyName"
          />
        </div>
      </div>
      <div class="col-md-2">
        <div class="mb-3">
          <label class="form-label">Mês de Refer. *</label>
          <input
            type="number"
            class="form-control"
            id="referenceMonth"
            v-model="referenceMonth"
            required
          />
        </div>
      </div>
      <div class="col-md-2">
        <div class="mb-3">
          <label class="form-label">R$ Valor *</label>
          <input
            type="number"
            class="form-control"
            id="amount"
            v-model="amount"
            required
          />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3">
        <div class="mb-3">
          <label class="form-label">Data de Vencimento *</label>
          <input
            type="date"
            class="form-control"
            id="dueDate"
            v-model="dueDate"
            required
          />
        </div>
      </div>
      <div class="col-md-3">
        <label class="form-label">Estado do Pagamento *</label>
        <select class="form-select" v-model="stateBilling" required>
          <option selected value="OPENED">Aberto</option>
          <option value="PAID">Pago</option>
          <option value="EXPIRED">Expirado</option>
        </select>
      </div>
    </div>
    <div class="d-flex justify-content-end">
      <button
        type="button"
        class="btn btn-danger mx-2"
        @click="deleteBilling"
        v-if="selectedBilling"
      >
        Excluir
      </button>
      <div class="btn-group" role="group">
        <button type="button" class="btn btn-secondary" @click="resetForm">
          Cancelar
        </button>
        <button type="submit" class="btn btn-purple2">Salvar</button>
      </div>
    </div>
  </form>
</template>

<script>
import axios from "axios";
export default {
  name: "billingsForm",
  props: {
    selectedBilling: Object,
  },
  data() {
    return {
      company: "",
      companyName: "",
      referenceMonth: "",
      amount: "",
      dueDate: "",
      stateBilling: "",
      formSubmitted: false,
    };
  },
  watch: {
    // Monitora as mudanças na propriedade selectedBilling
    selectedBilling: {
      handler(newVal, oldVal) {
        if (newVal) {
          // Atualiza os dados do formulário com os dados do cobrança selecionado
          this.company = newVal.id || "";
          this.companyName = newVal.companyName || "";
          this.referenceMonth = newVal.referenceMonth || "";
          this.amount = newVal.amount || "";
          this.dueDate = newVal.dueDate || "";
          this.stateBilling = newVal.stateBilling || "";
        } else {
          this.resetForm();
        }
      },
      immediate: true, // Atualiza imediatamente quando a propriedade é inicializada
    },
  },
  methods: {
    areRequiredFieldsEmpty() {
      if (
        !this.company ||
        !this.companyName ||
        !this.referenceMonth ||
        !this.amount ||
        !this.dueDate ||
        !this.stateBilling
      ) {
        return true;
      }
      return false;
    },

    async createBillings() {
      this.formSubmitted = true;

      const data = {
        company: this.company,
        companyName: this.companyName,
        referenceMonth: this.referenceMonth,
        amount: this.amount,
        dueDate: this.dueDate,
        stateBilling: this.stateBilling,
      };

      try {
        let res;
        if (this.selectedBilling) {
          res = await axios.put(
            `http://localhost:3000/billings/${this.selectedBilling.id}`,
            data
          );
        } else {
          res = await axios.post("http://localhost:3000/billings", data);
          console.log("data");
        }

        this.$emit("billingCriado");
        this.resetForm();
        // this.$router.push("/billings");
        this.$emit("billing-selected", null);
        console.log(res);
      } catch (error) {
        console.log(error.response);
      }
    },

    async deleteBilling() {
      try {
        if (this.selectedBilling) {
          await axios.delete(
            `http://localhost:3000/companies/${this.selectedBilling.id}`
          );
          this.$emit("billingDeletado");
          this.resetForm();
          this.$emit("billing-selected", null);
        }
      } catch (error) {
        console.error("Erro ao excluir combrança:", error);
      }
    },

    resetForm() {
      this.$emit("billing-selected", null);
      this.company = "";
      this.companyName = "";
      this.referenceMonth = "";
      this.amount = "";
      this.dueDate = "";
      this.stateBilling = "";
      this.formSubmitted = false;
    },
  },
};
</script>
