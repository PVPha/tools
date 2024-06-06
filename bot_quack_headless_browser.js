const axios = require('axios')
const querystring = require('querystring')
const { promise } = require('selenium-webdriver')
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgzNDY4LCJ0aW1lc3RhbXAiOjE3MTc1NjU0NTgwMjQsInR5cGUiOjEsImlhdCI6MTcxNzU2NTQ1OCwiZXhwIjoxNzE4MTcwMjU4fQ.rMouOVismmDNzkcsqfeK1CIBJmpKs0FX14iLFC5759A'
const axiosClient = axios.create({
    baseURL: 'https://api.quackquack.games',
    headers: {
        "Authorization": token,
        "User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 Edg/125.0.0.0',
        "referer": "https://dd42189ft3pck.cloudfront.net/"
    }
})

const max_duck = 17
const list_save_duck = [10136968,10338666]
let golden_price = ''
const egg_type = {
    3:"common",
    4:"uncommon",
    5:"rare",
    6:"ultra_rare"
}
const duck_type = {
    "uncommon": 4,
    "rare": 5,
    "legendary": 6
}
const egg_shell = {
    common: [1,2],
    uncommon: [3,4],
}
const common_egg = 3
const uncommon_egg = 4
const body_rare = {
    common: 1,
    rare: 2,
    legendary: 3
}
const price_type = {
    3: "trứng"
}
let list_duck_laid = []
let user_info = {} 
let list = {} 
let check_gold_duck = false

function getUserInfo() {
    const url = '/balance/get'
    return axiosClient.get(url).then(res => {
        // console.log(res.data.data);
        console.log('\x1b[36m%\x1b[5m%s\x1b[0m', `Số trứng đang có: ${res.data?.data?.data?.[2]?.balance}`);
    }).catch((error) => {
        console.log(`Lỗi lấy thông tin user ${JSON.stringify(![404, 502, 503, 504]?.includes(error?.response?.status) ? error?.response?.data : '')}`);
        console.log(`Lỗi lấy thông tin user ${JSON.stringify(![404, 502, 503, 504]?.includes(error?.response?.status) ? error?.response?.data : '')}`);
    }).finally(() => {
        main()
    });
};

