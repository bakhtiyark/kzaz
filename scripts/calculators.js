var an
var regexp = ",";
var erstatt = ".";
var calcVal = {
    ammonia: 0.822,
    urea: 0.46,
    an: 0.335,
    can: 0.27,
    sm3x: 0.0379,
    mmbtuX: 26.37,
    as:0.21
};
var labels = {
    sm3X: document.querySelector("[data-calc='sm3X']"),
    mmbtuX: document.querySelector("[data-calc='mmbtuX']")
};

function calculate(num) {
    var result = Number.isFinite(num) ? num < 1 ? Math.round(num * 1e7) / 1e7 : Math.round(num) : "";
    return result;
}

function zeroNaN(num) {
    var result = Number.isFinite(num) ? num : 0;
    return result;
}

if (Number.isFinite === undefined) Number.isFinite = function (value) {
    return typeof value === 'number' && isFinite(value);
}

function ureaCalc(form) {
    var urea = form.urea.value;
    if (urea.indexOf(',') != -1) {
        urea = urea.replace(regexp, erstatt);
    }
    form.ammonia.value = calculate((parseFloat(urea) / calcVal.urea * calcVal.ammonia) * 10) / 10;
    form.an.value = calculate((parseFloat(urea) / calcVal.urea * calcVal.an) * 10) / 10;
    form.can.value = calculate((parseFloat(urea) / calcVal.urea * calcVal.can) * 10) / 10;
}

function ureaCalc2(form) {
    var urea = form.urea.value;
    if (urea.indexOf(',') != -1) {
        urea = urea.replace(regexp, erstatt);
    }
    form.ammonia.value = calculate(parseFloat(urea) / calcVal.ammonia * calcVal.urea);
    form.an.value = calculate(parseFloat(urea) / calcVal.an * calcVal.urea);
    form.can.value = calculate(parseFloat(urea) / calcVal.can * calcVal.urea);
}

function ammoCalc(form) {
    var ammonia = form.ammonia.value;
    if (ammonia.indexOf(',') != -1) {
        ammonia = ammonia.replace(regexp, erstatt);
    }
    form.urea.value = calculate((parseFloat(ammonia) / calcVal.ammonia * calcVal.urea) * 10) / 10;
    form.an.value = calculate((parseFloat(ammonia) / calcVal.ammonia * calcVal.an) * 10) / 10;
    form.can.value = calculate((parseFloat(ammonia) / calcVal.ammonia * calcVal.can) * 10) / 10;
}

function ammoCalc2(form) {
    var ammonia = form.ammonia.value;
    if (ammonia.indexOf(',') != -1) {
        ammonia = ammonia.replace(regexp, erstatt);
    }
    form.urea.value = calculate(parseFloat(ammonia) / calcVal.urea * calcVal.ammonia);
    form.an.value = calculate(parseFloat(ammonia) / calcVal.an * calcVal.ammonia);
    form.can.value = calculate(parseFloat(ammonia) / calcVal.can * calcVal.ammonia);
}

function anCalc(form) {
    var an = form.an.value;
    if (an.indexOf(',') != -1) {
        an = an.replace(regexp, erstatt);
    }
    form.ammonia.value = calculate(parseFloat(an) / calcVal.ammonia * calcVal.an);
    form.urea.value = calculate(parseFloat(an) / calcVal.urea * calcVal.an);
    form.can.value = calculate(parseFloat(an) / calcVal.can * calcVal.an);
}

function canCalc(form) {
    var can = form.can.value;
    if (can.indexOf(',') != -1) {
        can = can.replace(regexp, erstatt);
    }
    form.ammonia.value = calculate(parseFloat(can) / calcVal.ammonia * calcVal.can);
    form.an.value = calculate(parseFloat(can) / calcVal.an * calcVal.can);
    form.urea.value = calculate(parseFloat(can) / calcVal.urea * calcVal.can);
}

function volumeChangeClear() {
    document.volumechange.ammonia.value = "";
    document.volumechange.urea.value = "";
    document.volumechange.an.value = "";
    document.volumechange.can.value = "";
}

function priceChangeClear() {
    document.pricechange.ammonia.value = "";
    document.pricechange.urea.value = "";
    document.pricechange.an.value = "";
    document.pricechange.can.value = "";
}

function convClear1() {
    document.metric_short.metric.value = "";
    document.metric_short.short.value = "";
}

