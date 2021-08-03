// Вкусное мясцо
(() => {

    const results = {}

    // two independent columns, proper juxtaposition is not guaranteed, just hope!

    // Корм МЯУ! Вкусное Мясцо для кошек, 400 г 48241
    // split(/(,\s)/) - split by ", " (comma and space)
    // split(/\s(?=[^\s]+$)/) - split by last space

    const keys = Array.from(document.querySelectorAll(".title_celle")).map(o => o.innerText.split(/(,\s)/).pop().split(/\s(?=[^\s]+$)/)[0])
    const values = Array.from(document.querySelectorAll("td span.price")).map(o => o.innerText)
    
    for (let i = 0; i < keys.length; i++)
        results[keys[i]] = { price : values[i], }

    console.log(results)
})()


// Роял Канин EXIGENT Корм для кошек, привередливых к ВКУСУ продукта
(() => {

    // do not click on all radio buttons, crawl all possible ajax queries instead
    function getAjaxByKey(key){
        // this address could be extracted from the page
        return "https://101dalmatin.com/component/jshopping/product/ajax_attrib_select_and_price/251.html?ajax=1&Itemid=0&change_attr=4&qty=1&attr%5B4%5D=" + key
    }

    const price_ajaxKeys = {}
    const result = {}

    // {"0.4 кг" : {ajaxKey : "42"} }
    document.querySelectorAll("span.input_type_radio").forEach(item => {
        const dimensity = item.innerText
        const ajaxKey = item.querySelector("input").getAttribute("value")

        price_ajaxKeys[ dimensity ] = {
            ajaxKey,
        }
    })

    // {"0.4 кг" : {price : "148 гр"} }
    for (const [key, value] of Object.entries(price_ajaxKeys)) {
        fetch(getAjaxByKey(value["ajaxKey"]))
             .then(response => response.json())
             .then(s => result[key] = {price : s.price});
    }

    console.log(result)

})()
