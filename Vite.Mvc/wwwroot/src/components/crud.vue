<template>
  <div class="container mt-4">
    <h2>CRUD com Vue + SweetAlert2</h2>

    <button class="btn btn-success mb-3" @click="criarItem">Novo Item</button>

    <table class="table table-bordered table-hover">
      <thead>
      <tr>
        <th>#</th>
        <th>Nome</th>
        <th>Ações</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="itens.length === 0">
        <td colspan="3" class="text-center">Nenhum item cadastrado.</td>
      </tr>
      <tr v-for="(item, index) in itens" :key="item.id">
        <td>{{ index + 1 }}</td>
        <td>{{ item.nome }}</td>
        <td>
          <button class="btn btn-warning btn-sm me-2" @click="editarItem(item)">Editar</button>
          <button class="btn btn-danger btn-sm" @click="excluirItem(item)">Excluir</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// Capturar as URLs dos inputs hidden no cshtml
const urls = {
  get: document.getElementById('url-get').value,
  post: document.getElementById('url-post').value,
  put: document.getElementById('url-put').value,
  delete: document.getElementById('url-delete').value,
};

const itens = ref([]);

// Função para carregar os itens
const carregarItens = async () => {
  const { data } = await axios.get(urls.get);
  itens.value = data;
};

// Criar item
const criarItem = async () => {
  const { value: nome } = await Swal.fire({
    title: 'Novo Item',
    input: 'text',
    inputLabel: 'Digite o nome',
    inputPlaceholder: 'Entre 3 e 20 caracteres',
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return 'O nome é obrigatório.';
      }
      if (value.length < 3 || value.length > 20) {
        return 'O nome deve ter entre 3 e 20 caracteres.';
      }
      return null;
    },
  });

  if (nome) {
    try {
      const formData = new URLSearchParams();
      formData.append('Nome', nome);

      await axios.post(urls.post, formData);
      await Swal.fire('Sucesso', 'Item criado com sucesso!', 'success');
      carregarItens();
    } catch (e) {
      Swal.fire('Erro', 'Ocorreu um erro ao criar o item.', 'error');
    }
  }
};

// Editar item
const editarItem = async (item) => {
  const { value: nome } = await Swal.fire({
    title: 'Editar Item',
    input: 'text',
    inputLabel: 'Altere o nome',
    inputValue: item.nome,
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return 'O nome é obrigatório.';
      }
      if (value.length < 3 || value.length > 20) {
        return 'O nome deve ter entre 3 e 20 caracteres.';
      }
      return null;
    },
  });

  if (nome) {
    try {
      const formData = new URLSearchParams();
      formData.append('Id', item.id);
      formData.append('Nome', nome);

      await axios.post(urls.put, formData);
      await Swal.fire('Sucesso', 'Item atualizado com sucesso!', 'success');
      carregarItens();
    } catch (e) {
      Swal.fire('Erro', 'Ocorreu um erro ao atualizar o item.', 'error');
    }
  }
};

// Excluir item
const excluirItem = async (item) => {
  const confirm = await Swal.fire({
    title: 'Excluir',
    text: `Deseja realmente excluir "${item.nome}"?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sim, excluir',
    cancelButtonText: 'Cancelar',
  });

  if (confirm.isConfirmed) {
    try {
      const formData = new URLSearchParams();
      formData.append('id', item.id);

      await axios.post(urls.delete, formData);
      await Swal.fire('Excluído!', 'Item excluído com sucesso.', 'success');
      carregarItens();
    } catch (e) {
      Swal.fire('Erro', 'Ocorreu um erro ao excluir o item.', 'error');
    }
  }
};

onMounted(() => {
  carregarItens();
});
</script>

<style scoped>
.table th,
.table td {
  vertical-align: middle;
}
</style>
