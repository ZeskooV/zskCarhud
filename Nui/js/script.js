(() => {
    let ZSK = {};
    ZSK.ChangeStreets = function(txt) {
        $('.calles').text(txt);
    };
    let cinto = false;
    ZSK.ToggleCinto = function() {
        if (cinto) {
            cinto = false;
            $('#cinto').addClass('cintoOff');
        }else{
            cinto = true;
            $('#cinto').removeClass('cintoOff');
        }
    };
    ZSK.SetSpeed = function(speed) {
        let speed2;
        if (speed >= 1001) {
            speed2 = "+1000";
        }else{
            if (Math.round(speed) === 0) {
                $('.kmh-peque').fadeOut(500);
                speed2 = "ZSK";
            }else{
                $('.kmh-peque').fadeIn(500);
                speed2 = Math.round(speed);
            }
        }
        $('.kilometraje-text').text(speed2);
    };
    ZSK.SetDisplay = function(t) {
        if (t) {
            $('#ui').fadeIn(500);
        } else {
            $('#ui').fadeOut(500);
        }
    };
    window.addEventListener('message', async (event) => {
        let e = event.data;
        if (e.type == "carhud:mostrar") {
            ZSK.SetDisplay(true);
            ZSK.ChangeStreets(e.street);
            ZSK.SetSpeed(e.speed);
        } else if (e.type == "carhud:ocultar") {
            ZSK.SetDisplay(false);
        } else if (e.type == "toggleCinto") {
            ZSK.ToggleCinto();
        }
    });
})();