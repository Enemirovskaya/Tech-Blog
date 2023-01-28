// async function commentFormHandler(event) {
//     event.preventDefault();

//     const comment_text = document.querySelector('input[name="comment-body"]').value;

//     const post_id = document.querySelector('textarea[name="comment-body"]').value;

//     if (comment_text) {
//         const response = await fetch('/api/comments', {
//             method: 'POST',
//             body: JSON.stringify({
//                 post_id,
//                 comment_text
//             }),
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });

//         if (response.ok) {
//             document.location.reload();

//         } else {
//             alert(response.statusText);
//             document.querySelector('#comment-form').style.display = "block";
//         }
//     }
// }

// document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);

const newCommentSave = async (event) => {
    event.preventDefault();

    const blog_id = event.target.getAttribute('data-id');

    if(event.target.hasAttribute('data-id')){

        const comment = document.querySelector(`#blog-comment${blog_id}`).value.trim();

        console.log(comment)

        if(comment){
            const response = await fetch('/api/comment', {
                method: 'POST',
                body: JSON.stringify({ blog_id, comment }),
                headers: { 'Content-Type': 'application/json' },
            });

            if(response.ok){
                document.location.replace('/dashboard')
            } else {
                alert('something is wrong')
            }
        }
    }
};
document
    .querySelector('#commentBtn')
    .addEventListener('click', newCommentSave);