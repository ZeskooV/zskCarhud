local inCar = false
local p = PlayerPedId()
local ZSK = {}
ZSK.showCarhud = function(data)
    SendNUIMessage({
        street = data.streets,
        speed = data.speed,
        type = "carhud:mostrar"
    })
end
ZSK.toggleCinto = function()
    SendNUIMessage({
        type = "toggleCinto"
    })
end
ZSK.hideCarhud = function()
    SendNUIMessage({
        type = "carhud:ocultar";
    })
end
ZSK.GetStreet = function()
    local coords = GetEntityCoords(PlayerPedId());
    local zone = GetNameOfZone(coords.x, coords.y, coords.z);
    local zoneLabel = GetLabelText(zone);
    return zoneLabel
end
CreateThread(function()
    while true do
        inCar = false
        if (IsPedInAnyVehicle(p)) then
            inCar = true
            ZSK.showCarhud({
                speed = GetEntitySpeed(GetVehiclePedIsIn(PlayerPedId()))*3.6;
                streets = ZSK.GetStreet();
            })
        else
            ZSK.hideCarhud()
            SetTimeout(1000, function()
                inCar = false
            end)
        end
        if (inCar) then
            Wait(140)
        else
            Wait(5000)
        end
    end
end)
RegisterCommand("cinturon", function(source, args)
    ZSK.toggleCinto()
end)