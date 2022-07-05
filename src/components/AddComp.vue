<template>
  <form @submit.prevent="handleCreate(name)">
    <label htmlFor="name">Name</label>
    <input v-model="myNewPet.name" type="text"><br/>
    <label htmlFor="species">Species</label>
    <input v-model="myNewPet.species" type="text"><br/>
    <label htmlFor="image">Image</label>
    <input v-model="myNewPet.image" type="text"><br/>
    <label htmlFor="owner">Owner</label>
    <input v-model="myNewPet.owner" type="text"><br/>
    <label htmlFor="notes">Description</label>
    <input v-model="myNewPet.notes" type="text"><br/>
    <button type="submit">Submit</button>
  </form>
</template>

<script>
export default {
  props: ['handleCreate', 'newPet', 'name'],
  methods: {
    createdPet() {
      let myNewPet = this.newPet;
      this.$emit('update-newPet', myNewPet)
    }
  },
  data() {
    return {
      myNewPet: this.newPet,
    }
  }
}
</script>

<style>
</style>