function convClear2() {
    document.sm3_mmbtu.sm3.value = "";
    document.sm3_mmbtu.mmbtu.value = "";
    document.sm3_mmbtu.assumption.value = "40";
    labels.sm3X.innerHTML = "0.0379";
    labels.mmbtuX.innerHTML = "26.37";
    document.sm3_mmbtu.fwd.value = "0.0379";
    document.sm3_mmbtu.bck.value = "26.37";

}

function convClear3() {
    document.mjoule_mmbtu.mjoule.value = "";
    document.mjoule_mmbtu.mmbtu.value = "";
}

function convClear4() {
    document.kwh_mmbtu.kwh.value = "";
    document.kwh_mmbtu.mmbtu.value = "";
}

function convClear5() {
    document.therm_mmbtu.therm.value = "";
    document.therm_mmbtu.mmbtu.value = "";
}

function metricShort(form) {
    var metric = form.metric.value;
    if (metric.indexOf(',') != -1) {
        metric = metric.replace(regexp, erstatt);
    }
    form.short.value = calculate(parseFloat(metric) * 1.1023);
}

function shortMetric(form) {
    var short = form.short.value;
    if (short.indexOf(',') != -1) {
        short = short.replace(regexp, erstatt);
    }
    form.metric.value = calculate(parseFloat(short) * 0.9072);
}

function mjouleMmbtu(form) {
    var mjoule = form.mjoule.value;
    if (mjoule.indexOf(',') != -1) {
        mjoule = mjoule.replace(regexp, erstatt);
    }
    form.mmbtu.value = calculate((parseFloat(mjoule) / 1055) * 10) / 10;
}

function mmbtuMjoule(form) {
    var mmbtu = form.mmbtu.value
    if (mmbtu.indexOf(',') != -1) {
        mmbtu = mmbtu.replace(regexp, erstatt);
    }
    form.mjoule.value = calculate(parseFloat(mmbtu) * 1055);
}

function sm3Mmbtu(form) {
    var factor = (parseFloat(document.sm3_mmbtu.assumption.value) * (0.948 * 10E-3)) / 10;
    var sm3 = form.sm3.value;
    if (sm3.indexOf(',') != -1) {
        sm3 = sm3.replace(regexp, erstatt);
    }
    form.mmbtu.value = calculate((parseFloat(sm3) * factor) * 10) / 10;
}

function mmbtuSm3(form) {
    var factor = (parseFloat(document.sm3_mmbtu.assumption.value) * (0.948 * 10E-3)) / 10;
    var mmbtu = form.mmbtu.value;
    if (mmbtu.indexOf(',') != -1) {
        mmbtu = mmbtu.replace(regexp, erstatt);
    }
    form.sm3.value = calculate(parseFloat(mmbtu) * (1 / factor));
}

function kwhMmbtu(form) {
    var kwh = form.kwh.value;
    if (kwh.indexOf(',') != -1) {
        kwh = kwh.replace(regexp, erstatt);
    }
    form.mmbtu.value = calculate((parseFloat(kwh) / 293) * 10) / 10;
}

function mmbtuKwh(form) {
    var mmbtu = form.mmbtu.value;
    if (mmbtu.indexOf(',') != -1) {
        mmbtu = mmbtu.replace(regexp, erstatt);
    }
    form.kwh.value = calculate(parseFloat(mmbtu) * 293);
}

function thermMmbtu(form) {
    var therm = form.therm.value;
    if (therm.indexOf(',') != -1) {
        therm = therm.replace(regexp, erstatt);
    }
    form.mmbtu.value = calculate((parseFloat(therm) / 10) * 10) / 10;
}

function mmbtuTherm(form) {
    var mmbtu = form.mmbtu.value;
    if (mmbtu.indexOf(',') != -1) {
        mmbtu = mmbtu.replace(regexp, erstatt);
    }
    form.therm.value = calculate(parseFloat(mmbtu) * 10);
}

function display(form) {
    calcVal.sm3X = calculate(((0.948 * 10E-3) * form.assumption.value / 10) * 10000) / 10000;
    calcVal.mmbtuX = calculate(1 / ((0.948 * 10E-3) * form.assumption.value) * 1000) / 100;

    labels.sm3X.innerHTML = calcVal.sm3X;
    labels.mmbtuX.innerHTML = calcVal.mmbtuX;

}