function getHarvestInfo() {
    const url = '/nest/harvester-info'
    return axiosClient.get(url).then(res => {
        console.log(res.data.data);
    }).catch((error) => {
        console.log(error);
    });
};
function rareCount(metadata, rare, quantity_rare) {
    let count = 0
    if (metadata?.arm_rare === rare) {
        count++
    }
    if (metadata?.body_rare === rare) {
        count++
    }
    if (metadata?.head_rare === rare) {
        count++
    }
    if (count === quantity_rare) {
        return true
    }
    return false
}
function removeDuck() {
    const list_duck = list?.duck
    console.log('\x1b[31m%s\x1b[0m', `Số lượng vịt đang có: ${list_duck?.length} =======> số lượng vịt đã ${list_duck?.length === max_duck ? 'đã' : 'chưa'} đạt giới hạn`);
    const list_duck_common = list_duck?.filter(duck => duck?.total_rare === 3 && !list_save_duck?.includes(duck?.id))
    let list_duck_1_rare = []
    let list_duck_2_rare = []
    let list_duck_3_rare = []
    let list_duck_1_legendary = []
    let list_duck_2_legendary = []
    let list_duck_3_legendary = []
    const one_part  = 1
    const two_part = 2
    const three_part = 3
    if(!list_duck_common?.length){
        list_duck_1_rare = list_duck?.filter(duck => duck?.total_rare === 4 && rareCount(duck?.metadata, body_rare['rare'], one_part) && !list_save_duck?.includes(duck?.id))
        list_duck_2_rare = list_duck?.filter(duck => duck?.total_rare === 5 && rareCount(duck?.metadata, body_rare['rare'], two_part) && !list_save_duck?.includes(duck?.id))
        list_duck_3_rare = list_duck?.filter(duck => duck?.total_rare === 5 && rareCount(duck?.metadata, body_rare['rare'], three_part) && !list_save_duck?.includes(duck?.id))
        list_duck_1_legendary = list_duck?.filter(duck => duck?.total_rare === 5 && rareCount(duck?.metadata, body_rare['legendary'], one_part) && !list_save_duck?.includes(duck?.id))
        list_duck_2_legendary = list_duck?.filter(duck => duck?.total_rare === 5 && rareCount(duck?.metadata, body_rare['legendary'], two_part) && !list_save_duck?.includes(duck?.id))
    }
    let ducks = { "ducks": [list_duck_common?.[0]?.id || list_duck_1_rare?.[0]?.id || list_duck_2_rare?.[0]?.id || list_duck_3_rare?.[0]?.id || list_duck_1_legendary?.[0]?.id || list_duck_2_legendary?.[0]?.id]  }
    console.log('\x1b[31m%s\x1b[0m', `Số vịt loại common: ${list_duck_common?.length || 0}`);
    if (!list_duck_common?.length && !list_duck_1_rare?.length && !list_duck_2_rare?.length && !list_duck_3_rare?.length && !list_duck_1_legendary?.length && !list_duck_2_legendary?.length) {
        if (!list_duck_common?.length) {
            console.log('\x1b[31m%s\x1b[0m', `Không có vịt loại common để xoá`);
        }
        if (!list_duck_1_rare?.length) {
            console.log('\x1b[31m%s\x1b[0m', `Không có vịt có 1 bộ phận rare để xoá`);
        }
        if (!list_duck_2_rare?.length) {
            console.log('\x1b[31m%s\x1b[0m', `Không có vịt có 2 bộ phận rare để xoá`);
        }
        if (!list_duck_3_rare?.length) {
            console.log('\x1b[31m%s\x1b[0m', `Không có vịt có 3 bộ phận rare để xoá`);
        }
        if (!list_duck_1_legendary?.length) {
            console.log('\x1b[31m%s\x1b[0m', `Không có vịt có 1 bộ phận legendary để xoá`);
        }
        if (!list_duck_2_legendary?.length) {
            console.log('\x1b[31m%s\x1b[0m', `Không có vịt có 2 bộ phận legendary để xoá`);
        }
        console.log('\x1b[31m%s\x1b[0m', `List duck ${JSON.stringify(list_duck)}`);
        return Promise.reject();
    }
    const url = '/duck/remove'
    console.log('\x1b[31m%s\x1b[0m', `Xoá bỏ vịt: `, ducks);
    return new Promise((resolve, reject) => {
        axiosClient.post(url, querystring.stringify({ ducks: JSON.stringify(ducks) }), {
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            }
        }).then(res => {
            console.log('\x1b[31m%s\x1b[0m', `Xoá vịt thành công: `, ducks);
            return resolve(res.data.data)
            // console.log(res.data.data);
        }).catch((error) => {
            console.log('\x1b[31m%s\x1b[0m', `Xoá vịt thất bại ${ducks}: ${JSON.stringify(![404, 502, 503, 504]?.includes(error?.response?.status) ? error?.response?.data : '')}`);
            console.log('\x1b[31m%s\x1b[0m', `Xoá vịt thất bại ${ducks}: ${JSON.stringify(![404, 502, 503, 504]?.includes(error?.response?.status) ? error?.response?.data : '')}`);
            setTimeout(() => {
                removeDuck(ducks)
            }, 1000);
        });
    })
};

function getMaxDuck() {
    const url = '/nest/max-duck'
    return new Promise((resolve, reject) => {
        axiosClient.get(url).then(res => {
            const cur_max_duck = res.data.data?.max_duck
            resolve(cur_max_duck)
        }).catch((error) => {
            console.log(error);
            reject('Lỗi lấy max duck')
        });
    }) 
};

function getAllInfo() {
    const url = '/nest/list'
    return axiosClient.get(url).then(res => {
        if (res.status === 200) {
            // console.log(res.data?.data?.nest);
            return res.data?.data
        }
    }).catch((error) => {
        console.log(`Lỗi lấy thông tin người dùng ${JSON.stringify(![404, 502, 503, 504]?.includes(error?.response?.status) ? error?.response?.data : '')}`);
        console.log(`Lỗi lấy thông tin người dùng ${JSON.stringify(![404, 502, 503, 504]?.includes(error?.response?.status) ? error?.response?.data : '')}`);
    });
};

