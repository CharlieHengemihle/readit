export function renderPost(post) {
    const li = document.createElement('li');

    const a = document.createElement('a');
    a.href = `/post/?id=${post.id}`;

    const img = document.createElement('img');
    img.src = post.image;

    const h2 = document.createElement('h2');
    h2.textContent = post.title;

    const p = document.createElement('p');
    p.textContent = post.body;

    a.append(h2, img, p);
    li.append(a);

    return li;
}