<template>
  <div class="container-fluid">
    <div class="row py-4">
      <div class="col-md-4 pe-0">
        <BillingsList @billing-selected="handleBillingSelected" ref="billingsList"/>
        <!-- <CliList @client-selected="handleClientSelected" ref="cliList" /> -->
      </div>
      <div class="col-md-8">
        <div class="card border-light shadow-sm">
          <div class="card-body">
            <BillingsForm
              :selectedBilling="selectedBilling"
              @billingDeletado="handleBillingDeletado"
              @billing-selected="handleBillingSelectedForm"
              @billingCriado="handleBillingCriado"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import CliList from "../components/client/Client.vue";
import BillingsList from "../components/billings/Billings.vue";
import BillingsForm from "../components/billings/BillingsForm.vue";

export default {
  name: "billings",
  components: {
    // CliList,
    BillingsList,
    BillingsForm,
  },
  data() {
    return {
      selectedBilling: null,
    };
  },
  methods: {
    handleBillingCriado() {
      // Atualize a lista de clientes aqui
      this.$refs.billingsList.getBillings();
    },
    handleBillingDeletado() {
      // Atualize a lista de clientes aqui
      this.$refs.billingsList.getBillings();
    },
    handleBillingSelected(billings) {
      // Atualize a variável selectedClient com os dados do cliente selecionado
      this.selectedBilling = billings;
      console.log(billings);
    },
    handleBillingSelectedForm(billings) {
      // Este manipulador de eventos é para limpar a seleção do cliente no formulário
      // Quando o evento 'client-selected' é emitido pelo componente CliForm
      if (!billings) {
        this.selectedBilling = null;
      }
    },
  },
};
</script>
