<script>
export default {
  props: ['handleUpdate', 'pet', 'editPet', 'edit', 'setID'],
  methods: {
    editedPet() {
      let newEditedPet = this.editPet
      this.$emit('update-editPet', newEditedPet)
    }
  },
  data(){
    return{
      newEditedPet: this.editPet,
    }
  }
}
</script>

<template>
    <div class="edit-form">
      <button v-if="pet.id != edit" @click="setID(pet.id)">Edit</button>
      <button v-if="pet.id == edit" @click="setID(pet.id)">Go back</button>
      <form v-if="pet.id == edit" @submit.prevent="handleUpdate(pet)">
        <input v-model="newEditedPet.name" type="text" :placeholder=[[pet.name]]>
        <select v-model="newEditedPet.species">
          <option disabled value="">{{pet.species}}</option>
          <option>Dog</option>
          <option>Cat</option>
          <option>Bird</option>
          <option>Reptile</option>
          <option>Horse</option>
          <option>Rodent</option>
          <option>Bug</option>
          <option>Rock</option>
          <option>Farm Animal</option>
        </select>
        <input v-model="newEditedPet.image" type="text" :placeholder=[[pet.image]]>
        <input v-model="newEditedPet.owner" type="text" :placeholder=[[pet.owner]]>
        <input v-model="newEditedPet.notes" type="text" :placeholder=[[pet.notes]]>
        <button type="submit">Submit</button>
      </form>
    </div>
</template>
