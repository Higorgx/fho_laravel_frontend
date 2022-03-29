<template>
  <div class="Login">
    <div class="container">
      <b-card>
        <b-card-body>
          <b-card-title>Login</b-card-title>
          <form>
            <div class="form-group">
              <label>Email</label>
              <b-form-input
                id="email"
                v-model="user.email"
                :state="required(user.email)"
                name="login-email"
                placeholder=""
                required
              />
              <b-form-invalid-feedback id="input-live-feedback">
                Campo necessário
              </b-form-invalid-feedback>
            </div>
            <div class="form-group mb-3">
              <label for="InputPassword1">Senha</label>
              <b-form-input
                id="password"
                v-model="user.password"
                :state="required(user.password)"
                type="password"
                class="form-control-merge"
                name="login-password"
                placeholder=""
                required
              />
              <b-form-invalid-feedback id="input-live-feedback">
                Campo necessário
              </b-form-invalid-feedback>
            </div>
            <button
              type="submit"
              class="btn btn-primary"
              @click.stop.prevent="Login()"
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
        password: "",
      },
    };
  },
  components: {
    BFormInput,
  },
  methods: {
    required(field) {
      return field.length > 0 ? true : false;
    },
    async Login() {
      const response = await axios.post("http://localhost:8000/api/login", {
        email: this.user.email,
        passwd: this.user.password,
      });
      if (response.status === 200) {
        window.alert("Logado com sucesso");
        localStorage.setItem("auth", true);
        this.$router.replace("/dashboard");
      } else {
        window.alert("Senha Ou Email incorreto");
      }
    },
  },
};
</script>

