export  function updataStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
}