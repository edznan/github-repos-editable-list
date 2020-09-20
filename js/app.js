//set default page title
document.title = "edznan's Github Repos";

//fetch data from API  
getRepositories = async (url, token) => {
    let auth = 'token ' + token
    //pass GitHub API Personal Access Token inside the headers
    let raw = await fetch(url, {
        headers: {
            authorization: auth
        }
    });
    if (raw.ok) {
        let json = await raw.json();
        return json;
    } else {
        //display status error inside a bootstrap alert
        document.querySelector('#notfound').innerHTML = `
           HTTP error: <strong>${raw.status}</strong>.
        `;
        document.querySelector('#notfound').classList.remove('hidden');
        //remove content from the table
        document.querySelector('#repositories-list').innerHTML = '';
        //dismiss the loader
        isLoading(false);
    }
}

//this function will insert the data from API to the table
insertData = async user => {
    //trigger the loader
    isLoading(true);
    //if search field is empty, my repositories will be displayed by default
    if (user == '') {
        user = 'edznan';
    }
    //append heading text
    document.querySelector('#username').innerHTML = user + "'s GitHub Repositories";
    //set page title
    document.title = user + "'s GitHub Repos";
    //embed the username from search form to the URL 
    let url = `https://api.github.com/users/${user}/repos`;
    //GitHub API Personal Access Token:
    let token = 'enteryourpersonaltokenhere';
    //make an API call
    let repositories = await getRepositories(url, token);
    //content to be inserted in the HTML
    let html = '';
    let i = 0;
    repositories.map(repo => {
        let htmlSegment = `<tr>
                                <td>${++i}</td>
                                <td class="id">${repo.id}</td>
                                <td class="name">${repo.name}</td>
                                <td class="language">${repo.language}</td>
                                <td class="created-at">${repo.created_at}</td>
                                <td class="url"><a href="${repo.html_url}" target="_blank">${repo.html_url}</a></td>
                                <td class="edit-icon"><i class="fas fa-edit"></i></td>
                            </tr>`;
        html += htmlSegment;
    });
    //dismiss the loader
    isLoading(false);
    //finally insert the table content 
    let container = document.querySelector('#repositories-list');
    container.innerHTML = html;
    //remove the status alert
    document.querySelector('#notfound').classList.add('hidden');
    //convert the date to string format
    let dates = document.querySelectorAll('td.created-at');
    dates.forEach(date => {
        date.innerHTML = new Date(date.innerHTML).toLocaleDateString();
    });
    //add editing functionality to icons 
    let editIcons = document.querySelectorAll('td.edit-icon');
    editIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            //populate form input fields
            document.querySelector('#id').value = icon.parentElement.querySelector('td.id').innerHTML;
            document.querySelector('#name').value = icon.parentElement.querySelector('td.name').innerHTML;
            document.querySelector('#language').value = icon.parentElement.querySelector('td.language').innerHTML;
            document.querySelector('#created-at').value = icon.parentElement.querySelector('td.created-at').innerHTML;
            document.querySelector('#url').value = icon.parentElement.querySelector('td.url').children[0].innerHTML;
            //display a modal popup
            $(modal).modal('show');
        });
        icon.classList.add('pointer');
    });
}
search = () => {
    setTimeout(() => {
        let user = document.querySelector('#user').value;
        //call a function that will insert data to table
        insertData(user);
    }, 4000);
}
//trigger the search function
document.querySelector('#user').addEventListener('keyup', search);
// set loader & table visibility
isLoading = loading => {
    if (loading) {
        document.querySelector('#repositories-list').classList.add('hidden');
        document.querySelector('#loader').classList.remove('hidden');
    } else {
        document.querySelector('#repositories-list').classList.remove('hidden');
        document.querySelector('#loader').classList.add('hidden');
    }
}
//call a function that will insert data to table
insertData('');
