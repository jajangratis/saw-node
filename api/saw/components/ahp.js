

exports.ahp = (parameter, pairwise) => {
    let totalAkar
    const RI_MAP = {
        2: 0,
        3: 0.58,
        4: 0.9,
        5: 1.12,
        6: 1.24,
        7: 1.32,
        8: 1.41,
        9: 1.45,
        10: 1.49
    }
    let ri = RI_MAP[parameter.length]
    let data = []
    let sum = []
    let product = []
    let akar = []
    let bobot = []
    let sumxbobot = []
    let sumAkar = 0
    let imax = 0
    let ci = 0
    let cr = 0
    let conclusion = ''
    for (let index = 0; index < parameter.length; index++) {
        let baris = parameter[index];
        let barisData = []
        for (let index = 0; index < parameter.length; index++) {
            let kolom = parameter[index];
            if (kolom == baris) {
                barisData.push(1)
            } else {
                for (let index = 0; index < pairwise.length; index++) {
                    const pairwiseData = pairwise[index];
                    if (pairwiseData[2] == `${baris}/${kolom}`) {
                        barisData.push(pairwiseData[0]/pairwiseData[1])
                    } else {
                        if (pairwiseData[2] == `${kolom}/${baris}`) {
                            barisData.push(pairwiseData[1]/pairwiseData[0])
                        }
                    }
                }
            }
            
        }
        data.push(barisData)
    }
    for (let index = 0; index < data.length; index++) {
        const baris = data[index];
        let productBaris = 1
        for (let index = 0; index < baris.length; index++) {
            const kolom = baris[index];
            productBaris = productBaris * kolom
        }
        product.push(productBaris)
    }
    for (let index = 0; index < product.length; index++) {
        const element = product[index];
        sumAkar = sumAkar + Math.pow(element, 1/parameter.length)
        akar.push(Math.pow(element, 1/parameter.length))
    }
    for (let index = 0; index < akar.length; index++) {
        const nilaiAkar = akar[index];
        bobot.push(nilaiAkar/sumAkar)
    }
    let zipParamBobot = []
    for (let index = 0; index < parameter.length; index++) {
        const nilaiParam = parameter[index];
        const nilaiBobot = bobot[index]
        zipParamBobot.push({parameter: nilaiParam, bobot: nilaiBobot.toFixed(2)})
    }
    for (let index = 0; index < data.length; index++) {
        let sumData = 0
        for (let indexb = 0; indexb < data.length; indexb++) {
            sumData = sumData + data[indexb][index]
            
        }
        sum.push(sumData)
    }
    for (let index = 0; index < data.length; index++) {
        imax = imax + (sum[index] * bobot[index])
        sumxbobot.push(sum[index] * bobot[index])
    }
    ci = (imax-parameter.length)/(parameter.length - 1)
    cr = ci/ri
    if (cr > 0.1) {
        conclusion = 'inconsisten'
    } else {
        conclusion = 'consisten'
    }
    return {
        data,
        product,
        akar,
        sumAkar,
        bobot,
        sum,
        sumxbobot,
        imax,
        ci,
        ri,
        cr,
        conclusion,
        zipParamBobot,
    }
}