<template>
  <form @submit.prevent="handleCreate(name)">
    <label htmlFor="name">Name</label>
    <input v-model="myNewPet.name" type="text"><br/>
    <label htmlFor="species">Species</label>
    <select v-model="myNewPet.species">
      <option disabled value="">Please Select</option>
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
