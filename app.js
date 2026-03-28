import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, doc, setDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB-VCW6uxyAq7od_Pn6RmRXQLMXwgEZce4",
  authDomain: "chzzkstarrank2.firebaseapp.com",
  projectId: "chzzkstarrank2",
  storageBucket: "chzzkstarrank2.firebasestorage.app",
  messagingSenderId: "562699734602",
  appId: "1:562699734602:web:d620c22e90e5a9ef88a0b3",
  measurementId: "G-R17QH907Y6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
    // Initial Data
    let defaultPlayers = [
        { id: '1', name: '제리', race: 'Zerg', rating: 2400, win: 0, loss: 0, prevRank: 1 },
        { id: '2', name: '아미1', race: 'Protoss', rating: 2362, win: 0, loss: 0, prevRank: 2 },
        { id: '3', name: '채선트', race: 'Protoss', rating: 2324, win: 0, loss: 0, prevRank: 3 },
        { id: '4', name: '코을', race: 'Terran', rating: 2286, win: 0, loss: 0, prevRank: 4 },
        { id: '5', name: '냔땐구', race: 'Terran', rating: 2248, win: 0, loss: 0, prevRank: 5 },
        { id: '6', name: '에뚜랑제', race: 'Zerg', rating: 2210, win: 0, loss: 0, prevRank: 6 },
        { id: '7', name: '나브자크', race: 'Random', rating: 2172, win: 0, loss: 0, prevRank: 7 },
        { id: '8', name: '순댕e', race: 'Protoss', rating: 2134, win: 0, loss: 0, prevRank: 8 },
        { id: '9', name: '에류엘', race: 'Protoss', rating: 2096, win: 0, loss: 0, prevRank: 9 },
        { id: '10', name: '아디엣', race: 'Protoss', rating: 2058, win: 0, loss: 0, prevRank: 10 },
        { id: '11', name: '하늘루틴', race: 'Zerg', rating: 2020, win: 0, loss: 0, prevRank: 11 },
        { id: '12', name: '전설의마왕9658', race: 'Terran', rating: 1982, win: 0, loss: 0, prevRank: 12 },
        { id: '13', name: '엄크술사', race: 'Terran', rating: 1944, win: 0, loss: 0, prevRank: 13 },
        { id: '14', name: 'SmileGyun', race: 'Protoss', rating: 1906, win: 0, loss: 0, prevRank: 14 },
        { id: '15', name: '아모크 ammock82', race: 'Zerg', rating: 1868, win: 0, loss: 0, prevRank: 15 },
        { id: '16', name: '콩아내', race: 'Protoss', rating: 1830, win: 0, loss: 0, prevRank: 16 },
        { id: '17', name: 'Crunch', race: 'Terran', rating: 1792, win: 0, loss: 0, prevRank: 17 },
        { id: '18', name: '은송아지', race: 'Zerg', rating: 1754, win: 0, loss: 0, prevRank: 18 },
        { id: '19', name: '앙오예', race: 'Terran', rating: 1716, win: 0, loss: 0, prevRank: 19 },
        { id: '20', name: '워모그JaX', race: 'Zerg', rating: 1678, win: 0, loss: 0, prevRank: 20 },
        { id: '21', name: '라무쓰', race: 'Terran', rating: 1640, win: 0, loss: 0, prevRank: 21 },
        { id: '22', name: '프로피', race: 'Terran', rating: 1602, win: 0, loss: 0, prevRank: 22 },
        { id: '23', name: '망시', race: 'Protoss', rating: 1564, win: 0, loss: 0, prevRank: 23 },
        { id: '24', name: '찬울 Chanwool', race: 'Terran', rating: 1526, win: 0, loss: 0, prevRank: 24 },
        { id: '25', name: '최병곤', race: 'Protoss', rating: 1488, win: 0, loss: 0, prevRank: 25 },
        { id: '26', name: '운요로', race: 'Zerg', rating: 1450, win: 0, loss: 0, prevRank: 26 },
        { id: '27', name: '고보미', race: 'Zerg', rating: 1412, win: 0, loss: 0, prevRank: 27 },
        { id: '28', name: '카루하', race: 'Terran', rating: 1374, win: 0, loss: 0, prevRank: 28 },
        { id: '29', name: '시폰케이크', race: 'Protoss', rating: 1336, win: 0, loss: 0, prevRank: 29 },
        { id: '30', name: '비카Vika', race: 'Zerg', rating: 1298, win: 0, loss: 0, prevRank: 30 },
        { id: '31', name: '양거북', Terran: 'Terran', race: 'Terran', rating: 1260, win: 0, loss: 0, prevRank: 31 },
        { id: '32', name: '한초약', race: 'Terran', rating: 1222, win: 0, loss: 0, prevRank: 32 },
        { id: '33', name: '실키아', race: 'Zerg', rating: 1184, win: 0, loss: 0, prevRank: 33 },
        { id: '34', name: '캐스커', race: 'Protoss', rating: 1146, win: 0, loss: 0, prevRank: 34 },
        { id: '35', name: '릴라차', race: 'Terran', rating: 1108, win: 0, loss: 0, prevRank: 35 },
        { id: '36', name: '고라니는똥손', race: 'Zerg', rating: 1070, win: 0, loss: 0, prevRank: 36 },
        { id: '37', name: '쿤', race: 'Protoss', rating: 1035, win: 0, loss: 0, prevRank: 37 },
        { id: '38', name: '두두키', race: 'Zerg', rating: 1000, win: 0, loss: 0, prevRank: 38 }
    ];

    let players = defaultPlayers;
    let matchHistory = [];
    let pendingMatches = [];
    let pendingUsers = [];
    let lastRankResetDate = new Date().toLocaleDateString('ko-KR');
    let isAdminLoggedIn = sessionStorage.getItem('chzzk_admin') === 'true';
    let adminDataMode = 'players'; // 'players' or 'matches'
    let searchTerm = '';
    
    // Real-time Database Snapshot
    onSnapshot(doc(db, "AppData", "RankingState"), (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.data();
            players = data.players || defaultPlayers;
            matchHistory = data.matchHistory || [];
            pendingMatches = data.pendingMatches || [];
            pendingUsers = data.pendingUsers || [];
            lastRankResetDate = data.lastRankResetDate || new Date().toLocaleDateString('ko-KR');
        } else {
            // First time ever creating the DB entry
            saveState();
        }

        // Midnight Reset Logic Update
        const today = new Date().toLocaleDateString('ko-KR');
        if (lastRankResetDate !== today) {
            players.sort((a, b) => b.rating - a.rating);
            players.forEach((p, index) => {
                p.currentRank = index + 1;
                p.prevRank = p.currentRank;
            });
            lastRankResetDate = today;
            saveState();
        }

        updateUI();
        if (isAdminLoggedIn) renderAdminDashboard();
    });

    // Check for midnight rollover every minute for active clients
    setInterval(() => {
        const today = new Date().toLocaleDateString('ko-KR');
        if (lastRankResetDate !== today) {
            players.sort((a, b) => b.rating - a.rating);
            players.forEach((p, index) => {
                p.currentRank = index + 1;
                p.prevRank = p.currentRank;
            });
            lastRankResetDate = today;
            updateUI(); // also calls saveState implicitly
        }
    }, 60000);

    async function saveState() {
        try {
            await setDoc(doc(db, "AppData", "RankingState"), {
                players: players,
                matchHistory: matchHistory,
                pendingMatches: pendingMatches,
                pendingUsers: pendingUsers,
                lastRankResetDate: lastRankResetDate
            });
        } catch(e) { console.error("Firebase save failure:", e); }
    }

    // ELO Rating Config
    const K_FACTOR = 32;

    // DOM Elements
    const rankingTableBody = document.getElementById('rankingTableBody');
    const tierTableBody = document.getElementById('tierTableBody');
    const historyContainer = document.getElementById('historyContainer');
    
    // Select Elements for Form
    const winnerSelect = document.getElementById('matchWinner');
    const loserSelect = document.getElementById('matchLoser');
    
    // Stats Elements
    const totalPlayersEl = document.getElementById('totalPlayers');
    const totalMatchesEl = document.getElementById('totalMatches');
    const topRatingScoreEl = document.getElementById('topRatingScore');
    const topRatingNameEl = document.getElementById('topRatingName');
    const historyCountEl = document.getElementById('historyCount');
    
    // Search
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        searchTerm = e.target.value.toLowerCase();
        renderTierTable(); // Highlight in tier table
    });

    // Initialize Selects
    function initSelects() {
        winnerSelect.innerHTML = '<option value="">선택하세요</option>';
        loserSelect.innerHTML = '<option value="">선택하세요</option>';
        
        // Sort players alphabetically for select
        const sorted = [...players].sort((a, b) => a.name.localeCompare(b.name));
        sorted.forEach(p => {
            winnerSelect.innerHTML += `<option value="${p.id}">${p.name} (${p.race})</option>`;
            loserSelect.innerHTML += `<option value="${p.id}">${p.name} (${p.race})</option>`;
        });
    }

    // Sort players and update ranks
    function calculateRanks() {
        players.sort((a, b) => b.rating - a.rating);
        players.forEach((p, index) => {
            p.currentRank = index + 1;
        });
    }

    // Render Stats
    function renderStats() {
        totalPlayersEl.textContent = players.length;
        totalMatchesEl.textContent = matchHistory.length;
        historyCountEl.textContent = matchHistory.length;
        
        if (players.length > 0) {
            topRatingScoreEl.textContent = Math.round(players[0].rating);
            topRatingNameEl.textContent = players[0].name;
        }
    }

    // Get winrate string
    function getWinrate(win, loss) {
        const total = win + loss;
        if (total === 0) return '0%';
        return Math.round((win / total) * 100) + '%';
    }

    function isNewUser(approvedAt) {
        if (!approvedAt) return false;
        const ONE_DAY = 24 * 60 * 60 * 1000;
        return (Date.now() - approvedAt) < ONE_DAY;
    }

    // Render Ranking Table
    function renderRankingTable() {
        calculateRanks();
        rankingTableBody.innerHTML = '';
        
        players.forEach(p => {
            const rankClass = p.currentRank <= 3 ? `rank-${p.currentRank}` : '';
            const winrate = getWinrate(p.win, p.loss);
            
            // Calculate Rank Change
            let rankChangeHtml = '<span class="rank-change change-none">-</span>';
            if (p.prevRank > p.currentRank) {
                rankChangeHtml = `<span class="rank-change change-up">▲ ${p.prevRank - p.currentRank}</span>`;
            } else if (p.prevRank < p.currentRank) {
                rankChangeHtml = `<span class="rank-change change-down">▼ ${p.currentRank - p.prevRank}</span>`;
            }

            const newBadge = isNewUser(p.approvedAt) ? '<span class="new-badge">N</span>' : '';

            const trOuter = document.createElement('tr');
            trOuter.innerHTML = `
                <td>
                    <span class="rank-number ${rankClass}">${p.currentRank}</span>
                    ${rankChangeHtml}
                </td>
                <td class="user-name">${newBadge}${p.name}</td>
                <td><span class="race-badge ${p.race.toLowerCase()}">${p.race}</span></td>
                <td class="rating-score">${Math.round(p.rating)}</td>
                <td class="record"><span class="win">${p.win}W</span> / <span class="loss">${p.loss}L</span> <span class="winrate">(${winrate})</span></td>
                <td>
                    <button class="action-btn toggle-details" data-id="${p.id}">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </button>
                </td>
            `;
            
            rankingTableBody.appendChild(trOuter);
        });

        // Add toggle event listeners for modal
        document.querySelectorAll('.toggle-details').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                const p = players.find(player => player.id === id);
                if (p) {
                    const detailModalTitle = document.getElementById('detailModalTitle');
                    const detailModalBody = document.getElementById('detailModalBody');
                    const userDetailsModal = document.getElementById('userDetailsModal');

                    const playerMatches = matchHistory.filter(m => m.winner.name === p.name || m.loser.name === p.name).slice(0, 5);
                    let matchesHtml = '<div style="grid-column: 1 / -1; margin-top: 0.5rem; padding-top: 1rem; border-top: 1px dashed var(--border-color);"><h4 style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.5rem;">최근 매치 기록 (최대 5개)</h4>';
                    if (playerMatches.length > 0) {
                        matchesHtml += '<ul style="list-style: none; padding: 0; font-size: 0.85rem;">';
                        playerMatches.forEach(m => {
                            const isWin = m.winner.name === p.name;
                            const resultClass = isWin ? 'win' : 'loss';
                            const resultText = isWin ? '승리' : '패배';
                            const opponent = isWin ? m.loser.name : m.winner.name;
                            const delta = isWin ? m.winner.delta : m.loser.delta;
                            matchesHtml += `<li style="display: flex; justify-content: space-between; padding: 0.4rem 0;">
                                <span style="color: var(--text-muted);">${m.title} <span style="color: var(--text-main);">vs ${opponent}</span></span>
                                <span><span class="${resultClass}">${resultText}</span> <span style="font-size: 0.8rem; margin-left: 0.25rem;">${delta}</span></span>
                            </li>`;
                        });
                        matchesHtml += '</ul></div>';
                    } else {
                        matchesHtml += '<div style="color: var(--text-muted); font-size: 0.85rem; text-align: center; padding: 1rem 0;">최근 매치 기록이 없습니다.</div></div>';
                    }
                    
                    detailModalTitle.textContent = `${p.name} 상세정보`;
                    detailModalBody.innerHTML = `
                        <div class="detail-stat">
                            <span class="detail-stat-label">종족</span>
                            <span class="detail-stat-val">
                                <span class="race-badge ${p.race.toLowerCase()}" style="font-size: 1rem;">${p.race}</span>
                            </span>
                        </div>
                        <div class="detail-stat">
                            <span class="detail-stat-label">티어</span>
                            <span class="detail-stat-val tier-${getTier(p.rating).toLowerCase()}">${getTier(p.rating)} Tier</span>
                        </div>
                        <div class="detail-stat">
                            <span class="detail-stat-label">구 레이팅 / 현재 레이팅</span>
                            <span class="detail-stat-val">${Math.round(p.rating)}</span>
                        </div>
                        <div class="detail-stat">
                            <span class="detail-stat-label">전적</span>
                            <span class="detail-stat-val">${p.win}승 ${p.loss}패 <span style="font-size:0.9rem; color:var(--text-muted); font-weight:normal;">(${getWinrate(p.win, p.loss)})</span></span>
                        </div>
                        ${matchesHtml}
                    `;
                    userDetailsModal.classList.add('active');
                }
            });
        });
    }

    // Determine Tier based on ranking
    function getTier(rating) {
        if (rating >= 2200) return 'S';
        if (rating >= 1900) return 'A';
        if (rating >= 1700) return 'B';
        if (rating >= 1500) return 'C';
        if (rating >= 1200) return 'D';
        return 'E';
    }

    // Render Tier Table
    function renderTierTable() {
        tierTableBody.innerHTML = '';
        
        // Group players by tier
        const tiers = { S: [], A: [], B: [], C: [], D: [], E: [] };
        
        players.forEach(p => {
            const tier = getTier(p.rating);
            tiers[tier].push(p);
        });
        
        Object.keys(tiers).forEach(tierName => {
            const tr = document.createElement('tr');
            
            // Build the string for players in this tier
            const tierPlayers = tiers[tierName];
            
            // Slice players into chunks of 5 per line visually within the cell
            let playersHtml = '<div class="tier-row-content">';
            tierPlayers.forEach(p => {
                const isHighlighted = searchTerm && p.name.toLowerCase().includes(searchTerm) ? 'highlight' : '';
                const raceChar = p.race.charAt(0);
                const newBadge = isNewUser(p.approvedAt) ? '<span class="new-badge tier-badge">N</span>' : '';
                playersHtml += `<div class="tier-player-item ${isHighlighted}">${newBadge}${p.name} (${raceChar})</div>`;
            });
            playersHtml += '</div>';

            tr.innerHTML = `
                <td class="tier-${tierName.toLowerCase()}">${tierName}</td>
                <td colspan="5">${playersHtml}</td>
            `;
            
            tierTableBody.appendChild(tr);
        });
    }

    // Calculate ELO Rating
    function calculateElo(winnerRating, loserRating) {
        // Probability of winning
        const p1 = 1 / (1 + Math.pow(10, (loserRating - winnerRating) / 400));
        // K-factor
        const k = K_FACTOR;
        
        // Rating change
        const delta = Math.round(k * (1 - p1));
        
        return delta;
    }

    // Process Match
    function processMatch(title, winnerId, loserId) {
        const winner = players.find(p => p.id === winnerId);
        const loser = players.find(p => p.id === loserId);

        const delta = calculateElo(winner.rating, loser.rating);

        winner.rating += delta;
        winner.win += 1;
        
        loser.rating -= delta;
        loser.loss += 1;

        const match = {
            id: Date.now(),
            title: title || '친선전',
            date: new Date().toLocaleDateString('ko-KR') + ' ' + new Date().toLocaleTimeString('ko-KR'),
            winner: { name: winner.name, delta: `+${delta}` },
            loser: { name: loser.name, delta: `-${delta}` }
        };

        matchHistory.unshift(match);
        
        // Re-render everything
        updateUI();
    }

    // Render Match History
    function renderHistory() {
        if (matchHistory.length === 0) {
            historyContainer.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg></div>
                    <h3>매치 기록이 없습니다</h3>
                    <p>첫 번째 매치 결과를 제보해 보세요.</p>
                </div>
            `;
            return;
        }

        let html = '<div class="history-list">';
        matchHistory.forEach(match => {
            html += `
                <div class="history-item">
                    <div class="match-info">
                        <h4>${match.title}</h4>
                        <div class="match-time">${match.date}</div>
                    </div>
                    <div class="match-result">
                        <div class="player-outcome player-winner">
                            ${match.winner.name} <span class="rating-delta">${match.winner.delta}</span>
                        </div>
                        <div class="vs">VS</div>
                        <div class="player-outcome player-loser">
                            ${match.loser.name} <span class="rating-delta">${match.loser.delta}</span>
                        </div>
                    </div>
                </div>
            `;
        });
        html += '</div>';
        historyContainer.innerHTML = html;
    }

    function updateUI() {
        calculateRanks(); // initial currentRank assignment
        renderStats();
        renderRankingTable();
        renderTierTable();
        renderHistory();
        initSelects();
        saveState();
    }

    // Tabs logic
    const navBtns = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class
            navBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(t => t.classList.remove('active'));
            
            // Add active class
            btn.classList.add('active');
            const target = btn.getAttribute('data-tab');
            document.getElementById(`tab-${target}`).classList.add('active');
        });
    });

    // Modal Logic
    const reportBtn = document.getElementById('reportBtn');
    const modal = document.getElementById('reportModal');
    const closeBtn = document.querySelector('.close-btn');
    const submitBtn = document.getElementById('submitMatchBtn');

    reportBtn.addEventListener('click', () => {
        modal.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    const userDetailsModal = document.getElementById('userDetailsModal');
    const closeDetailModalBtn = document.getElementById('closeDetailModalBtn');

    closeDetailModalBtn.addEventListener('click', () => {
        userDetailsModal.classList.remove('active');
    });

    userDetailsModal.addEventListener('click', (e) => {
        if (e.target === userDetailsModal) {
            userDetailsModal.classList.remove('active');
        }
    });

    submitBtn.addEventListener('click', () => {
        const title = document.getElementById('matchTitle').value;
        const winner = winnerSelect.value;
        const loser = loserSelect.value;

        if (!winner || !loser) {
            alert('승리자와 패배자를 모두 선택해주세요.');
            return;
        }

        if (winner === loser) {
            alert('승리자와 패배자는 다른 유저여야 합니다.');
            return;
        }

        // Queue for admin instead of direct processing
        pendingMatches.push({
            id: Date.now().toString(),
            title: title || '친선전',
            winnerId: winner,
            loserId: loser,
            winnerName: winnerSelect.options[winnerSelect.selectedIndex].text.split(' (')[0],
            loserName: loserSelect.options[loserSelect.selectedIndex].text.split(' (')[0],
            date: new Date().toLocaleDateString('ko-KR') + ' ' + new Date().toLocaleTimeString('ko-KR'),
            status: 'pending'
        });
        saveState();
        
        // Reset and close
        document.getElementById('matchTitle').value = '';
        winnerSelect.value = '';
        loserSelect.value = '';
        modal.classList.remove('active');
        
        if (typeof renderAdminDashboard === 'function') renderAdminDashboard();
        alert('매치 제보가 정상적으로 접수되었습니다. 관리자 승인 후 반영됩니다.');
    });

    // Add User Modal Logic
    const reportUserBtn = document.getElementById('reportUserBtn');
    const reportUserModal = document.getElementById('reportUserModal');
    const closeUserModalBtn = document.getElementById('closeUserModalBtn');
    const submitUserBtn = document.getElementById('submitUserBtn');

    reportUserBtn.addEventListener('click', () => {
        reportUserModal.classList.add('active');
    });

    closeUserModalBtn.addEventListener('click', () => {
        reportUserModal.classList.remove('active');
    });

    reportUserModal.addEventListener('click', (e) => {
        if (e.target === reportUserModal) {
            reportUserModal.classList.remove('active');
        }
    });

    submitUserBtn.addEventListener('click', () => {
        const name = document.getElementById('newUserName').value.trim();
        const race = document.getElementById('newUserRace').value;
        const rating = parseInt(document.getElementById('newUserRating').value) || 1200;
        
        const recordStr = document.getElementById('newUserRecord').value.trim();
        let wins = 0;
        let losses = 0;
        if (recordStr) {
            const winMatch = recordStr.match(/(\d+)\s*승/);
            const lossMatch = recordStr.match(/(\d+)\s*패/);
            if (winMatch) wins = parseInt(winMatch[1], 10);
            if (lossMatch) losses = parseInt(lossMatch[1], 10);
        }

        if (!name) {
            alert('유저의 이름을 입력해주세요.');
            return;
        }
        if (!race) {
            alert('종족을 선택해주세요.');
            return;
        }
        
        // Ensure name is unique
        if (players.some(p => p.name === name)) {
            alert('이미 같은 이름의 유저가 존재합니다.');
            return;
        }

        const newUser = {
            id: Date.now().toString(),
            name: name,
            race: race,
            rating: rating,
            win: wins,
            loss: losses,
            prevRank: players.length + 1,
            status: 'pending',
            recordStr: recordStr || ''
        };

        pendingUsers.push(newUser);
        saveState();
        
        // Clear form
        document.getElementById('newUserName').value = '';
        document.getElementById('newUserRace').value = '';
        document.getElementById('newUserRating').value = '1200';
        document.getElementById('newUserRecord').value = '';
        
        reportUserModal.classList.remove('active');
        
        if (typeof renderAdminDashboard === 'function') renderAdminDashboard();
        alert(`유저 '${name}'님 제보가 정상적으로 접수되었습니다. 관리자 승인 후 반영됩니다.`);
    });

    // Sub-routine: Initialize Current Rank safely before the start
    calculateRanks();

    // Initial load will be triggered entirely by Firebase onSnapshot now.
    // updateUI() has been removed here to prevent flashing default data.

    // --- ADMIN LOGIC ---
    const adminLoginBtn = document.getElementById('adminLoginBtn');
    const adminAuthModal = document.getElementById('adminAuthModal');
    const closeAdminAuthBtn = document.getElementById('closeAdminAuthBtn');
    const submitAdminLoginBtn = document.getElementById('submitAdminLoginBtn');
    const adminTabBtn = document.getElementById('adminTabBtn');

    adminLoginBtn.addEventListener('click', () => {
        if (isAdminLoggedIn) {
            adminTabBtn.click();
        } else {
            adminAuthModal.classList.add('active');
        }
    });

    closeAdminAuthBtn.addEventListener('click', () => {
        adminAuthModal.classList.remove('active');
    });

    submitAdminLoginBtn.addEventListener('click', () => {
        const id = document.getElementById('adminId').value;
        const pw = document.getElementById('adminPw').value;
        
        // Simple base64 comparison for basic obfuscation
        if (btoa(id) === 'c2RjbWFuYWdlcg==' && btoa(pw) === 'c3RhcmRldmlsMUA=') {
            isAdminLoggedIn = true;
            sessionStorage.setItem('chzzk_admin', 'true');
            adminAuthModal.classList.remove('active');
            adminTabBtn.style.display = 'inline-block';
            adminLoginBtn.style.display = 'none';
            renderAdminDashboard();
            adminTabBtn.click();
        } else {
            alert('아이디 또는 비밀번호가 틀렸습니다.');
        }
    });

    const tabAdmin = document.getElementById('tab-admin');
    
    // Admin Tabs Logic
    const adminGridCards = document.querySelectorAll('.admin-grid-card');
    const adminContentSections = document.querySelectorAll('.admin-content-section');

    adminGridCards.forEach(card => {
        card.addEventListener('click', () => {
            adminGridCards.forEach(c => {
                c.classList.remove('active');
            });
            adminContentSections.forEach(s => s.style.display = 'none');
            
            card.classList.add('active');
            
            const target = card.getAttribute('data-target');
            document.getElementById(target).style.display = 'block';
        });
    });

    function renderAdminDashboard() {
        if (!isAdminLoggedIn) return;

        // Pending Matches
        const matchContainer = document.getElementById('pendingMatchesContainer');
        if (matchContainer) {
            matchContainer.innerHTML = '';
            pendingMatches.forEach(m => {
                let itemsHtml = `
                    <div class="admin-item">
                        <div class="admin-item-info">
                            <div class="admin-item-title">${m.title}</div>
                            <div>승자: <strong>${m.winnerName}</strong> / 패자: <strong>${m.loserName}</strong></div>
                            <div style="font-size:0.8rem; color:var(--text-muted);">${m.date}</div>
                        </div>
                        <div class="admin-actions">
                `;
                if (m.status === 'pending') {
                    itemsHtml += `
                            <button class="admin-btn approve admin-match-approve" data-id="${m.id}">승인</button>
                            <button class="admin-btn reject admin-match-reject" data-id="${m.id}">거절</button>
                    `;
                } else if (m.status === 'rejected') {
                    itemsHtml += `<span class="admin-status status-rejected">거절됨</span>`;
                } else if (m.status === 'approved') {
                    itemsHtml += `<span class="admin-status status-approved">승인됨</span>`;
                }
                itemsHtml += `<button class="admin-btn delete admin-match-delete" data-id="${m.id}">삭제</button></div></div>`;
                matchContainer.innerHTML += itemsHtml;
            });
            if (pendingMatches.length === 0) matchContainer.innerHTML = '<div style="color:var(--text-muted); font-size:0.9rem;">대기열이 없습니다.</div>';
        }

        // Pending Users
        const userContainer = document.getElementById('pendingUsersContainer');
        if (userContainer) {
            userContainer.innerHTML = '';
            pendingUsers.forEach(u => {
                let itemsHtml = `
                    <div class="admin-item">
                        <div class="admin-item-info">
                            <div class="admin-item-title">${u.name} <span style="font-size:0.8rem; font-weight:normal;">(${u.race})</span></div>
                            <div>시작 레이팅: ${u.rating} / 초기 전적: ${u.win}승 ${u.loss}패</div>
                            <div style="font-size:0.85rem; color:var(--text-muted); margin-top:0.3rem;">최근 전적: ${u.recordStr ? u.recordStr : '기입 안함'}</div>
                        </div>
                        <div class="admin-actions">
                `;
                if (u.status === 'pending') {
                    itemsHtml += `
                            <button class="admin-btn approve admin-user-approve" data-id="${u.id}">승인</button>
                            <button class="admin-btn reject admin-user-reject" data-id="${u.id}">거절</button>
                    `;
                } else if (u.status === 'rejected') {
                    itemsHtml += `<span class="admin-status status-rejected">거절됨</span>`;
                } else if (u.status === 'approved') {
                    itemsHtml += `<span class="admin-status status-approved">승인됨</span>`;
                }
                itemsHtml += `<button class="admin-btn delete admin-user-delete" data-id="${u.id}">삭제</button></div></div>`;
                userContainer.innerHTML += itemsHtml;
            });
            if (pendingUsers.length === 0) userContainer.innerHTML = '<div style="color:var(--text-muted); font-size:0.9rem;">대기열이 없습니다.</div>';
        }

        // Ranking (유저 순위 데이터 관리)
        const rankContainer = document.getElementById('adminRankingContainer');
        if (rankContainer) {
            rankContainer.innerHTML = '<h3 style="margin-bottom:1rem;color:var(--text-muted);font-size:0.9rem;">현재 등록된 유저들의 통합 관리 및 순위/레이팅 조정이 가능합니다.</h3>';
            players.forEach(p => {
                rankContainer.innerHTML += `
                    <div class="admin-item" style="flex-direction: column; align-items: start;">
                        <div class="admin-edit-row">
                            <input type="text" class="admin-edit-input p-name" data-id="${p.id}" value="${p.name}" style="width: 100px;">
                            <select class="admin-edit-input p-race" data-id="${p.id}">
                                <option value="Zerg" ${p.race==='Zerg'?'selected':''}>Z</option>
                                <option value="Protoss" ${p.race==='Protoss'?'selected':''}>P</option>
                                <option value="Terran" ${p.race==='Terran'?'selected':''}>T</option>
                                <option value="Random" ${p.race==='Random'?'selected':''}>R</option>
                            </select>
                            <input type="number" class="admin-edit-input p-rating" data-id="${p.id}" value="${Math.round(p.rating)}" style="width: 80px;" title="레이팅">
                            <input type="number" class="admin-edit-input p-win" data-id="${p.id}" value="${p.win}" style="width: 60px;" title="승">
                            <input type="number" class="admin-edit-input p-loss" data-id="${p.id}" value="${p.loss}" style="width: 60px;" title="패">
                            <button class="admin-btn approve admin-save-player" data-id="${p.id}">저장</button>
                            <button class="admin-btn delete admin-delete-player" data-id="${p.id}">삭제</button>
                        </div>
                    </div>
                `;
            });
        }

        // History (매치 기록 데이터 관리)
        const histContainer = document.getElementById('adminHistoryContainer');
        if (histContainer) {
            histContainer.innerHTML = '<h3 style="margin-bottom:1rem;color:var(--text-muted);font-size:0.9rem;">매치 기록 데이터 수정 및 삭제가 가능합니다.</h3>';
            matchHistory.forEach(m => {
                histContainer.innerHTML += `
                    <div class="admin-item" style="flex-direction: column; align-items: start;">
                        <div class="admin-edit-row">
                            <input type="text" class="admin-edit-input m-title" data-id="${m.id}" value="${m.title}" style="width: 250px;">
                            <span style="font-size:0.8rem; color:var(--text-muted); margin:0 0.5rem; white-space:nowrap;">승: ${m.winner.name} | 패: ${m.loser.name}</span>
                            <button class="admin-btn approve admin-save-match" data-id="${m.id}">저장</button>
                            <button class="admin-btn delete admin-delete-match" data-id="${m.id}">삭제</button>
                        </div>
                    </div>
                `;
            });
            if(matchHistory.length === 0) histContainer.innerHTML += '<div style="color:var(--text-muted); font-size:0.9rem;">매치 기록이 없습니다.</div>';
        }

        // Tier (티어표 현황)
        const tierContainer = document.getElementById('adminTierContainer');
        if (tierContainer) {
            tierContainer.innerHTML = '<h3 style="margin-bottom:1rem;color:var(--text-muted);font-size:0.9rem;">현재 티어별 현황입니다. (각 유저의 세부 데이터 수정은 "순위" 탭을 이용하세요)</h3>';
            
            const tiers = { S: [], A: [], B: [], C: [], D: [], E: [] };
            players.forEach(p => {
                const tier = getTier(p.rating);
                tiers[tier].push(p);
            });
            
            Object.keys(tiers).forEach(tierName => {
                if(tiers[tierName].length > 0) {
                    let pDetails = tiers[tierName].map(p => `<span class="admin-edit-input" style="display:inline-block; margin: 0.2rem; background:rgba(0,0,0,0.5); border:1px solid rgba(255,255,255,0.1);">${p.name} <span style="opacity:0.6;font-size:0.8em;">${Math.round(p.rating)}</span></span>`).join('');
                    tierContainer.innerHTML += `
                        <div class="admin-item" style="flex-direction: column; align-items: start; margin-bottom: 0.5rem;">
                            <h4 class="tier-${tierName.toLowerCase()}" style="margin-bottom:0.5rem; width:100%; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:0.25rem; font-size:1.2rem;">${tierName} Tier</h4>
                            <div style="display:flex; flex-wrap:wrap;">${pDetails}</div>
                        </div>
                    `;
                }
            });
        }
    }

    // Delegation for admin dynamic buttons
    tabAdmin?.addEventListener('click', (e) => {
        if (!isAdminLoggedIn) return;

        // Pending Matches Logic
        if (e.target.classList.contains('admin-match-approve')) {
            const id = e.target.getAttribute('data-id');
            const match = pendingMatches.find(m => m.id === id);
            if(match) {
                match.status = 'approved';
                processMatch(match.title, match.winnerId, match.loserId);
                saveState();
                alert('매치 결과가 승인되고 전적에 반영되었습니다.');
                renderAdminDashboard();
            }
        }
        if (e.target.classList.contains('admin-match-reject')) {
            const id = e.target.getAttribute('data-id');
            const match = pendingMatches.find(m => m.id === id);
            if(match) {
                match.status = 'rejected';
                saveState();
                renderAdminDashboard();
            }
        }
        if (e.target.classList.contains('admin-match-delete')) {
            const id = e.target.getAttribute('data-id');
            pendingMatches = pendingMatches.filter(m => m.id !== id);
            saveState();
            renderAdminDashboard();
        }

        // Pending Users Logic
        if (e.target.classList.contains('admin-user-approve')) {
            const id = e.target.getAttribute('data-id');
            const user = pendingUsers.find(u => u.id === id);
            if(user) {
                user.status = 'approved';
                const { status, recordStr, ...validUser } = user;
                validUser.approvedAt = Date.now();
                players.push(validUser);
                pendingUsers = pendingUsers.filter(u => u.id !== id);
                updateUI();
                saveState();
                alert(`유저 '${user.name}'님이 랭킹에 등록되었습니다.`);
                renderAdminDashboard();
            }
        }
        if (e.target.classList.contains('admin-user-reject')) {
            const id = e.target.getAttribute('data-id');
            pendingUsers = pendingUsers.filter(u => u.id !== id);
            saveState();
            renderAdminDashboard();
        }
        if (e.target.classList.contains('admin-user-delete')) {
            const id = e.target.getAttribute('data-id');
            pendingUsers = pendingUsers.filter(u => u.id !== id);
            saveState();
            renderAdminDashboard();
        }

        // Data Edit Logic - Players
        if (e.target.classList.contains('admin-save-player')) {
            const id = e.target.getAttribute('data-id');
            const p = players.find(x => x.id === id);
            if (p) {
                const parent = e.target.parentElement;
                p.name = parent.querySelector('.p-name').value;
                p.race = parent.querySelector('.p-race').value;
                p.rating = parseFloat(parent.querySelector('.p-rating').value) || 0;
                p.win = parseInt(parent.querySelector('.p-win').value, 10) || 0;
                p.loss = parseInt(parent.querySelector('.p-loss').value, 10) || 0;
                updateUI();
                saveState();
                renderAdminDashboard();
                alert('유저 데이터가 성공적으로 수정되었습니다.');
            }
        }
        if (e.target.classList.contains('admin-delete-player')) {
            if(confirm('정말 이 유저를 삭제하시겠습니까?')) {
                const id = e.target.getAttribute('data-id');
                players = players.filter(x => x.id !== id);
                updateUI();
                saveState();
                renderAdminDashboard();
                alert('유저가 삭제되었습니다.');
            }
        }

        // Data Edit Logic - Matches
        if (e.target.classList.contains('admin-save-match')) {
            const id = parseInt(e.target.getAttribute('data-id'), 10);
            const m = matchHistory.find(x => x.id === id);
            if (m) {
                const parent = e.target.parentElement;
                m.title = parent.querySelector('.m-title').value;
                updateUI();
                renderAdminDashboard();
                alert('매치 기록이 수정되었습니다.');
            }
        }
        if (e.target.classList.contains('admin-delete-match')) {
            if(confirm('정말 이 매치 기록을 삭제하시겠습니까? (이 작업은 점수를 되돌리지 않으며 기록만 삭제합니다)')) {
                const id = parseInt(e.target.getAttribute('data-id'), 10);
                matchHistory = matchHistory.filter(x => x.id !== id);
                updateUI();
                renderAdminDashboard();
                alert('매치 기록이 삭제되었습니다.');
            }
        }
    });

    if (isAdminLoggedIn) {
        adminTabBtn.style.display = 'inline-block';
        adminLoginBtn.style.display = 'none';
        renderAdminDashboard();
    }
});
