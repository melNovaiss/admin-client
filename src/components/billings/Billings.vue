<template>
  <form class="shadow-sm mb-3 mx-5" role="search">
    <div class="input-group">
      <input
        v-model="termoBusca"
        type="text"
        class="form-control"
        placeholder="Código ou Nome"
      />
      <button class="btn btn-outline-primary" type="submit">
        <i class="bi bi-search"></i>
      </button>
    </div>
  </form>

  <div class="row">
    <div class="col-md-7">
      <p class="text-body-tertiary pt-1 mb-0">
        <i class="bi bi-list-ol"></i> {{ totalBillings }} registro(s)
      </p>
    </div>
    <div class="col-md-5">
      <Pagination
        :currentPage="currentPage"
        :totalPages="totalPages"
        @page-changed="pageChange"
      />
    </div>
  </div>

  <div class="row pb-2">
    <div class="col-md-3">
      <button
        type="button"
        class="btn btn-sm btn-outline-secondary"
        :class="{ active: activeFilter === null }"
        @click="filterByState(null)"
      >
        Todos
      </button>
    </div>
    <div class="col-md-9 d-flex justify-content-end">
      <div class="btn-group" role="group">
        <button
          type="button"
          class="btn btn-sm btn-outline-primary"
          :class="{ active: activeFilter === 'OPENED' }"
          @click="filterByState('OPENED')"
        >
          Aberto
        </button>
        <button
          type="button"
          class="btn btn-sm btn-outline-success"
          :class="{ active: activeFilter === 'PAID' }"
          @click="filterByState('PAID')"
        >
          Pago
        </button>
        <button
          type="button"
          class="btn btn-sm btn-outline-danger"
          :class="{ active: activeFilter === 'EXPIRED' }"
          @click="filterByState('EXPIRED')"
        >
          Expirado
        </button>
      </div>
    </div>
  </div>

  <div class="shadow-sm tb_height" v-if="totalBillings > 0">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Empresas</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="b in billingsList" :key="b.id">
          <td @click="selectedBilling(b)">
            <div class="container">
              <div class="row">
                <div class="col-2 fs-6">
                  {{ b.id }}
                </div>
                <div class="col-10 fs-6">
                  {{ b.companyName }}
                </div>
              </div>
              <div class="row">
                <div class="col-2 text-muted fs-7">Mês: {{ b.referenceMonth }}</div>
                <div class="col-2 text-muted fs-7">R$ {{ b.amount }}</div>
                <div class="col-3 text-muted fs-7">
                  {{ b.dueDate }}
                </div>
                <div class="col-4 text-muted fs-7">Status: {{ b.stateBilling }}</div>
                <!-- <div class="col-2 text-muted fs-7">
                  {{ paymentList.formOfPayment }}
                </div> -->
              </div>
            </div>
          </td>
          <td>
            <div v-if="b.stateBilling !== 'PAID'" class="d-flex justify-content-end">
              <div class="btn-group" role="group" aria-label="Basic outlined example">
                <button
                  type="button"
                  class="btn btn-success text-white"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  @click="selectedPayment(b)"
                >
                  <i class="bi bi-cash-coin"></i>
                </button>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      v-show="showModal"
      @hidden="showModal = false"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <Payment
            :selectedBilling="selectedBillingData"
            :showModal="showModal"
            @close-modal="showModal = false"
          />
        </div>
      </div>
    </div>
  </div>

  <div class="text-center" v-else>
    <span><i class="bi bi-x-circle text-danger"></i> Não há itens cadastrados.</span>
  </div>
</template>

<script>
import Pagination from "../Pagination.vue";
import Payment from "../Payment.vue";
import axios from "axios";

export default {
  name: "BillingsList",
  components: {
    Pagination,
    Payment,
  },
  data() {
    return {
      billingsList: [],

      currentPage: 1,
      pageSize: 7,
      totalBillings: 0,
      billing: [],
      termoBusca: "",
      billingToDeleteId: null,
      showModal: false,
      selectedBillingData: null,
      activeFilter: null,
    };
  },
  methods: {
    selectedBilling(billing) {
      this.$emit("billing-selected", billing);
    },

    selectedPayment(billing) {
      this.selectedBillingData = billing; // Definir os dados da cobrança clicada
      this.showModal = true; // Abrir o modal
    },

    // Função para atualizar a lista de clientes exibidos com base na página atual
    updateBilling() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = Math.min(startIndex + this.pageSize, this.totalBillings);
      this.billingsList = this.billingsList.slice(startIndex, endIndex);
    },

    // Função para a alteração de página
    pageChange(page) {
      this.currentPage = page;
      this.updateBilling();
    },

    async getBillings() {
      const url = "http://localhost:3000/billings";
      try {
        const res = await axios.get(url);
        this.billingsList = res.data;
        this.totalBillings = this.billingsList.length;
        this.totalPages = Math.ceil(this.totalBillings / this.pageSize);
        this.updateBilling();
      } catch (error) {
        console.error("Erro ao obter cobranças:", error);
      }
    },

    async filterByState(state) {
      this.activeFilter = state;
      try {
        let res;
        if (state) {
          res = await axios.get(`http://localhost:3000/billings?stateBilling=${state}`);
        } else {
          res = await axios.get("http://localhost:3000/billings");
        }
        this.billingsList = res.data;
        this.totalBillings = this.billingsList.length;
        this.totalPages = Math.ceil(this.totalBillings / this.pageSize);
        this.updateBilling();
      } catch (error) {
        console.error("Erro ao filtrar cobranças:", error);
      }
    },
  },
  mounted() {
    this.getBillings();
  },
};
</script>

<style scoped>
.fs-7 {
  font-size: 0.9rem !important;
}
.form-control {
  background-color: #f6f9ff;
}
</style>
