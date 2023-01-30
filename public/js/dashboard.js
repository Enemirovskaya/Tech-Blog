const newPostSave = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-name').value.trim();
    const content = document.querySelector('#post-content').value.trim();
    console.log(title)
    console.log(content)

    if(title && content){
        const response = await fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if(response.ok){
            document.location.replace('/dashboard')
        } else {
            alert('something went wrong')
        }
    }

};
    // Deleting post
const delButtonHandler = async (event) => {
    if(event.target.hasAttribute('data-id')){
        console.log(event)
        const id = event.target.getAttribute('data-id');
        console.log(id)

        const response = await fetch(`/api/post/${id}`, {
            method: 'DELETE',
        })

        if(response.ok){
            document.location.replace('/dashboard');
        } else {
            alert ('cannot delete')
        }
    }
}
    // Updating post
const updateFormHandler = async (event) => {
    event.preventDefault();
    console.log('entered form')
    const id = event.target.getAttribute('data-id');

    if(event.target.hasAttribute('data-id')){
        
        const title = document.querySelector(`#post-title${id}`).value.trim();
        const content = document.querySelector(`#post-content${id}`).value.trim();

        console.log(id, title, content)

        if(id && title && content){
            const response = await fetch(`/api/post/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ id, title, content }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if(response.ok) {
                document.location.replace('/dashboard')
            } else {
                alert('Cannot update post!')
            };
        }
    }
}
const showUpdateForm = async (event) => {
    event.preventDefault();

    if(event.target.hasAttribute('data-id')){
        
        const id = event.target.getAttribute('data-id');

        let updateForm = document.querySelector(`#update-form${id}`)
        updateForm.classList.remove('hidden')
    }
};

for (let index = 0; index < document.querySelectorAll('#saveBtn')
.length; index++) {
    const delButton = document.querySelectorAll('#saveBtn')[index];
    delButton.addEventListener('click', updateFormHandler);
};

$('.post-update')
    .on('click', showUpdateForm);

$('.post-btn')
    .on('click', newPostSave);

$('.post-delete')
    .on('click', delButtonHandler);