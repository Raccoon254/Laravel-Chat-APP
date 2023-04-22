<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Websocket</title>
    <link href="https://cdn.jsdelivr.net/npm/daisyui@2.51.5/dist/full.css" rel="stylesheet" type="text/css" />
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="flex flex-col items-center">
<div class="w-8/12 border-gray-400 flex flex-col items-center">

    <h1>Chat Area</h1>


    <ul id="list-messages" class="w-10/12 pb-4">
    </ul>


    <form id="form" class="w-full flex items-center justify-center">
        @csrf
        <label class="label" for="message">
            <span class="label-text"></span>
        </label>
        <div class="form-control w-full max-w-xs pr-1">
            <input type="text" placeholder="Type here" id="message" class="input input-bordered input-success w-full max-w-xs" />
        </div>
        <button type="submit" class="w-2/12 btn btn-outline btn-success">Send</button>
    </form>

</div>
@vite('resources/js/app.js')
</body>
</html>
