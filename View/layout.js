
export const layout = {

    HEADER_HEIGHT:50,
    FOOTER_HEIGHT:75,

    LEFTBUFFER:50,//window.innerWidth/10,
    //LEFTBUFFER: Math.max((window.innerWidth-1100)/2,15),
    BOTTOMBUFFER: window.innerHeight-80,
    TOPBUFFER: 80,
    MAXHEIGHT: 470,

    CENTER: window.innerHeight/2 -50,
    //CENTER: Math.max((window.innerWidth-1100)/2,20)+window.innerWidth/2,

    NEXTSLIDE_X: (window.innerWidth/2) +100,
    PREVSLIDE_X: (window.innerWidth/2) -100,

    NEXTSLIDE_Y: window.innerHeight-(75/2),

    BOTTOMLIM: window.innerHeight*(9/10),
    INNERHEIGHT: window.innerHeight-(50+75),

    BLUEBERRY_WIDTH: 120,
    
    BUTTONS_X:  Math.max((window.innerWidth-1100)/2,20) +50,


    /****** NEURONS ******/
    NEURON_LEFTLIM_INIT: Math.max((window.innerWidth-1100)/2,15) +440,
    NEURON_LEFTLIM: Math.max((window.innerWidth-1100)/2,15) +440,

    NEURON_LEFTLIM_BACKPROP: Math.max((window.innerWidth-1100)/2,15) +250,
    NEURON_LARGE_LEFTLIM: Math.max((window.innerWidth-1100)/2,20)+525,
    NEURON_LEFTLIM_SANDBOX: 440,//Math.max((window.innerWidth-1100)/2,15) +350,

    NEURON_UPPERLIM: 240,
    NEURON_UPPERLIM_INIT: 240,
    NEURON_UPPERLIM_SANDBOX: 230,



    NEURON_UPPERLIM_LARGE:150,

    NEURON_X_DIF: 150,
    NEURON_Y_DIF: 125,

    NEURON_LARGE_X: Math.max((window.innerWidth-1100)/2,20)+925,
    NEURON_LARGE_Y: 280,

    NEURON_LARGE_Y_DIF:250,

    NEURON_NUDGE: 35,

   // ACTFNS_X:(window.innerHeight-80)-100,

   /******BACKPROP */
   DZDW:50,
   DADZ:50,
   DCDA:50,

}

if(window.innerWidth>1280){
    layout.LEFTBUFFER=400;
}