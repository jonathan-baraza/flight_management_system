<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css">
    <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
  />
 
    <x-links/>
    <title>@yield('title')</title>
    <style>
      *{
        font-family:  'Roboto', sans-serif !important;
      }

       @media only screen and (max-width: 600px) {
          .navbar-brand{
            font-size: 20px !important;
        }
        #chatbot_div{
          max-width:100vw !important;
          width:70vw !important;
          right:2px !important;
         
        }
       }
      .nav-item{
        margin:10px;
      }
        .nav-link{
            font-size: 16px !important;
            
        }
        .nav-link:hover{
          color:#dc3545 !important;

        }
        .link{
          margin-top: 10px;
        }
        .link:hover{
          text-decoration: underline;
          cursor: pointer;

        }
       
        .navbar-brand{
            font-size: 28px;
        }
        .underline{
          width:0%;
          height: 2px;
          transition: 0.5s;
          
        }
        .active-link{
          color:#dc3545 !important;
        }
        .active-underline{
          width:100% !important;
          transition: 0.5s !important;
        }

        #topIcon:hover{
          transform: scale(1.2);
          cursor: pointer;
        }

       
    </style>
</head>
<body>
  <div id="navbarTop" class="position:absolute m-0 p-0"></div>
    <nav id="navbar" class="navbar navbar-expand-lg navbar-light bg-white shadow   ps-3">
  <div class="container-fluid ps-0">
    <div class="d-flex align-items-center ">
      <a class="navbar-brand text-danger fw-bolder me-2" style="font-family: lucida handwriting" href="/">Kenya Airways</a>
        <img class="" style="width:100px;" src="/storage/system_pics/logo.png"/>
    </div>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto me-3 mb-2 mb-lg-0  pe-5 pt-3 pb-3">
        <li class="nav-item " id="homeItem">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
          <div class="underline bg-danger m-0"></div>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">About</a>
          <div class="underline bg-danger m-0"></div>
        </li>
         <li class="nav-item">
          <a class="nav-link" href="#">Flights</a>
          <div class="underline bg-danger m-0"></div>
        </li>
         <li class="nav-item">
          <a class="nav-link" href="#">Contact us</a>
          <div class="underline bg-danger m-0"></div>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Create account
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="#">Create Account</a></li>
            <li><a class="dropdown-item" href="#">Login</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="/user-logout">Logout</a></li>
          </ul>
        </li>
         <li class="nav-item">
          <a class="nav-link" href="#">FAQs</a>
          <div class="underline bg-danger m-0"></div>
        </li>
        
      </ul>
      
    </div>
  </div>
</nav>

   @yield('content')

   

<div id="chatbot_div" class="d-flex flex-column ju stify-content-end align-items-center me-1"  style="position: fixed;bottom:5px;right:10px;max-width:20vw;z-index:30;">
 
 </div>

<footer class="m-0 p-0 w-100" style="background-image: url('/storage/system_pics/planeFive.jpg');height:fit-content;background-repeat:no-repeat;background-size:cover;background-position:center;position: relative;">
<div class="row d-flex justify-content-around p-3 m-0" style="position: relative;top:0px;bottom:0px;left:0px;background-color:rgba(255, 0, 0, 0.4);'">
  <div class="col-sm-4 m-1 rounded p-3" style="background-color: rgba(255,255,255,0.3);font-weight:bolder;">
        <div class="navbar-brand fw-bolder" style="color: black !important;font-family:lucida handwriting;">
          Kenya Airways
        </div>

        <small class="text-black mt-2">
          Kenya Airways Ltd., more commonly known as Kenya Airways, is the flag carrier airline of Kenya. The company was founded in 1977, after the dissolution of East African Airways. Its head office is located in Embakasi, Nairobi, with its hub at Jomo Kenyatta International Airport.
        </small>
<br>
        <a href="" class="btn btn-sm m-3 btn-info animate__animated animate__pulse animate__infinite">Check out our flights today</a>
      </div>
    <div class="col-sm-4 m-1 rounded p-3"  style="background-color: rgba(255,255,255,0.3);font-weight:bolder;">
        <h4 class="text-black">Important links</h4>
        <ul>
         
          <li class="text-black link">Create free account</li>
          <li class="text-black link">Login to your account</li>
          <li class="text-black link">Available flights</li>
          <li class="text-black link">Contact us</li>
          <li class="text-black link">Gallery</li>
          <li class="text-black link">Our partners</li>
        </ul>
      </div>
      <div class="col-sm-3 m-1  rounded p-3"  style="background-color: rgba(255,255,255,0.3);font-weight:bolder;">
        <p class="mt-3 text-black fw-bolder">Subscribe to our news letter</p>
        <input
          type="text"
          class="form-control mt-1"
          placeholder="Enter your email..."
        />
        <div class="w-100 d-flex justify-content-end">
          <button class="btn btn-success btn-sm mt-2">Subscribe</button>
        </div>
      </div>

      <p class="text-black fw-bolder mx-auto text-center mt-5 mb-3">
        KenyaAirways &copy; 2022. All Rights Reserved
      </p>
  <a href="#navbarTop"><i class="bi bi-arrow-up-circle text-black" id="topIcon" style="position:absolute;right:10px;bottom:10px;font-size:30px;cursor:pointer;"></i></a>
</div>


</footer>




  <script>
    $(document).ready(function(){
      $("#homeItem").find(".underline").addClass("active-underline");
      $("#homeItem").find(".nav-link").addClass("active-link");
      $(".nav-item").hover(function(){
        $(this).find(".underline").css("width","100%");
      });
      $(".nav-item").mouseleave(function(){
        $(this).find(".underline").css("width","0%");
      });

      $(".nav-item").click(function(){
        $(".underline").removeClass("active-underline");
        $(".nav-link").removeClass("active-link");
        $(this).find(".underline").addClass("active-underline");
        $(this).find(".nav-link").addClass("active-link");
      });

    })
  </script>
  <script src="{{asset('js/app.js')}}" defer>
		
	</script>
</body>
</html>