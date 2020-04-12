<template>
  <div id="app">
    <h2>Firebase AutoForm</h2>
    {{ firebaseData }}
    <br />
    {{ formData }}

    <form @submit.prevent="updateFirebase" @input="fieldUpdate">
      <input placeholder="your name" type="text" name="name" v-model="formData.name" />
      <br />
      <input placeholder="your email" type="email" name="email" v-model="formData.email" />
      <br />
      <input placeholder="your phone number" type="tel" name="phone" v-model="formData.phone" />
      <br />
      <button type="submit">Submit</button>
    </form>

    <button @click="revertToOriginal">Revert to Original</button>

    <div v-if="state === 'synced'">
      Form is synced with Firestore
    </div>
    <div v-else-if="state === 'modified'">
      Form data chaned, will sync with Firebase
    </div>
  </div>
</template>

<script>
import { db } from './firebase';
import { debounce } from 'debounce';

const documentPath = 'contacts/jeff';

export default {
  data() {
    return {
      firebaseData: null,
      formData: {},
      state: 'loading',
      originalData: null
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
    },
    fieldUpdate() {
      this.state = 'modified';
      this.debouncedUpdate();
    },
    debouncedUpdate: debounce(function() {
      this.updateFirebase();
    }, 2500),
    revertToOriginal() {
      this.state = 'revoked';
      this.formData = { ...this.originalData };
    }
  },

  created: async function () {
    const docRef = db.doc(documentPath);

    let data = (await docRef.get()).data();

    if (!data) {
      data = { name: '', phone: '', email: '' }
    }

    this.formData = data;
    this.state = 'synced';
    this.originalData = { ...data }
  }
}
</script>

<style>

</style>
