<script>
export default {
  props: ["pet"],
  data() {
    return {

    }
  }
}
</script>

<template>
  <div>
    <div class="pet-card-pictures">
      <img v-bind:src="pet.image" class="pet-image"><br/>
      <img src="https://i.ibb.co/FwTwvV7/favpng-flower-delivery-puja-petal-marigold.png" class="flowers">
    </div>
    <br>
    <div class="pet-description">
      <p>{{pet.name}}</p>
      <p class="notes"><i>"{{pet.notes}}"</i></p>
      <p>owned by {{pet.owner}}</p>
    </div>
  </div>
</template>
