<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap" rel="stylesheet">
    <x-links/>
    <title>KQ | Login</title>
    <style>
        body{
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        }
        #formDiv{
            background-color: white;
        }
    </style>
</head>
<body class="w-100" style="background-image: url('/storage/system_pics/planeThree.jpg');">

<div class="row p-3 mt-4 d-flex justify-content-center align-items-center p-3  w-100 ">
    <div id="formDiv" class="col-sm-4 border p-4 rounded d-flex justify-content-center align-items-center p-3 flex-column">
    <h3 class="mx-auto" style="width:fit-content">Login</h3>

       <img src="/storage/system_pics/logo.png" style="width:100px;"/>
        <x-jet-validation-errors class="mb-4" />

        @if (session('status'))
            <div class="mb-4 font-medium text-sm text-green-600">
                {{ session('status') }}
            </div>
        @endif

        <form method="POST" class="w-100 p-3" action="{{ route('login') }}">
            @csrf

            <div class=" form-group">
                <x-jet-label for="email" value="{{ __('Email') }}" />
                <x-jet-input id="email" class="form-control" type="email" name="email" :value="old('email')" required autofocus />
            </div>

            <div class="mt-4 form-group">
                <x-jet-label for="password" value="{{ __('Password') }}" />
                <x-jet-input id="password" class="form-control" type="password" name="password" required autocomplete="current-password" />
            </div>

            

            <div class="d-flex align-items-center justify-content-end flex-column mt-4">
                 <x-jet-button class="m-3 btn btn-success">
                    {{ __('Log in') }}
                </x-jet-button>
               <a href="/register">You dont have an account?</a>

               
            </div>
        </form>
        </div>
</div>
</body>
</html>
   