<template>
  <div class="Create">
    <div class="container">
      <b-card>
        <b-card-body>
           <h6 v-if="required">Todos os campos obrigatórios</h6>
            <h6 v-if="required.password">As senhas não conferem</h6>
          <b-card-title>Criar Usuário</b-card-title>
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
                v-model="user.password"
               :state="validatePassword(user.password, user.confirmPassword)"
                type="password"
                class="form-control-merge"
                name="login-password"
                placeholder=""
                required
              />
            </div>
            <div class="form-group mb-3">
              <label for="exampleInputPassword1">Confirme a Senha</label>
              <b-form-input
                id="confirmPassword"
                v-model="user.confirmPassword"
                :state="validatePassword(user.password, user.confirmPassword)"
                type="password"
                class="form-control-merge"
                name="login-password"
                placeholder=""
                required
              />
               <b-form-invalid-feedback id="input-live-feedback">
                Senhas não conferem
              </b-form-invalid-feedback>
            </div>
            <button
              type="submit"
              class="btn btn-primary"
              @click.stop.prevent="Create()"
            >
              Entrar
            </button>
          </form>
        </b-card-body>
      </b-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { BFormInput } from "bootstrap-vue";

export default {
  name: "Login",
  data() {
    return {
      user: {
        email: "",
        name: "",
        course: "",
        password: "",
        confirmPassword: ""
      },
    };
  },
   computed: {
      nameState() {
        return this.user.name.length > 2 ? true : false
      },
     
    },
  components: {
    BFormInput,
  },
  methods: {
    validatePassword(password, confirmPassword) {
      return password === confirmPassword ? true : false
    },
    required(field) {
        return field.length > 0 ? true : false
    },
    async Create() {
      const response = await axios.post("http://localhost:8000/api/create/student", {
        email: this.user.email,
        name: this.user.name,
        course: this.user.course,
        passwd: this.user.confirmPassword
      });
      if (response.data?.status === 200) {
        window.alert("Usuário criado com sucesso");
        this.$router.push("/")
      } else {
        window.alert("Falha ao criar usuário")
      }
    },
  },
};
</script>
