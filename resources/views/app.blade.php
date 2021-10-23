<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="/css/app.css">
    <title>Document</title>
</head>
<body>
    <header>
       Rocin Rails
    </header>
    <div id="modal">
        <!-- The Modal -->
        <div id="myModal" class="modal">
        
          <!-- Modal content -->
          <div class="modal-content">
            <span class="close">&times;</span>
            <p>Some text in the Modal..</p>
          </div>
        </div>
    </div>

    <div id="app">
        <div id="response" v-text="test"></div>
        <div id="navigation-buttons">
            <button id="right-button"> > </button>
            <button id="left-button"> < </button>
        </div>
        <div id="add-buttons">
            
            <button id="plus-button"> T </button>
            <button id="draw-button"> P </button>
        </div>

    </div> 

<script src="/js/app.js"></script>
</body>
</html>