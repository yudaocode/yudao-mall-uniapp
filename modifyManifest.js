const fs = require('fs');

const manifestPath = process.env.UNI_INPUT_DIR + '/manifest.json';

let Manifest = fs.readFileSync(manifestPath, { encoding: 'utf-8' });
function replaceManifest(value, remove) {


    let data = JSON.parse(Manifest)
    let newValue = JSON.parse(value)
    if (remove === 'delete') {
        delete data['mp-weixin'].plugins['live-player-plugin'];
    } else {
        if (data['mp-weixin'].plugins['live-player-plugin']) return;
        data['mp-weixin'].plugins = {
            ...data['mp-weixin'].plugins,
            ...newValue
        }

    }
    Manifest = JSON.stringify(data)

    fs.writeFileSync(manifestPath, Manifest, {
        "flag": "w"
    })
}

export default replaceManifest
