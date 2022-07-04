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
      <form v-if="pet.id == edit" @submit.prevent="handleUpdate(pet.id)">
        <input v-model="newEditedPet.name" type="text">
        <input v-model="newEditedPet.species" type="text">
        <input v-model="newEditedPet.image" type="text">
        <input v-model="newEditedPet.owner" type="text">
        <input v-model="newEditedPet.notes" type="text">
        <input v-model="newEditedPet.thoughts" type="text">
        <button type="submit">Submit</button>
      </form>
    </div>
</template>
