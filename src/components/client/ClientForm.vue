<template>
  <form
    class="form"
    method="POST"
    @submit.prevent="createCli"
    :class="{ 'was-validated': formSubmitted && areRequiredFieldsEmpty() }"
    novalidate
  >
    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          class="nav-link active"
          id="pills-detalhes-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-detalhes"
          type="button"
          role="tab"
          aria-controls="pills-detalhes"
          aria-selected="true"
        >
          Detalhes
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="pills-ender-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-ender"
          type="button"
          role="tab"
          aria-controls="pills-ender"
          aria-selected="false"
        >
          Endereço
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="pills-contat-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-contat"
          type="button"
          role="tab"
          aria-controls="pills-contat"
          aria-selected="false"
        >
          Contato
        </button>
      </li>
    </ul>
    <div class="tab-content" id="pills-tabContent">
      <div
        class="tab-pane fade show active pb-2"
        id="pills-detalhes"
        role="tabpanel"
        aria-labelledby="pills-detalhes-tab"
        tabindex="0"
      >
        <div class="row">
          <div class="col-md-2">
            <div class="mb-3">
              <label class="form-label">Código</label>
              <input type="text" class="form-control" id="id" v-model="id" disabled />
            </div>
          </div>
          <div class="col-md-4">
            <label class="form-label">CPF/CNPJ *</label>
            <div class="input-group mb-3">
              <span class="input-group-text shadow-sm">
                <i
                  :class="
                    typeof cpfCnpj === 'string' && cpfCnpj.length <= 14
                      ? 'bi bi-person-fill'
                      : 'bi bi-building-fill'
                  "
                  required="required"
                ></i>
              </span>
              <input
                type="text"
                class="form-control"
                id="cpfCnpj"
                v-model="cpfCnpj"
                @input="formatarCpfCnpj"
                required="required"
                maxlength="18"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="mb-3">
              <label class="form-label">Razão Social *</label>
              <input
                type="text"
                class="form-control"
                id="companyName"
                v-model="companyName"
                required="required"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="mb-3">
              <label class="form-label">Nome Fantasia *</label>
              <input
                type="text"
                class="form-control"
                id="tradeName"
                v-model="tradeName"
                required="required"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="mb-3">
              <label class="form-label">Nome do Responsavel *</label>
              <input
                type="text"
                class="form-control"
                id="contactName"
                v-model="contactName"
                required="required"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3">
            <div class="mb-3">
              <label class="form-label">IE *</label>
              <input
                type="number"
                maxlength="9"
                class="form-control"
                id="stateRegistration"
                v-model="stateRegistration"
                required="required"
              />
            </div>
          </div>
          <div class="col-md-2">
            <div class="mb-3">
              <label class="form-label">Dia de venc. *</label>
              <input
                type="number"
                class="form-control"
                id="dueDate"
                v-model="dueDate"
                required="required"
              />
            </div>
          </div>
          <div class="col-md-2">
            <div class="mb-3">
              <label class="form-label">Pontos *</label>
              <input
                type="number"
                class="form-control"
                id="points"
                v-model="points"
                required="required"
              />
            </div>
          </div>
          <div class="col-md-3">
            <div class="mb-3">
              <label class="form-label">Preço da Licença atual *</label>
              <input
                type="number"
                class="form-control"
                id="stateRegistration"
                v-model="currentLicensePrice"
                required="required"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3">
            <label class="form-label">Tipo de Cliente</label>
            <select class="form-select" v-model="clientType" required>
              <option selected value="VAREJO">Varejo</option>
              <option value="ATACADO">Atacado</option>
              <option value="ATACAREJO">Atacarejo</option>
              <option value="RESTAURANTE">Restaurante</option>
              <option value="DEP_CONSTRUCAO">Depósito de construção</option>
            </select>
          </div>
          <div class="col-md-3">
            <label class="form-label">Taxa de Regime</label>
            <select class="form-select" v-model="taxRegime" required>
              <option selected value="LUCRO_REAL">Lucro Real</option>
              <option value="LUCRO_PRESUMIDO">Lucro Presumido</option>
              <option value="SIMPLES_NACIONAL">Simples Nacional</option>
            </select>
          </div>
          <div class="col-md-3">
            <label class="form-label">BIG Versão</label>
            <select class="form-select" v-model="bigVersion" required>
              <option selected value="V2">V2</option>
              <option value="V4">V4</option>
              <option value="V5">V5</option>
              <option value="CLOUD">CLOUD</option>
            </select>
          </div>
        </div>
      </div>
      <div
        class="tab-pane fade"
        id="pills-ender"
        role="tabpanel"
        aria-labelledby="pills-ender-tab"
        tabindex="0"
      >
        <Address :address="address" />
      </div>
      <div
        class="tab-pane fade"
        id="pills-contat"
        role="tabpanel"
        aria-labelledby="pills-contat-tab"
        tabindex="0"
      >
        <Contact :contact="contact" />
      </div>
    </div>

    <div class="d-flex justify-content-end">
      <button
        type="button"
        class="btn btn-danger mx-2"
        @click="deleteClient"
        v-if="selectedClient"
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
import axios from "axios"; // Importa a biblioteca axios para realizar requisições HTTP
import { formatarCpfCnpj } from "../../assets/js/mask"; // Importa a função para formatar CPF/CNPJ
import Address from "@/components/Address.vue"; // Importa o componente de endereço
import Contact from "@/components/Contact.vue"; // Importa o componente de contato

