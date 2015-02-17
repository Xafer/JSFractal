//(function(){
    
    //Variables
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');
    var imageData;
    var iterations = 50;

    var quality = 2;

    var width;
    var height;

    var detail = 10;

    var zoom = 0.25;

    var seed = 
    {
        x:0,
        y:0.75
    }
    
    var offset =
    {
        x:0,
        y:0
    }

    var color = 
    {
        red:0,
        green:1,
        blue:2,
        alpha:3
    }

    //Events and handlers

    function adaptSize()
    {
        width = window.innerWidth/quality;
        height = window.innerHeight/quality;
        canvas.width = width;
        canvas.height = height;
    }

    window.addEventListener("resize",adaptSize);

    //functions

    function fractal(x,y)
    {
        var tempX;
        for(var i = 0; i < iterations; i++)
        {
            if(x*x + y*y > detail*detail)
                return i;
            else
            {
                tempX = 2 * x * y + seed.x;
                y = x*x - y*y + seed.y;
                x = tempX;
            }
        }
        return 0;
    }

    function assignImageData()
    {
        
        var imgData = ctx.createImageData(width,height);
        
        var l = imgData.data.length;
        var p = 4;//color.length;
        
        var zoomFactor = (1/zoom);
        
        for(var i = 0, lw = l/height; i < lw; i += p)
        {
            for(var j = 0, lh = l/width; j < lh; j += p)
            {
                var x = i / 4;
                var y = j / 4;
                
                var pos = 
                {
                    x:((x/width)* zoomFactor - zoomFactor/2) + offset.x,
                    y:((y/height)* zoomFactor - zoomFactor/2) + offset.y
                }
                
                var iterationCounted = fractal(pos.x,pos.y);
                
                var n = (iterationCounted / iterations);
                
                n = n*n * 4;
                
                var index1D = i + j*width;
                
                imgData.data[index1D + color.red] = Math.sin(n*2)*128;
                imgData.data[index1D + color.green] = Math.sin(n*4)*2*256;
                imgData.data[index1D + color.blue] = Math.abs(Math.sin(n*7)*2*256);
                imgData.data[index1D + color.alpha] = 255;
                
            }
        }
        imageData = imgData;
    }

    //Main loops

    function control()
    {
        
        if(keys.zoomIn)
            zoom *= 1.05;
        if(keys.zoomOut)
            zoom *= 0.95;
        
        var zoomFactor = 1/zoom;
        
        if(keys.seedXplus)
            seed.x += 0.1 * zoomFactor;
        if(keys.seedXminus)
            seed.x -= 0.1 * zoomFactor;
        
        if(keys.seedYplus)
            seed.y += 0.1 * zoomFactor;
        if(keys.seedYminus)
            seed.y -= 0.1 * zoomFactor;
        
        if(keys.up)
            offset.y -= 0.01 * zoomFactor;
        if(keys.down)
            offset.y += 0.01 * zoomFactor;
        
        if(keys.left)
            offset.x -= 0.01 * zoomFactor;
        if(keys.right)
            offset.x += 0.01 * zoomFactor;
        
        if(keys.detailPlus)
            detail += 0.1;
        if(keys.detailMinus)
            detail -= 0.1;
        
        if(keys.iterationPlus)
            iterations += 10;
        if(keys.iterationMinus)
            iterations -= 10;
            
    }

    function render()
    {
        ctx.putImageData(imageData,0,0);
    }

    function main()
    {
        control();
        assignImageData();
        render();
        setTimeout(main,1)
    }

    function init()
    {
        adaptSize();
        main();
    }

    init();
//})();