
export const layout = {

    CX: window.innerWidth/2,
    CY: window.innerHeight/2 -20,

    NEURON_LARGE_Y_DIF: 250,


    NEURON_LEFTLIM: window.innerWidth/2 - 200,
    NEURON_UPPERLIM: window.innerHeight/2 -80,

    NEURON_LEFTLIM_INIT: window.innerWidth/2 - 200,
    NEURON_LEFTLIM_SANDBOX: 430,
    NEURON_LEFTLIM_BACKPROP: window.innerWidth/2 - 318,
    NEURON_LEFTLIM_LARGE: window.innerWidth/2 + 300,

    HEADER_HEIGHT:50,
    FOOTER_HEIGHT:75,

    LEFTBUFFER:0,//window.innerWidth/10,
    BOTTOMBUFFER: window.innerHeight-80,
    TOPBUFFER: 0,
    MAXHEIGHT: 470,

    CENTER: window.innerHeight/2 -50,

    NEXTSLIDE_X: (window.innerWidth/2) +100,
    PREVSLIDE_X: (window.innerWidth/2) -100,

    NEXTSLIDE_Y: window.innerHeight-(75/2),

    BOTTOMLIM: window.innerHeight*(9/10),
    INNERHEIGHT: window.innerHeight-(50+75),

    BLUEBERRY_WIDTH: 120,
    
    BUTTONS_X:  Math.max((window.innerWidth-1100)/2,20) +50,

    NEURON_X_DIF: 150,
    NEURON_Y_DIF: 125,

    NEURON_LARGE_X: Math.max((window.innerWidth-1100)/2,20)+925,
    NEURON_LARGE_Y: 280,

    NEURON_NUDGE: 35,


   /******BACKPROP */
   DZDW:50,
   DADZ:50,
   DCDA:50,

}