function reloadList() {
    const url = '/nest/list-reload'
    return axiosClient.get(url).then(res => {
        if (res.status === 200) {
            console.log('Reload list thành công')
            list = res.data?.data
            return res.data?.data
        }
    }).catch((error) => {
        console.log(`Reload list thất bại: ${JSON.stringify(![404, 502, 503, 504]?.includes(error?.response?.status) ? error?.response?.data : '') }`);
        console.log(`Reload list thất bại: ${JSON.stringify(![404, 502, 503, 504]?.includes(error?.response?.status) ? error?.response?.data : '') }`);
    });
};

function getPriceGoldenDuck(delay) {
    setTimeout(() => {
        const url = '/duck/price-golden-duck'
        return axiosClient.get(url).then(res => {
            const price_golden_duck = res.data.data
            console.log('\x1b[33m%s\x1b[0m',`Loại phần thưởng vịt vàng: ${price_golden_duck} - ${price_type[price_golden_duck] || 'chưa xác định'}`);
            golden_price = price_golden_duck
        }).catch((error) => {
            console.log('\x1b[33m%s\x1b[0m', `Lấy loại phần thưởng vịt vàng thất bại: ${JSON.stringify(![404, 502, 503, 504]?.includes(error?.response?.status) ? error?.response?.data : '')}`);
            console.log('\x1b[33m%s\x1b[0m', `Lấy loại phần thưởng vịt vàng thất bại: ${JSON.stringify(![404, 502, 503, 504]?.includes(error?.response?.status) ? error?.response?.data : '')}`);
        }); 
    }, delay);
};

function claimGoldenDuck() {
    const url = '/golden-duck/claim'
    const type = {
        default: 1,
        x2: 2
    }
    return axiosClient.post(url, querystring.stringify({ type: type['default'] }), {
        headers: {
            "content-type": "application/x-www-form-urlencoded"
        }
    }).then(res => {
        const claim_golden_duck = res.data.data
        console.log('\x1b[33m%s\x1b[0m', `Nhận thưởng vịt vàng thành công: ${claim_golden_duck?.amount} ${price_type[claim_golden_duck?.amount]} ${JSON.stringify(claim_golden_duck)}`);
        check_gold_duck = false
    }).catch((error) => {
        check_gold_duck = false
        console.log('\x1b[33m%s\x1b[0m', `Nhận thưởng vịt vàng thất bại type{${type}}: ${JSON.stringify(![404, 502, 503, 504]?.includes(error?.response?.status) ? error?.response?.data : '')}`);
        console.log('\x1b[33m%s\x1b[0m', `Nhận thưởng vịt vàng thất bại type{${type}}: ${JSON.stringify(![404, 502, 503, 504]?.includes(error?.response?.status) ? error?.response?.data : '')}`);
    });
};

function getRewardGoldenDuck(delay) {
    setTimeout(() => {
        const url = '/golden-duck/reward'
        return axiosClient.get(url).then(res => {
            const reward_golden_duck = res.data.data
            console.log('\x1b[33m%s\x1b[0m', `Đập vịt vàng thành công ${JSON.stringify(reward_golden_duck)}`);
            claimGoldenDuck()
        }).catch((error) => {
            check_gold_duck = false
            console.log('\x1b[33m%s\x1b[0m', `Đập vịt vàng thất bại: ${JSON.stringify(![404, 502, 503, 504]?.includes(error?.response?.status) ? error?.response?.data : '')}`);
            console.log('\x1b[33m%s\x1b[0m', `Đập vịt vàng thất bại: ${JSON.stringify(![404, 502, 503, 504]?.includes(error?.response?.status) ? error?.response?.data : '')}`);
        });
    }, delay);
};

function getGoldenDuckInfo() {
    const url = '/golden-duck/info'
    return axiosClient.get(url).then(res => {
        const golden_duck = res.data.data 
        const time_to_golden_duck = golden_duck.time_to_golden_duck * 1000
        check_gold_duck = true
        console.log('\x1b[33m%s\x1b[0m', `Vịt vàng: ${JSON.stringify(golden_duck)}`);
        getRewardGoldenDuck(time_to_golden_duck)
    }).catch((error) => {
        console.log('\x1b[33m%s\x1b[0m', `Lỗi lấy thông tin vịt vàng: ${JSON.stringify(![404, 502, 503, 504]?.includes(error?.response?.status) ? error?.response?.data : '')}`);
        console.log('\x1b[33m%s\x1b[0m', `Lỗi lấy thông tin vịt vàng: ${JSON.stringify(![404, 502, 503, 504]?.includes(error?.response?.status) ? error?.response?.data : '')}`);
        getGoldenDuckInfo()
    });
};

