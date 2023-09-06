<template>
    <div>
      <h1>Image Upload</h1>
      <input type="file" @change="handleFileUpload" ref="fileInput" />
      <button @click="uploadImage">Upload</button>
      <img v-if="uploadedImageUrl" :src="uploadedImageUrl" alt="Uploaded Image" />

    </div>
  
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        selectedFile: null,
        uploadedImageUrl: null,
      };
    },
    methods: {
      handleFileUpload(event) {
        this.selectedFile = event.target.files[0];
      },
      uploadImage() {
        const formData = new FormData();
        formData.append('image', this.selectedFile);
  
        axios.post('http://localhost/TMDT/admin/upload1.php', formData)
          .then(response => {
            // console.log(response.data);
            console.log(response.data.data.url);
            this.uploadedImageUrl = response.data.data.url;
            alert('Image uploaded successfully!');
          })
          .catch(error => {
            console.error(error);
            alert('Error uploading image.');
          });
      },
    },
  };
  </script>
  