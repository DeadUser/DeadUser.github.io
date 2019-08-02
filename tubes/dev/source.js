/*properties*/
'use strict';

/*variables UI*/
var all = document.getElementsByTagName('*');
var btnAdd = document.getElementById('btn_add');
var btnClear = document.getElementById('btn_clear');
var btnPrint = document.getElementById('btn_print');
var btnTest = document.getElementById('btn_test');
var btnStart = document.getElementById('btn_start');
var btnStop = document.getElementById('btn_stop');
var text1 = document.getElementById('tube_length');
var text2 = document.getElementById('tube_desc');
var data = document.getElementById('tubes');
var result = document.getElementById('result');
var message = document.getElementById('message');
var bundle = document.getElementById('bundle_length');

/*preparing UI*/
Array.from(all).forEach(e => e.tabIndex = '-1')
text1.tabIndex = '1';
text2.tabIndex = '2';
btnAdd.tabIndex = '3';
btnStart.tabIndex = '4';

/*preparing worker*/
var worker = null;
var blob = new Blob([document.querySelector('#worker').textContent], { type: 'text/javascript' });

if (typeof (Worker) == 'undefined') {
    message.innerHTML = 'Этот браузер не поддерживает Workers.. Обратитись к разработчику';
    throw 'Sorry, your browser does not support Web Workers...';
}

/*code*/
var tubes = Array();
var bundles = Array();
var packs = Array();

function stopWorker() {
    worker.postMessage({ msg: 'stop' });
    worker.terminate();
    worker = undefined;

    if (packs.length) {
        packs.sort((a, b) => a.bundles.length - b.bundles.length);
        packs = [packs[0]];
        drawResults();
    }

    text1.disabled = false;
    text2.disabled = false;
    btnAdd.disabled = false;
    btnStart.disabled = false;
    btnPrint.disabled = false;
    bundle.disabled = false;
    btnClear.disabled = false;
    btnStop.disabled = true;
}

function startWorker() {
    text1.disabled = true;
    text2.disabled = true;
    btnAdd.disabled = true;
    btnPrint.disabled = true;
    btnStart.disabled = true;
    bundle.disabled = true;
    btnClear.disabled = true;
    btnStop.disabled = false;

    clear(false);
    text1.enabled = false;
    worker = new Worker('worker1.js');
    worker.onmessage = message => handle(message);
    worker.postMessage({ msg: 'calculate', tubes: tubes, bundle: bundle.value });
}

function handle(message) {
    switch (message.data.title) {
        case 'result': stopWorker(); break;
        case 'packs': packs = message.data.packs; break;
        case 'bundles': bundles = message.data.bundles; break;
    }
    document.getElementById("message").innerHTML = message.data.message;
}

function addTube() {
    var tube = {
        id: numberToSymbol(tubes.length),
        length: Number(text1.value).toFixed(2),
        description: String(text2.value)
    };
    if (tube.length <= 0 || tube.length > bundle) return;
    tubes.push(tube);

    drawTubes();
};

function drawTubes() {
    data.innerHTML = String();
    for (var i = tubes.length - 1; i >= 0; i--)
        data.innerHTML += `<tr><td>${Number(tubes[i].length)}</td><td>${tubes[i].description}</td>
            <td><button tabindex='-1' onclick='deleteTube("${tubes[i].id}")'></td></tr>`;
};

function deleteTube(id) {
    tubes = tubes.filter((e) => e.id != id);
    drawTubes();
};

function clear(all = true) {
    if (all) clearAll();
    bundles = [];
    packs = [];
    drawTubes();
    drawResults();
};

function clearAll() {
    message.innerHTML = String();
    text1.value = String();
    text2.value = String();
    tubes = [];
    bundles = [];
    packs = [];

    drawTubes();
    drawResults();
};

function numberToSymbol(num) {
    return 'abcdefghijklmnopqrstuvwxyz'[num];
};

function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}

function test() {
    clear();
    for (var i = 0; i < 15; i++) {
        var tube = {
            id: numberToSymbol(tubes.length),
            length: randomInteger(30, 90),
            description: String(`Тестовая труба ${tubes.length}`)
        };
        if (tube.length <= 0 || tube.length > bundle) return;
        tubes.push(tube);
    }
    drawTubes();
    startWorker();
};

function drawResults() {
    result.innerHTML = String();
    if (!packs.length || !packs[0])
        return;

    result.innerHTML =
        `<thead><tr>
            <th scope='col'>Длина</th>
            <th scope='col'>Примечание</th>
            </tr></thead><tbody>`;

    for (var p = 0; p < packs.length; p++) {
        var pack = packs[p];

        //result.innerHTML += `<tr><th></th><th><br><br>ВАРИАНТ ${p + 1}</th></tr>`
        for (var b = 0; b < pack.bundles.length; b++) {
            var bundle = pack.bundles[b];
            result.innerHTML +=
                `<tr><th></th><th>Бухта: ${b + 1}; Использовано: ${Number(bundle.used.toFixed(2))}; Остаток: ${Number(bundle.stump)};</th></th>`;
            for (var t = 0; t < bundle.tubes.length; t++) {
                var tube = bundle.tubes[t];
                result.innerHTML +=
                    `<tr><td>${tube.length}</td><td>${tube.description}</td></tr>`;
            }
        }

    }
    result.innerHTML += `</tbody>`;
    result.innerHTML += `<div style="height: 100px;"></div>`;
};

function printData() {
    window.frames["print_frame"].document.body.innerHTML = String();
    window.frames["print_frame"].document.body.innerHTML += `<style type='text/css'>table { border-collapse: collapse; width: 100%; } table, th, td { border: 1px solid black; }</style>`
    window.frames["print_frame"].document.body.innerHTML += document.getElementById("result_for_print").innerHTML;
    window.frames["print_frame"].window.focus();
    window.frames["print_frame"].window.print();
}