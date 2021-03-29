const _ = require('lodash')

const h = require('../../helper/helper')

const saw = require('./components/saw')
const ahp = require('./components/ahp')
const topsis = require('./components/topsis')

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

exports.getTopSis = (req, res) => {
	let post = req.body.data;
	let rule = req.body.rule;
	let bobot = req.body.bobot;
	
	let normalData = []
	let keys = []
	for (let index = 0; index < post.length; index++) {
		const data = post[index];
		let key = Object.keys(data)
		keys.push(...key)
	}
	keys = h.uniq(keys)
	for (let index = 0; index < keys.length; index++) {
		const key = keys[index];
		let data = post.map(x => x[key])
		normalData.push({
			parameter: key,
			bobot: bobot[key],
			criteria: rule.filter(x => x.parameter == key).length > 0 ? rule[0].rule : undefined,
			data:topsis.normalize(data)
		})
		
	}
	normalData = normalData.map(x => {
		x.isp = 0
		x.isn = 0
		x.dataxbobot = x.data.map(y => y*x.bobot)
		x.data = x.data.map(y => y*x.bobot)
		if (x.criteria == 'cost') {
			x.isn = x.dataxbobot.sort((a,b) => b-a)[0]
			x.isp = x.dataxbobot.sort((a,b) => a-b)[0]
		} else {
			x.isp = x.dataxbobot.sort((a,b) => b-a)[0]
			x.isn = x.dataxbobot.sort((a,b) => a-b)[0]
		}
		return x
	})
	for (let index = 0; index < post.length; index++) {
		let data = post[index];
		for (let indexb = 0; indexb < normalData.length; indexb++) {
			const normal = normalData[indexb];
			if (!h.checkNullQueryAll(normal.bobot) && !h.checkNullQueryAll(normal.criteria)) {
				data[normal.parameter]=normal.data[index]
			}
		}
	}
	for (let index = 0; index < post.length; index++) {
		let data = post[index];
		data['DMin'] = 0
		data['DPlus'] = 0
		data['V'] = 0
		let keys = Object.keys(data)
		for (let index = 0; index < keys.length; index++) {
			const key = keys[index];
			let normalDataFilter = normalData.filter(x => x.parameter == key)[0]
			if (!h.checkNullQueryAll(normalDataFilter)) {
				// if (!h.checkNullQueryAll(normalDataFilter.criteria)&&!h.checkNullQueryAll(normalDataFilter.bobot)) {
				// 	data[`D${key}Min`] = Math.sqrt(Math.pow(data[key] - normalDataFilter.isn,2))
				// 	data[`D${key}Plus`] = Math.sqrt(Math.pow(data[key] - normalDataFilter.isp,2))
				// 	data[`V${key}`] = data[`D${key}Min`] / (data[`D${key}Min`] + data[`D${key}Plus`])
				// 	data['VTOTAL'] = data['VTOTAL'] + data[`V${key}`]
				// }
				if (!h.checkNullQueryAll(normalDataFilter.criteria)&&!h.checkNullQueryAll(normalDataFilter.bobot)) {
					data['DMin'] = data['DMin'] + Math.pow(data[key] - normalDataFilter.isn,2)
					data['DPlus'] = data['DPlus'] + Math.pow(data[key] - normalDataFilter.isp,2)
				}
			}
		}
		data['DMin'] = Math.sqrt(data['DMin'])
		data['DPlus'] = Math.sqrt(data['DPlus'])
		data['V'] = data['DMin'] / (data['DMin'] + data['DPlus'])
	}
	post = post.sort((a, b) => b['V']-a['V'])
	return res.status(200).json(h.templateResponse(200, true, 'ok', post))
};