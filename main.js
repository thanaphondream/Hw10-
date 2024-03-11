const userList = document.querySelector('.user-list')
const postInfo = document.querySelector('.post-info')

function makeElement(tag, attr_n, attr_v, content) {
    let output = document.createElement(tag);
    (!!attr_n) && output.setAttribute(attr_n, attr_v)
    output.textContent = content
    return output
}

fetch('https://jsonplaceholder.typicode.com/users')
    .then(resp => resp.json())
    .then(data => {
        for(let el of data) {
            const li = makeElement('li', 'user-id', el.id, `Name : ${el.name} / Email : ${el.email}`)
            userList.append(li)
        }
    })
    .then(() => {
        document.querySelector('.user-list').addEventListener('click', function(event) {
            const userId = event.target.getAttribute('user-id')
            if (userId) {
                fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
                    .then(resp => resp.json())
                    .then(posts => {
                        postInfo.innerHTML = '' 
                        posts.forEach(post => {
                            const postItem = document.createElement('div')
                            postItem.classList.add('post-item')
                            postItem.innerHTML = `
                                <h2>${post.title}</h2>
                                <p>${post.body}</p>
                            `
                            postInfo.append(postItem)
                        })
                    })
            }
        })
    })
