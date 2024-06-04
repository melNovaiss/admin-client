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
          <label class="form-label">Razão Social</label>
          <input
            type="text"
            class="form-control"
            placeholder="Digite para pesquisar"
            id="companyName"
            v-model="companyName"
            @input="onInput"
            autocomplete="off"
            ref="companyInput"
          />
          <div
            class="bootstrap-autocomplete dropdown-menu show shadow"
            v-if="suggestions.length"
            :style="{ width: $refs.companyInput.offsetWidth + 'px' }"
          >
            <a
              class="dropdown-item"
              v-for="(suggestion, index) in suggestions"
              :key="index"
              @click="selectSuggestion(suggestion)"
              style="overflow: hidden; text-overflow: ellipsis"
            >
              <div class="form-row small text-gray-700 p-0">
                <div class="col-6">{{ suggestion.companyName }}</div>
                <div class="col-6 text-right">{{ suggestion.someValue }}</div>
              </div>
              <div class="form-row border-bottom p-0">
                <div class="col-12 font-weight-bolder">{{ suggestion.category }}</div>
              </div>
            </a>
          </div>
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
    selectedBilling: Object, // Propriedade recebida do componente pai, contendo os dados da cobrança selecionada
  },
  data() {
    return {
      company: "", // ID da empresa
      companyName: "", // Nome da empresa
      referenceMonth: "", // Mês de referência
      amount: "", // Valor da cobrança
      dueDate: "", // Data de vencimento
      stateBilling: "", // Estado da cobrança
      formSubmitted: false, // Indicador se o formulário foi submetido
      suggestions: [], // Sugestões de empresas baseadas na pesquisa
    };
  },
  watch: {
    selectedBilling: {
      handler(newVal, oldVal) {
        if (newVal) {
          // Atualiza os dados do formulário com os dados da cobrança selecionada
          this.company = newVal.id || "";
          this.companyName = newVal.companyName || "";
          this.referenceMonth = newVal.referenceMonth || "";
          this.amount = newVal.amount || "";
          this.dueDate = newVal.dueDate || "";
          this.stateBilling = newVal.stateBilling || "";
        } else {
          this.resetForm(); // Reseta o formulário se não houver cobrança selecionada
        }
      },
      immediate: true, // Executa o handler imediatamente quando a propriedade é inicializada
    },
  },
  methods: {
    // Método chamado quando há entrada no campo de nome da empresa
    onInput() {
      this.searchCompany(this.companyName); // Chama a função de busca de empresas com o nome digitado
    },

    // Verifica se há campos obrigatórios vazios no formulário
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

    // Cria ou atualiza uma cobrança
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
          // Atualiza a cobrança existente se houver uma cobrança selecionada
          res = await axios.put(
            `http://localhost:3000/billings/${this.selectedBilling.id}`,
            data
          );
        } else {
          // Cria uma nova cobrança se não houver uma cobrança selecionada
          res = await axios.post("http://localhost:3000/billings", data);
          console.log("data");
        }

        this.$emit("billingCriado"); // Emite um evento para informar que a cobrança foi criada
        this.resetForm(); // Reseta o formulário após a criação ou atualização
        this.$emit("billing-selected", null); // Reseta a cobrança selecionada
        console.log(res);
      } catch (error) {
        console.log(error.response);
      }
    },

    // async deleteBilling() {
    //   try {
    //     if (this.selectedBilling) {
    //       await axios.delete(
    //         `http://localhost:3000/companies/${this.selectedBilling.id}`
    //       );
    //       this.$emit("billingDeletado");
    //       this.resetForm();
    //       this.$emit("billing-selected", null);
    //     }
    //   } catch (error) {
    //     console.error("Erro ao excluir combrança:", error);
    //   }
    // },

    // Busca empresas com base no nome fornecido
    async searchCompany(name) {
      if (name.length >= 3) {
        console.log(name);
        try {
          const response = await axios.get(
            `http://localhost:3000/companies?companyName_like=${name}`
          );
          this.suggestions = response.data; // Atualiza a lista de sugestões com os dados retornados
          console.log(response.data);
        } catch (error) {
          console.error("Erro ao buscar empresa:", error);
        }
      } else {
        this.suggestions = []; // Limpa as sugestões se o nome for muito curto
      }
    },

    // Seleciona uma sugestão de empresa e preenche os campos do formulário
    selectSuggestion(suggestion) {
      this.company = suggestion.id || "";
      this.companyName = suggestion.companyName || "";
      this.suggestions = []; // Limpa as sugestões após a seleção
    },

    // Reseta os campos do formulário
    resetForm() {
      this.$emit("billing-selected", null); // Emite um evento para resetar a cobrança selecionada
      this.company = "";
      this.companyName = "";
      this.referenceMonth = "";
      this.amount = "";
      this.dueDate = "";
      this.stateBilling = "";
      this.formSubmitted = false; // Reseta o indicador de formulário submetido
    },
  },
};
</script>

<style scoped>
.bootstrap-autocomplete {
  width: 21rem;
  margin-top: 5px;
}
</style>
