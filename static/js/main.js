const root = document.getElementById('root');
document.querySelector('#postForm').addEventListener('submit', e => {
    e.preventDefault();
    const title = document.getElementById('title');
    const content = document.getElementById('content');
    const author = document.getElementById('author');
    postPost(title.value, content.value, author.value);
    title.value = '';
    content.value = '';
    author.value = '';

});

function postPost(title, content, author) {
    data = {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            title, content, author
        })
    };
    fetch('/api/posts/create/', data)
        .then(res => {
            getPostList();
        })
        .catch(error => console.log(error));

}

function getPostList() {
    fetch('/api/posts')
        .then(res => res.json())
        .then(post => {
            clearChildren(root);
            renderPosts(post);
        })
        .catch(error => console.log(error));
}

function renderPosts(data) {
    return data.map(post => renderPost(post));
}

function createNode(el) {
    return document.createElement(el);
}

function append(parent, el) {
    return parent.appendChild(el);
}

function clearChildren(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

function renderPost(post) {

    const div = createNode('div');
    div.className = 'post-item';
    const link = createNode('a');
    link.href = `/posts/${post.id}/`;
    const title = createNode('h2');
    append(link, title);
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

    append(div, link);
    append(div, content);
    append(div, publishDate);
    append(div, lastUpdated);
    append(root, div);
}

getPostList();