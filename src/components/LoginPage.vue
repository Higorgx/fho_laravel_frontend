<template>
  <div class="Login">
    <div class="container">
      <b-card>
        <b-card-body>
          <b-card-title>Login</b-card-title>
          <form>
            <h6 v-if="required.email">O campo email é obrigatórios</h6>
            <h6 v-if="required.passwd">O campo Senha é obrigatórios</h6>
            <div class="form-group">
              <label>Email</label>
              <b-form-input
                id="email"
                v-model="user.email"
                name="login-email"
                placeholder=""
                required
              />
            </div>
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
        passwd: "",
      },
      required: {
        email: false,
        passwd: false,
      },
    };
  },
  components: {
    BFormInput,
  },
  methods: {
    async Login() {
      if (this.user.email.length <= 0) {
        this.required.email = true;
      } else {
        this.required.email = false;
      }
      if (this.user.passwd.length <= 0) {
        this.required.passwd = true;
      } else {
        this.required.passwd = false;
      }
      if (this.required.passwd === false && this.required.email === false) {
        const response = await axios.post("http://localhost:8000/api/login", {
          email: this.user.email,
          passwd: this.user.passwd,
        });
        if (response.data?.status === 200) {
          window.alert("Logado com sucesso");
          localStorage.setItem("auth", true);
          this.$router.replace("/dashboard");
        }
      }
    },
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
