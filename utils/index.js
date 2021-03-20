//getLastNumber function
export function getLastNumber(url) {
    let endSlash = url.lastIndexOf("/")
    let smallUrl = url.slice(0, endSlash )
    let startSlash = smallUrl.lastIndexOf("/")

    return +url.slice(startSlash + 1, endSlash) //unary + operator
}

//removeChildren function
export function removeChildren(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild)
    }
}

