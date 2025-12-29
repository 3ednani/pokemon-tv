const pokemonData = [
    { id: "S01", name: "Indigoligan", count: 80, arc: "Kanto" },
    { id: "S02", name: "Orangeöarna", count: 36, arc: "Kanto" },
    { id: "S03", name: "The Johto Journeys", count: 41, arc: "Johto" },
    { id: "S04", name: "Johto League Champions", count: 52, arc: "Johto" },
    { id: "S05", name: "Master Quest", count: 64, arc: "Johto" },
    { id: "S06", name: "Advanced", count: 40, arc: "Hoenn" },
    { id: "S07", name: "Advanced Challenge", count: 52, arc: "Hoenn" },
    { id: "S08", name: "Advanced Battle", count: 52, arc: "Hoenn" },
    { id: "S09", name: "Battle Frontier", count: 47, arc: "Hoenn" },
    { id: "S10", name: "Diamond and Pearl", count: 51, arc: "Sinnoh" },
    { id: "S11", name: "Battle Dimension", count: 52, arc: "Sinnoh" },
    { id: "S12", name: "Galactic Battles", count: 52, arc: "Sinnoh" },
    { id: "S13", name: "Sinnoh League Victors", count: 34, arc: "Sinnoh" },
    { id: "S14", name: "Black & White", count: 48, arc: "Unova" },
    { id: "S15", name: "Rival Destinies", count: 49, arc: "Unova" },
    { id: "S16: Adventures in Unova", count: 45, arc: "Unova" }
];

// This is where you will paste your Odysee IDs later
// Format: "S01": ["id1", "id2", "id3"...]
const videoKeys = {
    "S01": ["CLAIM_ID_EP1", "CLAIM_ID_EP2"], // Add your 80 IDs here
    "S02": [], // Add your 36 IDs here
    // ... repeat for all seasons
};

function initApp() {
    const grid = document.getElementById('main-grid');
    let currentArc = "";

    pokemonData.forEach(s => {
        if (s.arc !== currentArc) {
            currentArc = s.arc;
            const header = document.createElement('h2');
            header.className = "arc-title";
            header.innerText = "Region: " + currentArc;
            grid.appendChild(header);
        }

        const card = document.createElement('div');
        card.className = "card";
        card.onclick = () => openSeason(s);
        card.innerHTML = `
            <div class="card-img" style="background-image: url('thumbs/${s.id}.jpg')"></div>
            <h3>${s.name}</h3>
            <p>${s.count} Avsnitt</p>
        `;
        grid.appendChild(card);
    });
}

function openSeason(season) {
    document.getElementById('current-season-title').innerText = season.name;
    const list = document.getElementById('episode-list');
    list.innerHTML = "";

    for (let i = 1; i <= season.count; i++) {
        let btn = document.createElement('button');
        btn.className = "ep-row";
        
        // Check if watched
        const watched = localStorage.getItem(`${season.id}-ep${i}`);
        if(watched) btn.classList.add('watched');

        btn.innerHTML = `<span>Avsnitt ${i}</span><span class="play-icon">▶</span>`;
        
        btn.onclick = () => {
            const ids = videoKeys[season.id] || [];
            const claimId = ids[i-1] || "TODO"; // Gets the ID from your list
            document.getElementById('video-frame').src = "https://odysee.com/$/embed/" + claimId;
            localStorage.setItem(`${season.id}-ep${i}`, 'true');
            btn.classList.add('watched');
            window.scrollTo(0,0);
        };
        list.appendChild(btn);
    }

    document.getElementById('player-overlay').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closePlayer() {
    document.getElementById('player-overlay').classList.add('hidden');
    document.getElementById('video-frame').src = "";
    document.body.style.overflow = 'auto';
}

window.onload = initApp;