function harvest(nest_id, delay_harvest) {
    setTimeout(() => {
        const url = '/nest/collect'
        return axiosClient.post(url, querystring.stringify({ nest_id }), {
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            }
        }).then(res => {
            console.log('Thu hoạch trứng thành công ổ:', nest_id, res.data);
            return res.data
            // console.log(res.data.data);
        }).catch((error) => {
            console.log(`Lỗi thu hoạch trứng ổ ${nest_id}: ${JSON.stringify(![404, 502, 503, 504]?.includes(error?.response?.status) ? error?.response?.data : '') }`);
            console.log(`Lỗi thu hoạch trứng ổ ${nest_id}: ${JSON.stringify(![404, 502, 503, 504]?.includes(error?.response?.status) ? error?.response?.data : '') }`);
        });
    }, delay_harvest);
};

async function layEgg(nest_id, duck_id, delay) {
    const url = '/nest/lay-egg'
    console.log(`Vịt đẻ trứng: ${duck_id}`);
    setTimeout(() => {
        return axiosClient.post(url, querystring.stringify({ nest_id, duck_id }), {
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            }
        }).then(res => {
            const egg_info = res.data?.data
            console.log(`Đẻ trứng thành công: ${JSON.stringify(egg_info)} \tLoại trứng ${egg_type[egg_info?.total_rare] || 'chưa xác định'}: \ttotal rare: ${egg_info?.total_rare} \trate: ${egg_info?.rate}`);
            // console.log(res.data.data);
            if (![common_egg].includes(egg_info?.total_rare)) {
                const list_duck = list?.duck
                console.log('\x1b[34m%s\x1b[0m', `Ấp trứng loại ${egg_type[egg_info?.total_rare] || 'chưa xác định'}: `, nest_id);
                if (list_duck?.length === max_duck) {
                    removeDuck().finally(() => {
                        hatchEgg(nest_id, delay)
                    })
                }else {
                    hatchEgg(nest_id, delay)
                }
            }
        }).catch((error) => {
            console.log(`Lỗi đẻ trứng ổ: ${nest_id} => ${JSON.stringify(![404, 502, 503, 504]?.includes(error?.response?.status) ? error?.response?.data : error?.response?.status)}`);
        });
    }, delay);
};

function hatchEgg(nest_id, delay) {
    setTimeout(() => {
        const url = '/nest/hatch'
        return axiosClient.post(url, querystring.stringify({ nest_id  }), {
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            }
        }).then(res => {
            const hatch_info = res.data.data
            console.log('\x1b[34m%s\x1b[0m', `Ấp trứng thành công ${nest_id} ${JSON.stringify(hatch_info)}`);
            collectDuck(nest_id, hatch_info?.time_remain * 1000)
        }).catch(async(error) => {
            console.log('\x1b[34m%s\x1b[0m', `Ấp trứng thất bại ${nest_id} ${JSON.stringify(![404, 502, 503, 504]?.includes(error?.response?.status) ? error?.response?.data : '')}`);
            if (error?.response?.data?.error_code === 'REACH_MAX_NUMBER_OF_DUCK') {
                console.log('\x1b[34m%s\x1b[0m', `Số vịt đạt tối đa`);
            console.log('\x1b[32m%s\x1b[0m', `Ấp trứng thất bại ${nest_id} ${JSON.stringify(![404, 502, 503, 504]?.includes(error?.response?.status) ? error?.response?.data : '')}`);
            if (error?.response?.data?.error_code === 'REACH_MAX_NUMBER_OF_DUCK') {
                console.log('\x1b[32m%s\x1b[0m', `Số vịt đạt tối đa`);
                await reloadList()
                removeDuck().finally(() => {
                    console.log('\x1b[34m%s\x1b[0m', `Ấp lại trứng ổ: ${nest_id}`);
                    hatchEgg(nest_id, delay)
                })
            }}
        });
    }, delay);
};

