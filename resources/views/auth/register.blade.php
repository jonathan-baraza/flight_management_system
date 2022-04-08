
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
    <title>KQ | Register</title>
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

<div class="row p-3 d-flex justify-content-center align-items-center p-3  w-100 ">
    <div id="formDiv" class="col-sm-4 border p-4 rounded d-flex justify-content-center align-items-center p-3 flex-column">
    <h3 class="mx-auto" style="width:fit-content">Register</h3>

       <img src="/storage/system_pics/logo.png" style="width:100px;"/>
        <x-jet-validation-errors class="mb-4" />

        <form class="w-100 m-3" method="POST" action="{{ route('register') }}">
            @csrf

            <div class=" form-group">
                <x-jet-label for="name" value="{{ __('Name') }}" />
                <x-jet-input id="name" class="form-control" type="text" name="name" :value="old('name')" required autofocus autocomplete="name" />
            </div>

            <div class="mt-4 form-group">
                <x-jet-label for="email" value="{{ __('Email') }}" />
                <x-jet-input id="email" class="form-control" type="email" name="email" :value="old('email')" required />
            </div>

            <div class="mt-4 form-group">
                <x-jet-label for="password" value="{{ __('Password') }}" />
                <x-jet-input id="password" class="form-control" type="password" name="password" required autocomplete="new-password" />
            </div>

            <div class="mt-4 form-group">
                <x-jet-label for="password_confirmation" value="{{ __('Confirm Password') }}" />
                <x-jet-input id="password_confirmation" class="form-control" type="password" name="password_confirmation" required autocomplete="new-password" />
            </div>

            @if (Laravel\Jetstream\Jetstream::hasTermsAndPrivacyPolicyFeature())
                <div class="mt-4">
                    <x-jet-label for="terms">
                        <div class="flex items-center">
                            <x-jet-checkbox name="terms" id="terms"/>

                            <div class="ml-2">
                                {!! __('I agree to the :terms_of_service and :privacy_policy', [
                                        'terms_of_service' => '<a target="_blank" href="'.route('terms.show').'" class="underline text-sm text-gray-600 hover:text-gray-900">'.__('Terms of Service').'</a>',
                                        'privacy_policy' => '<a target="_blank" href="'.route('policy.show').'" class="underline text-sm text-gray-600 hover:text-gray-900">'.__('Privacy Policy').'</a>',
                                ]) !!}
                            </div>
                        </div>
                    </x-jet-label>
                </div>
            @endif

            <div class="d-flex flex-column align-items-center mt-4">
                 <x-jet-button class="ml-4 m-2 btn btn-success">
                    {{ __('Register') }}
                </x-jet-button>
                <a class="underline m-2 text-sm text-gray-600 hover:text-gray-900" href="{{ route('login') }}">
                    {{ __('Already registered?') }}
                </a>

               
            </div>
        </form>

</div>
</div>
</body>
</html>