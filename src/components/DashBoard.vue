<template>
  <div class="Dashboard">
    <div class="container">
      <b-card>
        <b-card-body>
          <div class="row">
            <div class="d-flex align-items-center justify-content-end">
              <button
                type="submit"
                class="btn btn-dark"
                @click="logOut()"
                v-b-modal.modal-edit
              >
                LogOut
              </button>
            </div>
          </div>
          <b-table
            responsive
            empty-text="Sem usuários para mostrar"
            class="position-relative"
            :items="users"
            :fields="userFields"
          >
            <template #cell(ações)="data">
              <div class="text-nowrap">
                <button
                  type="submit"
                  class="btn btn-warning me-2"
                  @click="assingUser(data.item)"
                  v-b-modal.modal-edit
                >
                  Editar
                </button>
                <button
                  type="submit"
                  class="btn btn-danger"
                  @click="assingUser(data.item)"
                  v-b-modal.modal-delete
                >
                  Excluir
                </button>
              </div>
            </template>
          </b-table>
        </b-card-body></b-card
      >
      <b-modal id="modal-edit" title="edit">
        <div class="d-block text-center">
          <form>
            <div class="form-group">
              <label>Nome</label>
              <b-form-input
                id="email"
                v-model="user.name"
                name="name"
                :state="nameState"
                placeholder=""
                required
              />
              <b-form-invalid-feedback id="input-live-feedback">
                Nome precisa de no mínimo 3 letras
              </b-form-invalid-feedback>
            </div>
            <div class="form-group">
              <label>Curso</label>
              <b-form-input
                id="email"
                v-model="user.course"
                :state="required(user.course)"
                name="curso"
                placeholder=""
                required
              />
              <b-form-invalid-feedback id="input-live-feedback">
                Campo Obrigatório
              </b-form-invalid-feedback>
            </div>
            <div class="form-group">
              <label>Email</label>
              <b-form-input
                id="email"
                type="email"
                v-model="user.email"
                :state="required(user.email)"
                name="login-email"
                placeholder=""
                required
              />
            </div>
            <b-form-invalid-feedback id="input-live-feedback">
              Campo Obrigatório
            </b-form-invalid-feedback>
            <div class="form-group mb-3">
              <label for="exampleInputPassword1">Senha</label>
              <b-form-input
                id="password"
                v-model="user.passwd"
                type="password"
                class="form-control-merge"
                name="login-password"
                placeholder=""
                required
              />
            </div>
          </form>
        </div>
        <template #modal-footer>
          <button
            type="submit"
            class="btn btn-primary"
            data-mdb-dismiss="modal"
            @click="$bvModal.hide('modal-edit')"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="btn btn-danger"
            @click.stop.prevent="update()"
          >
            Alterar Usuario
          </button>
        </template>
      </b-modal>
      <b-modal id="modal-delete" title="Deletar">
        <div class="d-block text-center mb-3">
          <h3>Deletar Usuário?</h3>
        </div>
        <template #modal-footer>
          <button
            type="submit"
            class="btn btn-primary"
            data-mdb-dismiss="modal"
            @click="$bvModal.hide('modal-edit')"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="btn btn-danger"
            @click.stop.prevent="deleteUser()"
          >
            Deletar Usuario
          </button>
        </template>
      </b-modal>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { BTable } from "bootstrap-vue";

export default {
  name: "DashBoard",
  data() {
    return {
      users: [],
      userFields: [
        { key: "ações", class: "text-center" },
        { key: "id", label: "id", sortable: false },
        { key: "name", label: "nome", sortable: false },
        { key: "course", label: "Curso", sortable: false },
        {
          key: "created_at",
          label: "Data",
          sortable: false,
          formatter: (val) => this.convertingDate(val),
        },
      ],
      user: {
        id: null,
        email: "",
        name: "",
        course: "",
        passwd: "",
      },
    };
  },
  computed: {
    nameState() {
      return this.user.name.length > 2 ? true : false;
    },
  },
  components: {
    BTable,
  },
  mounted() {
    this.list();
  },
  methods: {
    logOut() {
      localStorage.removeItem("auth");
      this.$router.replace("/");
    },
    async assingUser(user) {
      this.user = user;
    },
    required(field) {
      return field.length > 0 ? true : false;
    },
    convertingDate(date) {
      let convertData = date.replace(" ", "T").split("T")[0];
      convertData = convertData.split("-", 3);
      return convertData[2].concat("/", convertData[1], "/", convertData[0]);
    },
    async list() {
      const response = await axios.get(
        "http://localhost:8000/api/read/students"
      );
      if (response.status === 200) {
        this.users = response.data.data;
      } else {
        window.alert("Falha ao listar usuários")
      }
    },
    async deleteUser() {
      const response = await axios.delete(
        "http://localhost:8000/api/delete/student/" + this.user.id
      );
      if (response.status === 200) {
        window.alert("Usuário Deletado");
        this.list();
        this.$bvModal.hide("modal-delete");
      } else {
        window.alert("Falha ao excluir usuário")
      }

    },
    async update() {
      if (!this.user.passwd) {
        this.user.passwd;
      }
      const response = await axios.put(
        "http://localhost:8000/api/update/student/",
        this.user
      );
      if (response.status === 200) {
        window.alert("Usuário atualizado");
        this.list();
        this.$bvModal.hide("modal-edit");
      } else {
        window.alert("Falha ao atualizar usuário")
      }
    },
  },
};
</script>
