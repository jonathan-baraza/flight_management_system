@extends('layout/base')
@section('title',"KQ | HomePage")
<style>
  
  @media only screen and (max-width: 600px) {
  .carousel-inner{
      height:60vh !important;
    }
    .carousel-image{
      height: 60vh  !important;
    }
    .data-div-carousel{
      width:30vh !important;
      top:20vh !important;
    }
}
</style>
@section('content')
<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel" style="height:100vh;overflow:hidden">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner w-100" style="height:100vh;">
    <div class="carousel-item active w-100 " style="position: relative;width:100%;">
      <img src="/storage/system_pics/planeOne.jpg" class="d-block w-100 img-fluid carousel-image" style="height:100vh;"  alt="...">
      <div  class="rounded p-3 data-div-carousel" style="z-index:20;position: absolute;height:70vh;top:20vh;width:30vw;right:1vh !important;background-color:rgba(255, 255, 255, 0.5)">
        <h4 class="text-dark mx-auto" style="width:fit-content;font-family: lucida handwriting">Kenya Airways</h4>
        <h6 class="text-dark mx-auto text-warning" style="width:fit-content"><i>The pride of Africa</i></h6>
        <img class="w-100 m-2" src="/storage/system_pics/world.png"/>
        <h6 style="width:fit-content" class="mx-auto">Let's connect you to the world!</h6>
        <center><button style="margin:10px auto;" class="btn btn-info m-2">Check available flights</button></center>
      </div>
    </div>
    <div class="carousel-item">
      <img src="/storage/system_pics/planeTwo.jpg" class="d-block w-100 img-fluid carousel-image" style="height:100vh;" alt="...">
    </div>
    <div class="carousel-item">
      <img src="/storage/system_pics/planeThree.jpg" class="d-block w-100 img-fluid carousel-image" style="height:100vh;" alt="...">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

<div id="flightsHome" class="p-0 position-relative">

</div>


@endsection