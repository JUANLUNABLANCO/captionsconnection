exports.Console = (name, message)=>{
    var active  = _CONSOLE_ACTIVE;      // si activo pintará [graph, name, message] | no activo, pintará "" | o la ruta [graph, name]
    var route   = _CONSOLE_ROUTE;       // si activo pintará [graph, name]
    var graph   = _CONSOLE_GRAPH;      // si activo pintará [graph]
    // console.log(grsph, name, mesaage, active, route);
    // configuration
    name = name + ': ';

    // inicio
    if (active){ //==true
        if(!message){
            message = name.replace(': ', '');
            console.log(graph, message);            // --> mensaje
        } else {
            console.log(graph, name, message);      // --> name: mensaje
        }        
    } else {
        if (!route) {
            if(_CONSOLE_GRAPH == false){            //
                
            }
            else{
                console.log(_CONSOLE_GRAPH);        // -->
            }
        }else {
            console.log(graph, name);               // --> name:
        }
    }
};






















    // ejemplo:
    // myPrint.Console ('validation', 'estoy en validation');
    // salida>  '---> validation: estoy en validation'
    // myPrint.Console ('validation', 'estoy en validation', false);
    // salida>  '---> validation'
    // myPrint.Console ('validation', 'estoy en validation', false, false);
    // salida>  
    // myPrint.Console ('validation', 'estoy en validation', true, true, '#####');
     // salida>  '##### validation: estoy en validation'