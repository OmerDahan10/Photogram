
export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    saveToStorage
}

function query(entityType,user, delay = 500) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []
    if(entities.length > 0){
        let followings = user.followings.map(following => following._id);
        entities = entities.filter(entity => {
            return followings.includes(entity.by._id);
        //    return user.followings.forEach(following => {
        //        if(following._id === entity.by._id){
        //            console.log(entity)
        //            return true;
        //        }
        //    })
        } )
    }
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            // reject('OOOOPs')
            // console.log(entities)
            resolve(entities)
        }, delay)   
    })
    // return Promise.resolve(entities)
}


function get(entityType, entityId) {
    return query(entityType)
        .then(entities => entities.find(entity => entity._id === entityId))
}

   
function post(entityType, newEntity) {
    newEntity._id = _makeId()
    return query(entityType)
        .then(entities => {
            entities.push(newEntity)
            _save(entityType, entities)
            return newEntity
        })
}



function put(entityType, updatedEntity) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
            entities.splice(idx, 1, updatedEntity)
            _save(entityType, entities)
            return updatedEntity
        })
}

function remove(entityType, entityId) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === entityId)
            entities.splice(idx, 1)
            _save(entityType, entities)
        })
}


function _save(entityType, entities) {
    console.log('entityType FROM SAVE!', entityType)
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}


function saveToStorage(key, val) {
    const json = JSON.stringify(val)
    localStorage.setItem(key, json)
}

function loadFromStorage(key) {
    const json = localStorage.getItem(key)
    const val = JSON.parse(json)
    return val
}






