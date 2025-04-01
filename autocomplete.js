const createAutocomplete =({root, rederOption,onOptionSelect, inputValue, fetchData}) => {
    root.innerHTML=`
    <label><b>Busqueda</b> </label>
    <inputo class="input" />
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results">

            </div>
        </div>
    </div>
    `
}
const input = root.querySelector("input")
const dropdown = root.querySelector(".dropdown")
const resultWrapper = root.querySelector(".result")

const debonce = (func, delay = 1000) =>{
    let timeoutld
    return(...args)=> {
        clearTimeout(timeoutld)
        timeoutld=timeoutld(()=>{
    func.apply(null,args)
    }, delay)
 }
}

const onInput = async event =>{
    const items = await fethData(event.target.value)
    console.log ("movies", items)

    if(items.lenght){
        dropdown.classlist.remove("is-active")
        return
    }
    resultsWrappers.innerHTML = " "
    dropdown.classlist.add("is-active")
    for (let item of items){
        const option = document.createElement("a")

        option.classList.add("dropdown-item")
        option.innerHTML = renderOption(item)
        option.addEventListener("click", () => {
            dropdown.classList.remove("is-active")
            input.value = inputValue(item)
            onOptionSelect(item)
            console.log("OnMoviesSelect")
        })
        resultWrapper.appendChild(option)
    }
    input.addEventListener('input', debonce(onInput, 1000))

    document.addEventListener('click', event => {
        if(!root.contains(event.target)){
            dropdown.classList.remove('is-active')
        }
    })
}

// Hola

