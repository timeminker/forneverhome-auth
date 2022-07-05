<script>
export default {
  props: ['handleUpdate', 'animal', 'editPet', 'edit', 'setID'],
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
      <button v-if="animal.id != edit" @click="setID(animal.id)">Edit</button>
      <button v-if="animal.id == edit" @click="setID(animal.id)">Go back</button>
      <form v-if="animal.id == edit" @submit.prevent="handleUpdate(animal)">
        <input v-model="newEditedPet.name" type="text" :placeholder=[[animal.name]]>
        <input v-model="newEditedPet.species" type="text" :placeholder=[[animal.species]]>
        <input v-model="newEditedPet.image" type="text" :placeholder=[[animal.image]]>
        <input v-model="newEditedPet.owner" type="text" :placeholder=[[animal.owner]]>
        <input v-model="newEditedPet.notes" type="text" :placeholder=[[animal.notes]]>
        <button type="submit">Submit</button>
      </form>
    </div>
</template>