function collectDuck(nest_id, delay) {
    setTimeout(() => {
        const url = '/nest/collect-duck'
        return axiosClient.post(url, querystring.stringify({ nest_id }), {
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            }
        }).then(res => {
            console.log('\x1b[34m%s\x1b[0m', `Lấy vịt thành công ${nest_id}: ${JSON.stringify(res.data.data)}`);
        }).catch((error) => {
            console.log('\x1b[34m%s\x1b[0m', `Lấy vịt thất bại ${nest_id}: ${JSON.stringify(![404, 502, 503, 504]?.includes(error?.response?.status) ? error?.response?.data : '')}`);
            console.log('\x1b[32m%s\x1b[0m', `Lấy vịt thất bại ${nest_id}: ${JSON.stringify(![404, 502, 503, 504]?.includes(error?.response?.status) ? error?.response?.data : '')}`);
        });
    }, delay);
};
function countDuckType() {
    const list_duck = list?.duck
    const uncommon = 0
    const rare = 0
    const legendary = 0
    list_duck?.forEach(duck => {
        
    });
}
async function main() {
    await reloadList()
    const list_nest = list?.nest
    const list_duck = list?.duck
    const empty_nest = 1
    const harvest_nest = 2
    const hatch_nest = 3
    let delay = 0
    if(!check_gold_duck){
        await getPriceGoldenDuck()
        await getGoldenDuckInfo()
        check_gold_duck = true
    }
    const list_harvest = list_nest?.reduce((prev, next) => {
        if (next?.status === harvest_nest) {
            return [...prev, next?.id]
        } else {
            return [...prev]
        }
    }, [])
    const list_empty_nest = list_nest?.reduce((prev, next) => {
        if (next?.status == empty_nest) {
            return [...prev, next?.id]
        } else {
            return [...prev]
        }
    }, [])
    const list_hatch_nest = list_nest?.reduce((prev, next) => {
        if (next?.status === hatch_nest) {
            return [...prev, next?.id]
        } else {
            return [...prev]
        }
    }, [])
    // console.log(`Thông tin các ổ trứng: ${JSON.stringify(list_nest)}`);
    console.log(`Số ổ cần thu hoạch ${list_harvest?.length} \tSố ổ trống ${list_empty_nest?.length} \tSố ổ trứng nở ${list_hatch_nest?.length}`);
    await list_nest?.forEach((nest, index) => {
        if (nest?.status === hatch_nest) {
            console.log('Lấy vịt ổ:', nest?.id);
            delay = delay + index * 1000
            collectDuck(nest?.id, delay)
        }
    });
    delay = 0;

    await list_nest?.forEach((nest, index) => {
        if (nest?.status === harvest_nest) {
            if (egg_shell['common'].includes(nest?.type_egg)) {
                console.log('Thu hoạch trứng ổ:', nest?.id);
                delay = delay + index * 1000
                harvest(nest?.id, delay)
            }else {
                console.log('\x1b[34m%s\x1b[0m', 'Ấp trứng ổ:', nest?.id);
                delay = delay + index * 1000
                if (list_duck?.length === max_duck) {
                    removeDuck().finally(() => {
                        hatchEgg(nest?.id, delay)
                    })
                } else {
                    hatchEgg(nest?.id, delay)
                }
            }
        }
    });
    delay = 0;
    
    await list_nest?.forEach((nest, index) => {
        if (nest?.status === empty_nest) {
            if (list_duck_laid.length >= list_duck?.length) {
                list_duck_laid = []
            }else {
                console.log('Danh sách vịt đã đẻ: ', list_duck_laid?.join('|'));
            }
            console.log('Đẻ trứng ổ:', nest?.id);
            const duck_id = list_duck?.find(duck => !list_duck_laid.includes(duck?.id))?.id
            list_duck_laid.push(duck_id)
            delay = delay + index * 1000
            layEgg(nest?.id, +duck_id, delay)
        }
    });
    delay = 0
    setTimeout(() => {
        getUserInfo()
    }, 2000);
}
// harvest()
// getAllInfo()
// reloadList()
// getGoldenDuckInfo()
// getUserInfo()
main()
// getMaxDuck()
// console.log('\x1b[33m%s\x1b[0m', 'I am cyan')
