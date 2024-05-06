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
      <!-- <button class="btn btn-outline-success" type="button" @click="resetForm()">
        Incluir
      </button> -->
    </div>
  </form>
  <div class="row">
    <div class="col-md-7">
      <p class="text-body-tertiary pt-1 mb-0">
        <i class="bi bi-list-ol"></i> {{ totalClients }} registro(s)
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
  <div class="shadow-sm tb_height" v-if="totalClients > 0">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Cliente</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="c in cliList" :key="c.id" @click="selectClient(c)">
          <td>
            <div class="container">
              <div class="row">
                <div class="col-2 fs-6">
                  {{ c.id }}
                </div>
                <div class="col-10 fs-6">
                  {{ c.companyName }}
                </div>
              </div>
              <div class="row">
                <div class="col-5 text-muted fs-7">
                  {{ c.cpfCnpj }}
                </div>
                <div class="col-6 text-muted fs-7">
                  {{ c.tradeName }}
                </div>
              </div>
              <div class="row">
                <div class="col-3 text-black-50 fs-8">
                  Tipo: {{ c.clientType }}
                </div>
                <div class="col-2 text-black-50 fs-8">
                 Versão:  {{ c.bigVersion }}
                </div>
                <!-- <div class="col-2 text-black-50 fs-8">
                  {{ c.active }}
                </div>
                <div class="col-2 text-black-50 fs-8">
                  {{ c.released }}
                </div> -->
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="text-center" v-else>
    <span><i class="bi bi-x-circle text-danger"></i> Não há itens cadastrados.</span>
  </div>
</template>

<script>
import Pagination from "../Pagination.vue";
import axios from "axios";

export default {
  name: "CliList",
  components: {
    Pagination,
  },
  data() {
    return {
      cliList: [],
      currentPage: 1,
      pageSize: 7,
      totalClients: 0,
      client: [],
      termoBusca: "",
      clienteToDeleteId: null,
      showModal: false,
    };
  },
  methods: {
    selectClient(client) {
      this.$emit("client-selected", client);
    },
    // Função para atualizar a lista de clientes exibidos com base na página atual
    updateCli() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = Math.min(startIndex + this.pageSize, this.totalClients);
      this.cliList = this.cliList.slice(startIndex, endIndex);
    },
    // Função para a alteração de página
    pageChange(page) {
      this.currentPage = page;
      this.updateCli();
    },

    async getClientes() {
      const url = "http://localhost:3000/companies";
      try {
        const res = await axios.get(url);
        this.cliList = res.data; // Ajuste aqui
        this.totalClients = this.cliList.length; // Ajuste aqui
        this.totalPages = Math.ceil(this.totalClients / this.pageSize);
        this.updateCli();
      } catch (error) {
        console.error("Erro ao obter clientes:", error);
      }
    },
  },
  mounted() {
    this.getClientes();
  },
};
</script>

<style scoped>
.fs-7 {
  font-size: 0.9rem !important;
}
.fs-8 {
  font-size: 0.8rem !important;
}
.form-control {
  background-color: #f6f9ff;
}
.h-danger {
  background-color: #dc3545;
  color: white;
}
</style>