export default {
  name: "CliForm",
  components: {
    Address, // Declara o componente de endereço como um componente filho
    Contact, // Declara o componente de contato como um componente filho
  },
  props: {
    selectedClient: Object, // Propriedade recebida do componente pai
  },
  data() {
    return {
      // Inicializa os dados do formulário
      cpfCnpj: "",
      companyName: "",
      tradeName: "",
      contactName: "",
      stateRegistration: "",
      address: {
        street: "",
        neighborhood: "",
        city: "",
        zipCode: "",
        number: "",
      },
      contact: { phone: "", whatsapp: "", email: "" },
      clientType: "",
      taxRegime: "",
      bigVersion: "",
      dueDate: "",
      points: "",
      currentLicensePrice: "",
      mfe: true,
      mgv: true,
      tag: true,
      pos: true,
      tef: true,
      pda: true,
      active: true,
      released: true,
      formSubmitted: false,
    };
  },
  watch: {
    // Monitora as mudanças na propriedade selectedClient
    selectedClient: {
      handler(newVal, oldVal) {
        if (newVal) {
          // Atualiza os dados do formulário com os dados do cliente selecionado
          this.id = newVal.id || "";
          this.cpfCnpj = newVal.cpfCnpj || "";
          this.companyName = newVal.companyName || "";
          this.tradeName = newVal.tradeName || "";
          this.contactName = newVal.contactName || "";
          this.stateRegistration = newVal.stateRegistration || "";
          this.address = newVal.address || {
            zipCode: "",
            street: "",
            neighborhood: "",
            city: "",
            zipCode: "",
            number: "",
          };
          this.contact = newVal.contact || {
            phone: "",
            whatsapp: "",
            email: "",
          };
          this.clientType = newVal.clientType || "";
          this.taxRegime = newVal.taxRegime || "";
          this.bigVersion = newVal.bigVersion || "";
          this.dueDate = newVal.dueDate || "";
          this.points = newVal.points || "";
          this.currentLicensePrice = newVal.currentLicensePrice || "";
          this.mfe = newVal.mfe !== undefined ? newVal.mfe : true;
          this.mgv = newVal.mgv !== undefined ? newVal.mgv : true;
          this.tag = newVal.tag !== undefined ? newVal.tag : true;
          this.pos = newVal.pos !== undefined ? newVal.pos : true;
          this.tef = newVal.tef !== undefined ? newVal.tef : true;
          this.pda = newVal.pda !== undefined ? newVal.pda : true;
          this.active = newVal.active !== undefined ? newVal.active : true;
          this.released = newVal.released !== undefined ? newVal.released : true;
        } else {
          this.resetForm();
        }
      },
      immediate: true, // Atualiza imediatamente quando a propriedade é inicializada
    },
  },
  methods: {
    // Verifica se os campos obrigatórios estão vazios
    areRequiredFieldsEmpty() {
      if (
        !this.cpfCnpj ||
        !this.companyName ||
        !this.tradeName ||
        !this.contactName ||
        !this.stateRegistration ||
        !this.dueDate ||
        !this.points ||
        !this.currentLicensePrice ||
        !this.clientType ||
        !this.taxRegime ||
        !this.bigVersion ||
        !this.contact ||
        !this.contact.whatsapp ||
        !this.contact.email ||
        !this.address ||
        !this.address.zipCode ||
        !this.address.street ||
        !this.address.neighborhood ||
        !this.address.city ||
        !this.address.number
      ) {
        return true;
      }
      return false;
    },

    // Formata o CPF/CNPJ
    formatarCpfCnpj() {
      this.cpfCnpj = formatarCpfCnpj(this.cpfCnpj);
    },

    // Cria ou atualiza um cliente
    async createCli() {
      this.formSubmitted = true;

      if (this.areRequiredFieldsEmpty()) {
        return;
      }

      const data = {
        cpfCnpj: this.cpfCnpj,
        companyName: this.companyName,
        tradeName: this.tradeName,
        contactName: this.contactName,
        stateRegistration: this.stateRegistration,
        address: this.address,
        contact: this.contact,
        clientType: this.clientType,
        taxRegime: this.taxRegime,
        bigVersion: this.bigVersion,
        dueDate: this.dueDate,
        points: this.points,
        currentLicensePrice: this.currentLicensePrice,
        mfe: this.mfe,
        mgv: this.mgv,
        tag: this.tag,
        pos: this.pos,
        tef: this.tef,
        pda: this.pda,
        active: this.active,
        released: this.released,
      };

      try {
        let res;
        if (this.selectedClient) {
          // Atualiza o cliente existente
          res = await axios.put(
            `http://localhost:3000/companies/${this.selectedClient.id}`,
            data
          );
        } else {
          // Cria um novo cliente
          res = await axios.post("http://localhost:3000/companies", data);
          console.log("data");
        }

        this.$emit("clienteCriado"); // Emite um evento para informar que o cliente foi criado
        this.resetForm(); // Reseta o formulário
        this.$emit("client-selected", null); // Emite um evento para resetar a seleção de cliente

        // Alterna para a aba de detalhes
        const detalhesTabButton = document.getElementById("pills-detalhes-tab");
        detalhesTabButton.click();
        console.log(res);
      } catch (error) {
        console.log(error.response); // Exibe uma mensagem de erro no console
      }
    },

    // Deleta o cliente selecionado
    async deleteClient() {
      try {
        if (this.selectedClient) {
          await axios.delete(`http://localhost:3000/companies/${this.selectedClient.id}`);
          this.$emit("clienteDeletado"); // Emite um evento para informar que o cliente foi deletado
          this.resetForm(); // Reseta o formulário
          this.$emit("client-selected", null); // Emite um evento para resetar a seleção de cliente
        }
      } catch (error) {
        console.error("Erro ao excluir cliente:", error); // Exibe uma mensagem de erro no console
      }
    },

    // Reseta o formulário para o estado inicial
    resetForm() {
      this.$emit("client-selected", null); // Emite um evento para resetar a seleção de cliente
      this.id = "";
      this.cpfCnpj = "";
      this.companyName = "";
      this.tradeName = "";
      this.contactName = "";
      this.stateRegistration = "";
      this.address = {
        zipCode: "",
        street: "",
        number: "",
        neighborhood: "",
        city: "",
        zipCode: "",
      };
      this.contact = {
        phone: "",
        whatsapp: "",
        email: "",
      };
      this.clientType = "";
      this.taxRegime = "";
      this.bigVersion = "";
      this.dueDate = "";
      this.points = "";
      this.currentLicensePrice = "";
      this.mfe = true;
      this.mgv = true;
      this.tag = true;
      this.pos = true;
      this.tef = true;
      this.pda = true;
      this.active = true;
      this.released = true;
      this.formSubmitted = false;
    },
  },
};
</script>

<style scoped>
/* .col-2,
.col-3,
.col-4 {
  padding-right: 1px;
  padding-left: 1px;
} */
.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  background-color: #4e3d73;
}

.nav-link {
  color: #4e3d73;
}
</style>
