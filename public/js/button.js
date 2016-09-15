document.getElementsByClassName('search-button')[0].addEventListener('click', () => {
  const http = new XMLHttpRequest();
  const data = document.getElementsByClassName('input-box')[0].value;
  const url = `http://localhost:3000/users?uuid=${data}`;

  http.open('get', url, true);

  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  http.onreadystatechange = () => {
    if (http.readyState === 4 && http.status === 200) {
      const myRes = JSON.parse(http.responseText);
      const details = document.getElementsByClassName('user-details')[0];
      const infoText = document.createElement('p');
      infoText.innerHTML = `email: ${myRes.email} <br> uuid: ${myRes.uuid}`;
      infoText.className = 'user-info';

      for (const listObj of myRes.lists) {
        const deets = document.getElementsByClassName('user-lists')[0];
        const listItem = document.createElement('div');
        const listId = document.createElement('span');
        listId.innerHTML = `mailing list: ${listObj.list}`;
        listItem.className = 'user-lists';
        listItem.appendChild(listId);

        const unsubscribe = document.createElement('button');
        unsubscribe.className = 'unsubscribe';
        unsubscribe.innerHTML = 'unsubscribe';
        listItem.appendChild(unsubscribe);
        deets.appendChild(listItem);
      }

      details.appendChild(infoText);
    }
  };

  http.send(data);
});
