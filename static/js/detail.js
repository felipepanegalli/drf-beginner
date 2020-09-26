const root = document.getElementById('root');
const title = document.getElementById('title');
const content = document.getElementById('content');
const author = document.getElementById('author');

const pathName = window.location.pathname;
const pathNameParts = pathName.split('/');
const postID = pathNameParts[pathNameParts.length - 2];

function getPost(postID) {
    fetch(`/api/posts/${postID}`)
        .then(res => {
            if (res.status === 404) {
                return window.location = '/';
            }
            return res.json();
        })
        .then(post => {
            populatePost(post);
            clearChildren(root);
            renderPost(post);
        })
        .catch(error => console.log(error));
}

function populatePost(data) {
    title.value = data.title;
    content.value = data.content;
    author.value = data.author;
}

document.querySelector('#postForm').addEventListener('submit', e => {
    e.preventDefault();
    updatePost(title.value, content.value, author.value);
    title.value = '';
    content.value = '';
    author.value = '';

});

function updatePost(title, content, author) {
    const data = {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            title, content, author
        })
    };
    fetch(`/api/posts/${postID}/update/`, data)
        .then(res => {
            getPost(postID);
        })
        .catch(error => console.log(error));
}

function clearChildren(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

function createNode(el) {
    return document.createElement(el);
}

function append(parent, el) {
    return parent.appendChild(el);
}

function renderPost(post) {
    const div = createNode('div');
    div.className = 'post-item';
    const title = createNode('h2');
    const content = createNode('p');
    const publishDate = createNode('span');
    const lastUpdated = createNode('span');
    const author = createNode('small');

    author.innerText = ` written by ${post.author}`;
    title.innerText = post.title;
    append(title, author);

    content.innerText = post.content;
    publishDate.innerText = `Published: ${new Date(post.publish_date).toUTCString()}`;
    lastUpdated.innerText = `\nLast updated: ${new Date(post.updated).toUTCString()}`;

    append(div, title);
    append(div, content);
    append(div, publishDate);
    append(div, lastUpdated);
    append(root, div);
    appendDeleteBtn(post);
}

getPost(postID);


//// DELETE METHOD
function deletePost() {
    const data = {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        }
    };
    fetch(`/api/posts/${postID}/delete/`, data)
        .then(res => {
            window.location = '/';
        })
        .catch(error => console.log(error));
}

function appendDeleteBtn(post) {
    const postDiv = document.querySelector('.post-item');
    const deleteBtn = createNode('button');
    const hr = createNode('hr');
    append(postDiv, hr);
    deleteBtn.className = 'post-delete-button';
    deleteBtn.innerText = 'Delete';
    deleteBtn.addEventListener('click', e => {
        deletePost(post.id);
    });
    append(postDiv, deleteBtn);
}