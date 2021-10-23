<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="/css/app.css">
    <title>Document</title>
</head>
<body id="body">
    <header>
       Rocin Rails
    </header>
    <div id="modal">
        <!-- The Modal -->
        <div id="myModal" class="modal">
            
          <!-- Modal content -->
          <div id="ihatemylife" class="modal-content">
            {{-- <router-view></router-view> --}}
            <div id="container" class="container">
                <canvas id="drawing-area" class="drawing-area" height="500" width="500"></canvas>
                <button id="clear-button" class="clear-button" type="button">Clear</button>
            </div>
            <button id="saveBtn">Save</button>
          </div>
        </div>
    </div>
    <div id="draws">

    </div>
    <div id="app">
        <div id="navigation-buttons">
            <button id="right-button"> > </button>
            <button id="left-button"> < </button>
        </div>
        <div id="add-buttons">
            <button id="plus-button"> + </button>
        </div>
        
    </div> 

<script src="/js/app.js"></script>

</body>
</html>