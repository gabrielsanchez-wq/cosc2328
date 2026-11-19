// HW9 – COSC 2328 – Professor McCurry
// Implemented by: Gabriel Enrique Sanchez Zambrana

/* 1) require('dotenv').config() goes through the key value pairs in the .env file. 
process.env is a global node variable, so any file that uses Node can access it.
2) The <button> outside the form does not trigger a page reload,
because HTML elements are being directly manipulated, rather than having a
form be submitted and updating information in elements.
3) The case list gets deleted, because the js files are loaded with the 
data that they had initially. The same docker container would need to be
utilized to ensure that there is no data loss.
4) The 400 status error is received in the fetch of the 
button's event listener. Response.ok returns true for values from 200-299,
which means that it returns false for a 400 status error.
*/

const dl = document.getElementById('credentials');
const caseList = document.getElementById('case-list');

async function loadCredentials() {
    const res = await fetch('/hw9/credentials');

    const data = await res.json();
    dl.innerHTML = '';

    Object.entries(data).forEach(([key, value]) => {
        const dt = document.createElement('dt');
        const dd = document.createElement('dd');
        dt.textContent = key;
        dd.textContent = value;
        dl.appendChild(dt);
        dl.appendChild(dd);
    });
}

async function loadCases() {
    const res = await fetch('/hw9/cases');
    const array = await res.json();
    caseList.innerHTML = '';

    if (array.length === 0) {
        const li = document.createElement('li');
        li.innerHTML = `<li class="empty-msg">No cases filed yet.</li>`;
        caseList.appendChild(li);
    } else {
        array.forEach(m => {
            const li = document.createElement('li');
            li.innerHTML = `<p className ='case-id'>${m.id}</p>
            <p className ='case-suspect'>${m.suspect}</p>
            <p className ='case-location'>${m.location}</p>
            <p className ='case-notes'>${m.notes}</p>
            <p className ='case-ts'>${m.timestamp}</p>`
            caseList.appendChild(li);
        });
    }
}

const logBtn = document.querySelector('#log-btn');
logBtn.addEventListener('click', async (e) => {
    const suspect = document.querySelector('#suspect').value.trim();
    const location = document.querySelector('#location').value.trim();
    const notes = document.querySelector('#notes').value.trim();

    try {
        const res = await fetch('/hw9/cases', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ suspect, location, notes })
        });

        console.log(res);
        if (!res.ok) {
            throw new Error('Response Status: '+res.status);
        }

        suspect.innerHTML = '';
        location.innerHTML = '';
        notes.innerHTML = '';

        const logStatus = document.querySelector('#log-status');
        logStatus.innerHTML = '';
        loadCases();

    } catch (error) {
        const logStatus = document.querySelector('#log-status');
        logStatus.innerHTML = `<p id-status>${error}</p>`;
    }
});

loadCredentials();
loadCases();