function ammonia(form) {
    if (form.price.value.indexOf(',') != -1) {
        form.price.value = form.price.value.replace(regexp, erstatt);
    }
    if (form.cons.value.indexOf(',') != -1) {
        form.cons.value = form.cons.value.replace(regexp, erstatt);
    }
    if (form.costs.value.indexOf(',') != -1) {
        form.costs.value = form.costs.value.replace(regexp, erstatt);
    }
    if (form.aprice.value.indexOf(',') != -1) {
        form.aprice.value = form.aprice.value.replace(regexp, erstatt);
    }
    if (form.use.value.indexOf(',') != -1) {
        form.use.value = form.use.value.replace(regexp, erstatt);
    }
    if (form.pcosts.value.indexOf(',') != -1) {
        form.pcosts.value = form.pcosts.value.replace(regexp, erstatt);
    }
    if (form.ocosts.value.indexOf(',') != -1) {
        form.ocosts.value = form.ocosts.value.replace(regexp, erstatt);
    }
    form.ammoSubtot.value = calculate(parseFloat(form.price.value) * parseFloat(form.cons.value));
    form.ammoTotal.value = zeroNaN(parseFloat(form.ammoSubtot.value) + parseFloat(form.costs.value));
    form.aprice.value = zeroNaN(parseFloat(form.ammoTotal.value));
    form.anSubtot.value = calculate(parseFloat(form.price.value) * parseFloat(form.cons.value));
    form.ureaSubtot.value = calculate(parseFloat(form.aprice.value) * parseFloat(form.use.value));
    form.pcosts.value = calculate(form.price.value * parseFloat(5.15));
    form.ureaTotal.value = calculate(parseFloat(form.pcosts.value) + parseFloat(form.ocosts.value) + parseFloat(form.ureaSubtot.value));
    form.anTotal.value = calculate(parseFloat(form.pcosts.value) + parseFloat(form.ocosts.value) + parseFloat(form.anSubtot.value));
}

function urea(form) {
    if (form.aprice.value.indexOf(',') != -1) {
        form.aprice.value = form.aprice.value.replace(regexp, erstatt);
    }
    if (form.use.value.indexOf(',') != -1) {
        form.use.value = form.use.value.replace(regexp, erstatt);
    }
    if (form.pcosts.value.indexOf(',') != -1) {
        form.pcosts.value = form.pcosts.value.replace(regexp, erstatt);
    }
    if (form.ocosts.value.indexOf(',') != -1) {
        form.ocosts.value = form.ocosts.value.replace(regexp, erstatt);
    }
    form.ureaSubtot.value = calculate(parseFloat(form.aprice.value) * parseFloat(form.use.value));
    if (form.price.value) {
        form.pcosts.value = calculate((form.price.value * parseFloat(5.15)) * 100) / 100;
    }
    else {
        form.pcosts.value = 0;
    }
    form.ureaTotal.value = calculate(parseFloat(form.pcosts.value) + parseFloat(form.ocosts.value) + parseFloat(form.ureaSubtot.value));
}
function an(form) {
    if (form.aprice.value.indexOf(',') != -1) {
        form.aprice.value = form.aprice.value.replace(regexp, erstatt);
    }
    if (form.use.value.indexOf(',') != -1) {
        form.use.value = form.use.value.replace(regexp, erstatt);
    }
    if (form.ocosts.value.indexOf(',') != -1) {
        form.ocosts.value = form.ocosts.value.replace(regexp, erstatt);
    }
    form.anSubtot.value = calculate(parseFloat(form.aprice.value) * parseFloat(form.use.value));
    var resourceConsumption = 0.110
    var productionCost = calculate(parseFloat(form.aprice.value) * resourceConsumption);

    form.anTotal.value = calculate(parseFloat(productionCost) + parseFloat(form.ocosts.value) + parseFloat(form.anSubtot.value));
}

function clear1() {
    document.jscalc.price.value = "";
    document.jscalc.cons.value = "36";
    document.jscalc.ammoSubtot.value = "";
    document.jscalc.costs.value = "29";
    document.jscalc.ammoTotal.value = "";
    clear2();
}

function clear2() {
    document.jscalc.aprice.value = "";
    document.jscalc.use.value = "0.58";
    document.jscalc.ureaSubtot.value = "";
    document.jscalc.pcosts.value = "";
    document.jscalc.ocosts.value = "22";
    document.jscalc.ureaTotal.value = "";
}

function clear3() {
    document.jscalc.aprice.value = "";
    document.jscalc.use.value = "0.43";
    document.jscalc.anSubtot.value = "";
    document.jscalc.pcosts.value = "";
    document.jscalc.ocosts.value = "22";
    document.jscalc.anTotal.value = "";
}