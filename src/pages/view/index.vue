<template>
        <!-- Slider --> 
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="Carousel">
        <!-- Indicators -->
        <ol class="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
  
        <!-- Slides -->
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="https://via.placeholder.com/800x400" class="d-block w-5" alt="Slide 1">
          </div>
          <div class="carousel-item">
            <img src="https://via.placeholder.com/800x400" class="d-block w-5" alt="Slide 2">
          </div>
          <div class="carousel-item">
            <img src="https://via.placeholder.com/800x400" class="d-block w-5" alt="Slide 3">
          </div>
        </div>
  
        <!-- Controls -->
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    <!-- end Slider -->
</template>

<script>
import * as $ from 'jquery';
export default {
    
  name: 'Carousel',
  mounted() {
    // Initialize the Bootstrap Carousel using jQuery
    $(this.$el).carousel();
  },
};
</script>