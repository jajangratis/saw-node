let ahp = require('./ahp')
// let pairwise = [
//     [1,2,'p1/p2'],
//     [1,3,'p1/p4']
// ]

describe('test', () => {
    it('should test', () => {
        let parameter = [
            'Test Tulis',
            'Sertifikasi',
            'Wawancara',
            'Kompentensi Sosial',
            'Kehadiran',
        ]
        let pairwise = [
            [5,1,'Test Tulis/Sertifikasi'],
            [3,1,'Test Tulis/Wawancara'],
            [3,1,'Test Tulis/Kompentensi Sosial'],
            [3,1,'Test Tulis/Kehadiran'],
            [2,1,'Sertifikasi/Wawancara'],
            [2,1,'Sertifikasi/Kompentensi Sosial'],
            [2,1,'Sertifikasi/Kehadiran'],
            [1,1,'Wawancara/Kompentensi Sosial'],
            [2,1,'Wawancara/Kehadiran'],
            [1,1,'Kompentensi Sosial/Kehadiran'],
        ]
        let test = ahp.ahp(parameter, pairwise)
    });
})
