var keys = 
{
    seedXplus:false,
    seedXminus:false,
    seedYplus:false,
    seedYminus:false,
    
    up:false,
    down:false,
    left:false,
    right:false,
    
    zoomIn:false,
    zoomOut:false,
    
    detailPlus:false,
    detailMinus:false,
    
    iterationPlus:false,
    iterationMinus:false
}

function keyHandler(key,state)
{
    //console.log(key);
    switch(key)
    {
        case 81:keys.seedXplus = state;break;
        case 65:keys.seedXminus = state;break;
        case 87:keys.seedYplus = state;break;
        case 83:keys.seedYminus = state;break;
        
        case 38:keys.up = state;break;
        case 40:keys.down = state;break;
        case 37:keys.left = state;break;
        case 39:keys.right = state;break;
            
        case 109:keys.zoomOut = state;break; 
        case 107:keys.zoomIn = state;break;
            
        case 68:keys.detailMinus = state;break;
        case 69:keys.detailPlus = state;break;
            
        case 90:keys.iterationPlus = state;break;
        case 88:keys.iterationMinus = state;break;
    }
}

window.addEventListener('keydown',function(e){keyHandler(e.keyCode,true);});
window.addEventListener('keyup',function(e){keyHandler(e.keyCode,false);});