const pokemonData = [
    { id: "S01", name: "Säsong 1: Indigoligan", count: 80, arc: "Början: Kanto" },
    { id: "S02", name: "Säsong 2: Äventyr på Orangeöarna", count: 36, arc: "Början: Kanto" },
    { id: "S03", name: "Säsong 3: The Johto Journeys", count: 41, arc: "Resan i Johto" },
    { id: "S04", name: "Säsong 4: Johto League Champions", count: 52, arc: "Resan i Johto" },
    { id: "S05", name: "Säsong 5: Master Quest", count: 64, arc: "Resan i Johto" },
    { id: "S06", name: "Säsong 6: Advanced", count: 40, arc: "Hoenn-eran" },
    { id: "S07", name: "Säsong 7: Advanced Challenge", count: 52, arc: "Hoenn-eran" },
    { id: "S08", name: "Säsong 8: Advanced Battle", count: 52, arc: "Hoenn-eran" },
    { id: "S09", name: "Säsong 9: Battle Frontier", count: 47, arc: "Hoenn-eran" },
    { id: "S10", name: "Säsong 10: Diamond and Pearl", count: 51, arc: "Sinnoh-sagan" },
    { id: "S11", name: "Säsong 11: Battle Dimension", count: 52, arc: "Sinnoh-sagan" },
    { id: "S12", name: "Säsong 12: Galactic Battles", count: 52, arc: "Sinnoh-sagan" },
    { id: "S13", name: "Säsong 13: Sinnoh League Victors", count: 34, arc: "Sinnoh-sagan" },
    { id: "S14", name: "Säsong 14: Black & White", count: 48, arc: "Unova-kapitlet" },
    { id: "S15", name: "Säsong 15: Rival Destinies", count: 49, arc: "Unova-kapitlet" },
    { id: "S16", name: "Säsong 16: Adventures in Unova", count: 45, arc: "Unova-kapitlet" }
];

const videoKeys = { "S01": [] }; // Fill with Odysee Claim IDs later

function initApp() {
    const main = document.getElementById('main-grid');
    let currentArc = "";
    let currentGrid = null;

    pokemonData.forEach(s => {
        if (s.arc !== currentArc) {
            currentArc = s.arc;
            const header = document.createElement('h2');
            header.className = "arc-title";
            header.innerText = currentArc;
            main.appendChild(header);
            
            currentGrid = document.createElement('div');
            currentGrid.className = "grid";
            main.appendChild(currentGrid);
        }

        const card = document.createElement('div');
        card.className = "card";
        card.onclick = () => openSeason(s);
        card.innerHTML = `
            <div class="card-img" style="background-image: url('thumbs/${s.id}.jpg')"></div>
            <h3>${s.name}</h3>
            <p>${s.count} Avsnitt</p>
        `;
        currentGrid.appendChild(card);
    });
}

function openSeason(season) {
    document.getElementById('current-season-title').innerText = season.name;
    const list = document.getElementById('episode-list');
    list.innerHTML = "";

    for (let i = 1; i <= season.count; i++) {
        let btn = document.createElement('button');
        btn.className = "ep-row";
        if(localStorage.getItem(`${season.id}-ep${i}`)) btn.classList.add('watched');

        btn.innerHTML = `<span>Avsnitt ${i}</span><span class="play-icon">▶</span>`;
        btn.onclick = () => {
            const id = (videoKeys[season.id] || [])[i-1];
            if (!id) {
                alert("Pikachu jobbar för fullt! ⚡ Ida & Andrea, det här avsnittet laddas upp snart!");
            } else {
                document.getElementById('video-frame').src = "https://odysee.com/$/embed/" + id;
                localStorage.setItem(`${season.id}-ep${i}`, 'true');
                btn.classList.add('watched');
            }
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
