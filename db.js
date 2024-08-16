var db;
const funcdb = ()=>{
    let indexDB = indexedDB.open('db_USSS002422_USSS017922_libreria',1);
    indexDB.onupgradeneeded = e=>{
        let req = e.target.result,
            tblautor = req.createObjectStore('autors',{keyPath:'idAutor'});
        tblautor.createIndex('idAutor','idAutor',{unique:true});
        tblautor.createIndex('nombre','nombre',{unique:true});
    };
    indexDB.onsuccess = e=>{
        db = e.target.result;
    };
    indexDB.onerror = e=>{
        console.error('Error al crear la base de datos', e.message());
    };
}, abrirStore = (store, modo)=>{
    let ltx = db.transaction(store, modo);
    return ltx.objectStore(store);
};
funcdb();