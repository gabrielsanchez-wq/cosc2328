// HW9 – COSC 2328 – Professor McCurry
// Implemented by: Gabriel Enrique Sanchez Zambrana

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

// function logCase() {
//     const logBtn = document.querySelector('#log-btn');
//     logBtn.addEventListener('click', async (e) => {
//         const caseSuspect = document.querySelector('#case-suspect');
//         const caseLocation = document.querySelector('#case-location');
//         const caseNotes = document.querySelector('#case-notes');

//         const suspect = caseSuspect.textContent;
//         const location = caseLocation.textContent;
//         const notes = caseNotes.textContent;

//         try {
//             const res = await fetch('/hw9/cases', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ suspect, location, notes })
//             });
//             console.log('Success!');
//             if (!res.ok || res.status === 400) {
//                 throw new Error();
//             }

//             caseSuspect.textContent = '';
//             caseLocation.textContent = '';
//             caseNotes.textContent = '';

//             const logStatus = document.querySelector('#log-status');
//             logStatus.innerHTML = '';
//             loadCases();

//         } catch (error) {
//             const logStatus = document.querySelector('#log-status');
//             logStatus.innerHTML = `<p id-status>${error}</p>`;
//         }
//     });
// }

const logBtn = document.querySelector('#log-btn');
logBtn.addEventListener('click', async (e) => {
    const suspect = document.querySelector('#suspect').value.trim();
    const location = document.querySelector('#location').value.trim();
    const notes = document.querySelector('#notes').value.trim();

    // const suspect = caseSuspect.textContent;
    // const location = caseLocation.textContent;
    // const notes = caseNotes.textContent;

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
//logCase();