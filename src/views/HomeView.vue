<template>
  <div>
    <router-link to="/about">About</router-link>
    <br>
    <button class="logout" @click="Logout">Logout</button>
  </div>
  <header>
    <section class="main-title">
      <h1>For-Never Home</h1>
      <h3>Welcome, {{name}}</h3>
    </section>
    <button @click="filter('Dog')">Show Dogs</button>
    <button @click="filter('Cat')">Show Cats</button>
    <button @click="filter('Reptile')">Show Reptiles</button>
    <br>
    <button @click="addView">Memorialize Your Pet</button>
  </header>
  <main v-if="view == 'main'">
    <div class="container">
      <div v-for="pet in pets" :key="pet.id" class="card">
        <ShowComp :pet="pet"/>
        <EditComp :pet="pet" :editPet="editPet" :handleUpdate="handleUpdate" @update-editPet="update" :edit="edit" :setID="setID"/>
        <button @click="handleDelete(pet.id)">Delete</button>
      </div>
    </div>

  </main>
  <div class="add-form" v-if="view == 'add'">
    <button @click="mainView">Return to Hall Of Rememeberance</button>
    <AddComp :newPet="newPet" :handleCreate="handleCreate" @update-newPet="update"/>
  </div>
  <section v-if="view == 'filter'">
    <div v-for="animal in filterResults" :key="animal.id">
      <p>{{animal.name}}, a go od {{animal.species}}</p>
      <p>owned by {{animal.owner}}</p>
    </div>
    <button @click="mainView">Return to Hall Of Rememeberance</button>
  </section>
</template>

<script>
import {ref, onBeforeMount, onMounted} from 'vue';
import AddComp from '../components/AddComp.vue'
import ShowComp from '../components/ShowComp.vue'
import EditComp from '../components/EditComp.vue'
import axios from 'axios'
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";

export default {
  components: {
    AddComp,
    EditComp,
    ShowComp
  },
  setup() {
    const name = ref('');

    let pets = ref([])
    let newPet = ref({name: '', species: '', image: '', owner: '', notes: '', thoughts: ''})
    let editPet = ref({name: '', species: '', image: '', owner: '', notes: '', thoughts: ''})
    let view = ref('main')
    let filterResults = ref([])
    let edit = ref('')

    onBeforeMount(() => {
      const user = firebase.auth().currentUser;
      if (user) {
        name.value = user.email.split('@')[0];
      }
    })

    const Logout = () => {
      firebase
        .auth()
        .signOut()
        .then(() => console.log("signed Out"))
        .catch(err => alert(err.message));
    }

    const setID = (id) => {
      if (edit.value === id) {
        edit.value = ''
      } else {
        edit.value = id
      }
    }

    // view functions
    const addView = () => {
      view.value = 'add'
    }
    const mainView = () => {
      view.value = 'main'
    }

    // filtering function by animal
    const filter = (animal) => {
      filterResults.value = pets.value.filter(pet => pet.species.toLowerCase() === animal.toLowerCase())
      view.value = 'filter'
    }

    // CRUD API functions
    onMounted(() => {
      axios.get('https://forneverhome-backend.herokuapp.com/api/pets')
      .then((response) =>{ pets.value = response.data
        console.log(pets)
      })
    })

    const handleCreate = () => {
      axios.post('https://forneverhome-backend.herokuapp.com/api/pets', newPet.value)
      .then((response) =>{ pets.value = [...pets.value, response.data]
      newPet.value = ref({name: '', species: '', image: '', owner: '', notes: '', thoughts: ''})
      console.log(newPet.value);
      })
    }

    const handleUpdate = (petID) => {
      axios.put('https://forneverhome-backend.herokuapp.com/api/pets/' + petID, editPet.value)
      .then((response)=> {
        edit.value = ''
        editPet.value = ref({name: '', species: '', image: '', owner: '', notes: '', thoughts: ''})
        pets.value = pets.value.map((pet) => {
          return pet.id !== response.data.id ? pet : response.data
        })
      })
    }

    const handleDelete = (petID) => {
      axios.delete('https://forneverhome-backend.herokuapp.com/api/pets/' + petID)
      .then((response) => {
        pets.value = pets.value.filter(pet => pet.id !== petID)
      })
    }

    return {
      name,
      Logout,
      pets,
      newPet,
      editPet,
      view,
      filterResults,
      addView,
      mainView,
      filter,
      handleCreate,
      handleUpdate,
      handleDelete,
      edit,
      setID
    }
  },
  methods: {
    update(newPet) {
      this.newPet = newPet;
    }
  }
}
</script>

<style>
 @import '../assets/base.css';
</style>
