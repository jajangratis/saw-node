const _ = require('lodash')
const saw = require('./components/saw')

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