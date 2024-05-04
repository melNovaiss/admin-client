<template>
  <form class="form" method="POST" @submit.prevent="createCli" novalidate>
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
        class="tab-pane fade show active"
        id="pills-detalhes"
        role="tabpanel"
        aria-labelledby="pills-detalhes-tab"
        tabindex="0"
      >
        <div class="row">
          <div class="col-md-1">
            <div class="mb-3">
              <label class="form-label">Código</label>
              <input type="text" class="form-control" id="id" v-model="id" disabled />
            </div>
          </div>
          <div class="col-md-3">
            <label class="form-label">CPF/CNPJ *</label>
            <div class="input-group mb-3">
              <span class="input-group-text shadow-sm">
                <i
                  :class="
                    typeof cpfCnpj === 'string' && cpfCnpj.length <= 14
                      ? 'bi bi-person-fill'
                      : 'bi bi-building-fill'
                  "
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
          <div class="col-md-4">
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
          <div class="col-md-4">
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
        </div>
        <div class="row">
          <div class="col-md-4">
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
          <div class="col-md-2">
            <div class="mb-3">
              <label class="form-label">IE *</label>
              <input
                type="text"
                class="form-control"
                id="stateRegistration"
                v-model="stateRegistration"
                required="required"
              />
            </div>
          </div>
          <div class="col-md-2">
            <div class="mb-3">
              <label class="form-label">Dia de vencimento *</label>
              <input
                type="text"
                class="form-control"
                id="dueDate"
                v-model="dueDate"
                required="required"
              />
            </div>
          </div>
          <div class="col-md-1">
            <div class="mb-3">
              <label class="form-label">Pontos *</label>
              <input
                type="text"
                class="form-control"
                id="points"
                v-model="points"
                required="required"
              />
            </div>
          </div>
          <div class="col-md-2">
            <div class="mb-3">
              <label class="form-label">Preço da Licença atual *</label>
              <input
                type="text"
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
            <label>Tipo de Cliente</label>
            <select class="form-select" v-model="clientType" required>
              <option selected value="VAREJO">Varejo</option>
              <option value="ATACADO">Atacado</option>
              <option value="ATACAREJO">Atacarejo</option>
              <option value="RESTAURANTE">Restaurante</option>
              <option value="DEP_CONSTRUCAO">Depósito de construção</option>
            </select>
          </div>
          <div class="col-md-3">
            <label>Taxa de Regime</label>
            <select class="form-select" v-model="taxRegime" required>
              <option selected value="LUCRO_REAL">Lucro Real</option>
              <option value="LUCRO_PRESUMIDO">Lucro Presumido</option>
              <option value="SIMPLES_NACIONAL">Simples Nacional</option>
            </select>
          </div>
          <div class="col-md-3">
            <label>BIG Versão</label>
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
      <button type="submit" class="btn btn-purple2">Salvar</button>
    </div>
  </form>
</template>

<script>
import axios from "axios";
import { formatarCpfCnpj } from "../../assets/js/mask";
import Address from "@/components/Address.vue";
import Contact from "@/components/Contact.vue";

export default {
  name: "CliForm",
  components: {
    Address,
    Contact,
  },
  props: {
    selectedClient: Object, // Propriedade para receber os dados do cliente selecionado
  },
  data() {
    return {
      isClientSelected: false, // Variável para controlar a visibilidade do botão de exclusão
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
          // Limpa os dados do formulário se nenhum cliente for selecionado
          this.resetForm();
        }
      },
      immediate: true, // Atualiza imediatamente quando a propriedade é inicializada
    },
  },
  methods: {
    formatarCpfCnpj() {
      this.cpfCnpj = formatarCpfCnpj(this.cpfCnpj);
    },
    async createCli() {
      this.formSubmitted = true;

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
          // Se um cliente já estiver selecionado, envie uma solicitação PUT para atualizar os dados
          res = await axios.put(
            `http://localhost:3000/companies/${this.selectedClient.id}`,
            data
          );
        } else {
          // Caso contrário, envie uma solicitação POST para criar um novo cliente
          res = await axios.post("http://localhost:3000/companies", data);
        }

        this.$emit("clienteCriado");
        this.resetForm();
        this.$router.push("/client");
        console.log(res);
      } catch (error) {
        console.log(error.response);
      }
    },

    async deleteClient() {
      try {
        if (this.selectedClient) {
          await axios.delete(`http://localhost:3000/companies/${this.selectedClient.id}`);
          this.$emit("clienteDeletado");
          this.resetForm();
          this.$emit("client-selected", null);
        }
      } catch (error) {
        console.error("Erro ao excluir cliente:", error);
      }
    },

    resetForm() {
      // Reinicializa todos os campos do formulário
      this.id = "";
      this.cpfCnpj = "";
      this.companyName = "";
      this.tradeName = "";
      this.contactName = "";
      this.stateRegistration = "";
      this.address = {
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
