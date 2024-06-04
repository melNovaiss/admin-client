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
                <div class="col-7 text-muted fs-7">
                  {{ c.tradeName }}
                </div>
              </div>
              <div class="row">
                <div class="col-5 text-black-50 fs-8">Tipo: {{ c.clientType }}</div>
                <div class="col-4 text-black-50 fs-8">Versão: {{ c.bigVersion }}</div>
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
import Pagination from "../Pagination.vue"; // Importa o componente de paginação
import axios from "axios"; // Importa a biblioteca axios para realizar requisições HTTP

export default {
  name: "CliList",
  components: {
    Pagination, // Declara o componente de paginação como um componente filho
  },
  data() {
    return {
      cliList: [], // Lista de clientes
      currentPage: 1, // Página atual da paginação
      pageSize: 7, // Tamanho da página (quantidade de itens por página)
      totalClients: 0, // Total de clientes
      client: [], // Dados do cliente
      termoBusca: "", // Termo de busca para filtrar clientes
      clienteToDeleteId: null, // ID do cliente a ser deletado
      showModal: false, // Controle de visibilidade do modal
    };
  },
  methods: {
    // Emite um evento para informar o cliente selecionado
    selectClient(client) {
      this.$emit("client-selected", client);
    },

    // Atualiza a lista de clientes exibidos com base na página atual
    updateCli() {
      const startIndex = (this.currentPage - 1) * this.pageSize; // Índice inicial da página atual
      const endIndex = Math.min(startIndex + this.pageSize, this.totalClients); // Índice final da página atual
      this.cliList = this.cliList.slice(startIndex, endIndex); // Atualiza a lista de clientes exibidos
    },

    // Altera a página atual e atualiza a lista de clientes
    pageChange(page) {
      this.currentPage = page; // Atualiza a página atual
      this.updateCli(); // Atualiza a lista de clientes exibidos
    },

    // Obtém a lista de clientes do servidor
    async getClientes() {
      const url = "http://localhost:3000/companies"; // URL da API para obter clientes
      try {
        const res = await axios.get(url); // Faz uma requisição GET para a API
        this.cliList = res.data; // Atualiza a lista de clientes com os dados recebidos
        this.totalClients = this.cliList.length; // Atualiza o total de clientes
        this.totalPages = Math.ceil(this.totalClients / this.pageSize); // Calcula o total de páginas
        this.updateCli(); // Atualiza a lista de clientes exibidos
      } catch (error) {
        console.error("Erro ao obter clientes:", error); // Exibe uma mensagem de erro no console
      }
    },
  },
  mounted() {
    this.getClientes(); // Chama a função para obter clientes quando o componente é montado
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
