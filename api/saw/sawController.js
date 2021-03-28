const _ = require('lodash')

const h = require('../../helper/helper')

const saw = require('./components/saw')
const ahp = require('./components/ahp')

exports.getRecomendation = (req, res) => {
	let post = req.body.data;
	let rule = req.body.rule;
	let criteria = req.body.criteria;
	let getNilaiBobot = post;
	let getMaxMin = saw.getMinMax(getNilaiBobot);
	let normalisasiNilai = _.map(getNilaiBobot, nilai => saw.normalisasi(nilai, getMaxMin, rule));
	let hitungBobotPeringkat = _.map(normalisasiNilai, nilai => saw.hitungPeringkat(nilai, criteria));
    hitungBobotPeringkat = hitungBobotPeringkat.sort((a, b) => {
        return b.total - a.total
    })
	res.status(200).json(hitungBobotPeringkat)
};

exports.getSawWithInterpolated = (req, res) => {
	let post = req.body.data;
	let rule = req.body.rule;
	let bobot = req.body.bobot;
	
	let getNilaiBobot = post;
    let minmax = saw.getMinMax(getNilaiBobot)
    let normalData = saw.normalizeWithInterpolate(getNilaiBobot, minmax, rule)
    
    for (let index = 0; index < normalData.length; index++) {
        let data = normalData[index];
        let keys = Object.keys(data)
        data.total = 0
        for (let index = 0; index < keys.length; index++) {
            const key = keys[index];
            if (typeof data[key] == 'number') {
                data[key] = data[key] * bobot[key]
                data.total = data.total + data[key]
            }
        }
    }
    normalData = normalData.sort((a,b) => {return b.total - a.total})
	return res.status(200).json(h.templateResponse(200, true, 'ok', normalData))
};

exports.getAhpValue = (req, res) => {
	let parameter = req.body.parameter;
	let pairwise = req.body.pairwise;
	
	let result = ahp.ahp(parameter, pairwise)
	return res.status(200).json(h.templateResponse(200, true, 'ok', result))
};