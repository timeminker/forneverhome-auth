<template>
  <nav>
    <button @click="$router.push('/about')">About</button>
    <button class="logout" @click="Logout">Logout</button>
    <button @click="userFilter(name)">See Your Pets</button>
    <button @click="filter('Dog')">Show Dogs</button>
    <button @click="filter('Cat')">Show Cats</button>
    <button @click="filter('Reptile')">Show Reptiles</button>
  </nav>
  <header>
    <section class="main-title">
      <h1>For-Never Home</h1>
      <h3 style="margin-top: 0; width: 500px;">Welcome, {{name}}</h3>
    </section>
    <button @click="addView" class="memorialize">Memorialize Your Pet</button>
  </header>
  <main v-if="view == 'main'">
    <h2 class="banner"><span>T</span><span>h</span><span>e</span> <span>H</span><span>a</span><span>l</span><span>l</span> <span>o</span><span>f</span> <span>R</span><span>e</span><span>m</span><span>e</span><span>m</span><span>b</span><span>e</span><span>r</span><span>a</span><span>n</span><span>c</span><span>e</span></h2>
    <div class="container">
      <div v-for="pet in pets" :key="pet.id" class="card">
        <ShowComp :pet="pet"/>
        <div v-if="name === pet.createdBy" class="user-functions">
          <EditComp :pet="pet" :editPet="editPet" :handleUpdate="handleUpdate" @update-editPet="update" :edit="edit" :setID="setID"/>
          <button @click="handleDelete(pet.id)">Delete</button>
        </div>
      </div>
    </div>

  </main>
  <div class="add-form" v-if="view == 'add'">
    <button @click="mainView">Return to Hall Of Rememberance</button>
    <AddComp :newPet="newPet" :handleCreate="handleCreate" @update-newPet="update" :name="name"/>
  </div>
  <section v-if="view == 'filter'">
    <div class="container">
      <div v-for="animal in filterResults" :key="animal.id" class="card">
        <div class="pet-card-pictures">
          <img v-bind:src="animal.image" class="pet-image">
        </div>
        <p>{{animal.name}}, a good {{animal.species}}</p>
        <p class="notes"><i>"{{animal.notes}}"</i></p>
        <p>owned by {{animal.owner}}</p>
        <div v-if="name.toLowerCase() === animal.createdBy.toLowerCase()" class="user-functions">
          <EditComp :pet="animal" :editPet="editPet" :handleUpdate="handleUpdate" @update-editPet="update" :edit="edit" :setID="setID"/>
          <button @click="handleDelete(animal.id)">Delete</button>
        </div>
      </div>
    </div>

    <button @click="mainView">Return to Hall Of Rememeberance</button>
  </section>
</template>

<script>
import {ref, onBeforeMount, onMounted} from 'vue';
import AddComp from '../components/AddComp.vue'
import ShowComp from '../components/ShowComp.vue'
import EditComp from '../components/EditComp.vue'
import EditFilterComp from '../components/EditFilterComp.vue'
import axios from 'axios'
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";

export default {
  components: {
    AddComp,
    EditComp,
    ShowComp,
    EditFilterComp
  },
  setup() {
    const name = ref('');

    let pets = ref([])
    let newPet = ref({name: '', species: '', image: '', owner: '', notes: '', createdBy: ''})
    let editPet = ref({name: '', species: '', image: '', owner: '', notes: '', createdBy: ''})
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
      console.log(animal);
      filterResults.value = pets.value.filter(pet => pet.species.toLowerCase() === animal.toLowerCase())
      view.value = 'filter'
    }

    // filtering by user
    const userFilter = (name) => {
      console.log(name);
      filterResults.value = pets.value.filter(pet => pet.createdBy.toLowerCase() === name.toLowerCase())
      view.value = 'filter'
    }

    // CRUD API functions
    onMounted(() => {
      axios.get('https://forneverhome-backend.herokuapp.com/api/pets')
      .then((response) =>{ pets.value = response.data
        console.log(pets)
      })
    })

    const handleCreate = (name) => {
      axios.post('https://forneverhome-backend.herokuapp.com/api/pets',
      {
        name: newPet.value.name,
        species: newPet.value.species,
        image: newPet.value.image,
        owner: newPet.value.owner,
        notes: newPet.value.notes,
        createdBy: name
      })
      .then((response) =>{ pets.value = [...pets.value, response.data]
      alert(newPet.value.name + ' has been added. RIP')
      newPet.value = ref({name: '', species: '', image: '', owner: '', notes: '', createdBy: ''})
      view.value = 'main'
      })
    }

    const handleUpdate = (pet) => {
      console.log(pet);
      console.log(editPet.value);
      if (editPet.value.name === undefined || editPet.value.name === '') {
        editPet.value.name = pet.name
      }
      if (editPet.value.species === undefined || editPet.value.species === '') {
        editPet.value.species = pet.species
      }
      if (editPet.value.image === undefined || editPet.value.image === '') {
        editPet.value.image = pet.image
      }
      if (editPet.value.owner === undefined || editPet.value.owner === '') {
        editPet.value.owner = pet.owner
      }
      if (editPet.value.notes === undefined || editPet.value.notes === '') {
        editPet.value.notes = pet.notes
      }
      if (editPet.value.createdBy === undefined || editPet.value.createdBy === '') {
        editPet.value.createdBy = pet.createdBy
      }
      axios.put('https://forneverhome-backend.herokuapp.com/api/pets/' + pet.id, editPet.value)
      .then((response)=> {
        edit.value = ''
        editPet.value = ref({name: '', species: '', image: '', owner: '', notes: '', createdBy: ''})
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
      setID,
      userFilter
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
