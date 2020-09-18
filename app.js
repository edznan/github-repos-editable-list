//fetch data from API  
async function getRepositories(url) {
    let raw = await fetch(url);
    if (raw.ok) { 
        let json = await raw.json();
        return json;
    } else {
        alert("HTTP-Error: " + raw.status);
    }
}

//insert API data to table
async function insertData() {
    let username = 'edznan';
    let url = `https://api.github.com/users/${username}/repos`;

    let repositories = await getRepositories(url);

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

    let container = document.querySelector('#repositories-list');
    container.innerHTML = html;

    let dates = document.querySelectorAll('td.created-at');
    dates.forEach(date => {
        date.innerHTML = new Date(date.innerHTML).toLocaleDateString();
    });

    let editIcons = document.querySelectorAll('td.edit-icon');
    editIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            //populate form input fields
            document.getElementById('id').value = icon.parentElement.querySelector('td.id').innerHTML;
            document.getElementById('name').value = icon.parentElement.querySelector('td.name').innerHTML;
            document.getElementById('language').value = icon.parentElement.querySelector('td.language').innerHTML;
            document.getElementById('created-at').value = icon.parentElement.querySelector('td.created-at').innerHTML;
            document.getElementById('url').value = icon.parentElement.querySelector('td.url').children[0].innerHTML;
            //display a modal popup
            $(modal).modal('show');
        });
        icon.classList.add('pointer');
    });
}

//call function that will insert data to table
insertData();