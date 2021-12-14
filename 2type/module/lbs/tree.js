import area from "./area.js";
var data = []
area[0].forEach(function (item) {
    let city = []
    if (item.cidx && item.cidx.length === 2) {
        let cityArea = area[1].slice(item.cidx[0], item.cidx[1]+1)
        cityArea.forEach(function (item) {
            let district = []
            if (item.cidx && item.cidx.length === 2) {
                let districtArea = area[2].slice(item.cidx[0], item.cidx[1]+1)
                districtArea.forEach(function (item) {
                    district.push({
                        label: item.fullname,
                        value: item.id,
                    })
                })
            }
            city.push({
                label: item.fullname,
                value: item.id,
                children: district,
            })
        })
    }
    data.push({
        label: item.fullname,
        value: item.id,
        children: city,
    })
})
export default data