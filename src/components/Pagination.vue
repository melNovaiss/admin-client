<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination pagination-sm justify-content-end">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a class="page-link" aria-label="First" @click="firstPage">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li v-if="currentPage > 2" class="page-item disabled">
        <span class="page-link">..</span>
      </li>
      <li
        v-for="pageNumber in getVisiblePages"
        :key="pageNumber"
        :class="{ active: pageNumber === currentPage }"
      >
        <a class="page-link" @click="goPage(pageNumber)">{{ pageNumber }}</a>
      </li>
      <li v-if="totalPages - currentPage > 1" class="page-item disabled">
        <span class="page-link">..</span>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <a class="page-link" aria-label="Last" @click="lastPage">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Pagination", // Define o nome do componente
  props: {
    currentPage: {
      type: Number,
      required: true, // Define a propriedade currentPage que é um número e é obrigatória
    },
    totalPages: {
      type: Number,
      required: true, // Define a propriedade totalPages que é um número e é obrigatória
    },
  },
  computed: {
    // Computed property para obter as páginas visíveis na paginação
    getVisiblePages() {
      const visiblePages = []; // Array para armazenar as páginas visíveis
      const startPage = Math.max(1, this.currentPage - 1); // Calcula a página inicial, garantindo que seja pelo menos 1
      const endPage = Math.min(this.totalPages, this.currentPage + 1); // Calcula a página final, garantindo que não exceda totalPages
      for (let i = startPage; i <= endPage; i++) {
        visiblePages.push(i); // Adiciona as páginas visíveis ao array
      }
      return visiblePages; // Retorna o array de páginas visíveis
    },
  },
  methods: {
    // Método para navegar para uma página específica
    goPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        // Verifica se a página está dentro do intervalo válido
        this.$emit("page-changed", page); // Emite o evento "page-changed" com o número da página
      }
    },
    // Método para navegar para a primeira página
    firstPage() {
      this.goPage(1); // Chama goPage com o número da primeira página
    },
    // Método para navegar para a última página
    lastPage() {
      this.goPage(this.totalPages); // Chama goPage com o número da última página
    },
  },
};
</script>

<style scoped>
.disabled > .page-link {
  background-color: #e9ecef;
}
.page-link {
  background-color: #f6f9ff;
  color: rgba(33, 37, 41, 0.75);
}
.active > .page-link {
  background-color: #4e3d73;
  color: white;
  border-color: #4e3d73;
}
</style>
