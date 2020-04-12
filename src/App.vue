<template>
  <div id="app">
    <h2>Firebase AutoForm</h2>
    <!-- {{ firebaseData }} -->

    <form @submit.prevent="updateFirebase">
      <input placeholder="your name" type="text" name="name" v-model="formData.name" />
      <br />
      <input placeholder="your email" type="email" name="email" v-model="formData.email" />
      <br />
      <input placeholder="your phone number" type="tel" name="phone" v-model="formData.phone" />
      <br />
      <button type="submit">Submit</button>
    </form>

    <h5>footer</h5>
  </div>
</template>

<script>
import { db } from './firebase';

const documentPath = 'contacts/jeff';

export default {
  data() {
    return {
      firebaseData: null,
      formData: {},
      state: 'loading'
    };
  },

  firestore() {
    return {
      firebaseData: db.doc(documentPath)
    }
  },

  methods: {
    async updateFirebase() {
      try {
        await db.doc(documentPath).set(this.formData);
        this.state = 'synced';
      } catch (error) {
        this.state = 'error';
        this.errorMessage = JSON.stringify(error);
      }
    }
  },

  created: async function () {
    const docRef = db.doc(documentPath);

    let data = (await docRef.get()).data();

    if (!data) {
      data = { name: '', phone: '', email: '' }
    }

    this.formData = data;
  }
}
</script>

<style>

</style>
