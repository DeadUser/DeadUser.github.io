self.onmessage = function (msg) {
    switch (msg.data.msg) {
        case 'calculate': calculate(msg.data); break;
        case 'stop': stopper = true; break;
        default: throw 'Нераспознаное сообщение в worker.';
    }
};

var stopper = false;
var tubes = Array();
var bundles = Array();
var packs = Array();
var bundleLength = Number();

function calculate(data) {

    bundleLength = data.bundle;
    tubes = data.tubes.sort((a, b) => a.length - b.length);

    combineInBundles({ tubes: Array() });

    bundles.sort((a, b) => b.used - a.used);
    combinePacks({ bundles: [] });

    self.postMessage({ title: 'result', packs: packs, message: `Готово` });
}

function bundlesContainTubes(bundles, tubes) {
    for (var b = 0; b < bundles.length; b++)
        for (var t = 0; t < bundles[b].tubes.length; t++)
            if (tubes.some(e => e.id == bundles[b].tubes[t].id))
                return true;
    return false;
};

function packContainAllTube(bundles) {
    var temp = [];
    for (var b = 0; b < bundles.length; b++)
        for (var t = 0; t < bundles[b].tubes.length; t++)
            temp.push(bundles[b].tubes[t].id);
    return temp.sort().join('') == tubes.map(t => t.id).sort().join('');
};

function combinePacks(prev) {
    for (var i = 0; i < bundles.length; i++) {

        if (stopper) return;

        if (bundlesContainTubes(prev.bundles, bundles[i].tubes)) continue;

        var pack = {}
        pack.bundles = prev.bundles.concat([bundles[i]]);
        pack.id = pack.bundles.map(b => b.id).sort().join();

        pack.stump = Math.max(pack.bundles.map(b => b.stump));

        if (packContainAllTube(pack.bundles)) {
            if (!packs.some(p => p.id == pack.id))
                addPack(pack);
            return;
        }

        combinePacks(pack);
    }
};

function combineInBundles(prev) {
    for (var i = 0; i < this.tubes.length; i++) {

        if (stopper) return;

        if (prev.tubes.includes(tubes[i])) return;

        var bundle = {};
        bundle.tubes = prev.tubes.concat([tubes[i]]);
        bundle.used = bundle.tubes.map(x => Number(x.length)).reduce((a, b) => a + b);

        if (bundle.used > bundleLength) return;

        bundle.stump = Number(bundleLength - bundle.used).toFixed(2);
        bundle.id = bundle.tubes.map(t => t.id).sort().join('');

        if (!bundles.some(b => b.id == bundle.id))
            addBundle(bundle);

        combineInBundles(bundle);
    }
};

function addBundle(bundle) {
    bundles.push(bundle);
    if (bundles.length % 100 == 0)
        self.postMessage({ title: 'bundles', bundles: bundles, message: `Создано ${bundles.length} бухт` });
};

function addPack(pack) {
    packs.push(pack);
    if (packs.length % 100 == 0)
        self.postMessage({ title: 'packs', packs: packs, message: `Рассмотрено ${packs.length} вариантов` });
};