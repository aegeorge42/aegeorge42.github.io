export const layout = {

    HEADER_HEIGHT:50,
    FOOTER_HEIGHT:75,

    //LEFTBUFFER: window.innerWidth/2 - window.innerWidth*(3/8),

    LEFTBUFFER: Math.max((window.innerWidth-1100)/2,15),
    BOTTOMBUFFER: window.innerHeight-80,
    TOPBUFFER: 70,


    CENTER: Math.max((window.innerWidth-1100)/2,20)+window.innerWidth/2,

    NEXTSLIDE_X: (window.innerWidth/2) +100,
    PREVSLIDE_X: (window.innerWidth/2) -100,

    NEXTSLIDE_Y: window.innerHeight-(75/2),

    BOTTOMLIM: window.innerHeight*(9/10),
    INNERHEIGHT: window.innerHeight-(50+75),

    //CARDHEIGHT: 444,
    //CARDWIDTH: 300,

    BLUEBERRY_WIDTH: 120,
    
    BUTTONS_X:  Math.max((window.innerWidth-1100)/2,20) +50,

    NEURON_LEFTLIM: 500,
    NEURON_UPPERLIM: 150,

    NEURON_X_DIF: 150,
    NEURON_Y_DIF: 125,

    NEURON_LARGE_X: Math.max((window.innerWidth-1100)/2,20)+925,
    NEURON_LARGE_Y: 280,
    //NEURON_LARGE_WIDTH: 250,

    NEURON_LARGE_Y_DIF:250,

    NEURON_LARGE_LEFTLIM: Math.max((window.innerWidth-1100)/2,20)+525,
    NEURON_NUDGE: 35



}
