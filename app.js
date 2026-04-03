import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { 
    getFirestore, doc, setDoc, getDoc, updateDoc, deleteDoc, 
    collection, addDoc, onSnapshot, query, orderBy, getDocs, limit, increment, runTransaction, writeBatch 
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

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

document.addEventListener('DOMContentLoaded', async () => {
    // --- [사용자 백업 데이터] ---
    const backupPlayers = [
        { id: "1", name: "제리", race: "Zerg", rating: 2480, win: 8, loss: 0, prevRank: 1 },
        { id: "2", name: "아미1", race: "Protoss", rating: 2350, win: 4, loss: 3, prevRank: 2 },
        { id: "3", name: "채선트", race: "Protoss", rating: 2303, win: 2, loss: 2, prevRank: 3 },
        { id: "4", name: "코을", race: "Terran", rating: 2267, win: 1, loss: 2, prevRank: 4 },
        { id: "5", name: "냔땐구", race: "Terran", rating: 2248, win: 0, loss: 0, prevRank: 5 },
        { id: "6", name: "에뚜랑제", race: "Zerg", rating: 2192, win: 2, loss: 2, prevRank: 6 },
        { id: "7", name: "나브자크", race: "Random", rating: 2172, win: 0, loss: 0, prevRank: 7 },
        { id: "8", name: "순댕e", race: "Protoss", rating: 2160, win: 0, loss: 0, prevRank: 8 },
        { id: "9", name: "에류엘", race: "Protoss", rating: 2096, win: 0, loss: 0, prevRank: 9 },
        { id: "10", name: "아디엣", race: "Protoss", rating: 2058, win: 0, loss: 0, prevRank: 10 },
        { id: "11", name: "하늘루틴", race: "Zerg", rating: 2020, win: 0, loss: 0, prevRank: 11 },
        { id: "12", name: "전설의마왕9658", race: "Terran", rating: 1987, win: 1, loss: 2, prevRank: 12 },
        { id: "17", name: "Crunch", race: "Terran", rating: 1962, win: 0, loss: 0, prevRank: 17 },
        { id: "13", name: "엄크술사", race: "Terran", rating: 1944, win: 0, loss: 0, prevRank: 13 },
        { id: "14", name: "SmileGyun", race: "Protoss", rating: 1869, win: 0, loss: 1, prevRank: 14 },
        { id: "15", name: "아모크 ammock82", race: "Zerg", rating: 1838, win: 0, loss: 0, prevRank: 15 },
        { id: "16", name: "콩아내", race: "Protoss", rating: 1833, win: 0, loss: 1, prevRank: 16 },
        { id: "18", name: "은송아지", race: "Zerg", rating: 1770, win: 0, loss: 0, prevRank: 18 },
        { id: "19", name: "앙오예", race: "Terran", rating: 1716, win: 0, loss: 0, prevRank: 19 },
        { id: "20", name: "워모그JaX", race: "Zerg", rating: 1678, win: 3, loss: 3, prevRank: 20 },
        { id: "21", name: "라무쓰", race: "Terran", rating: 1650, win: 0, loss: 0, prevRank: 21 },
        { id: "22", name: "프로피", race: "Terran", rating: 1640, win: 3, loss: 5, prevRank: 22 },
        { id: "23", name: "망시", race: "Protoss", rating: 1584, win: 0, loss: 0, prevRank: 23 },
        { id: "24", name: "찬울 Chanwool", race: "Terran", rating: 1526, win: 0, loss: 0, prevRank: 24 },
        { id: "25", name: "최병곤", race: "Protoss", rating: 1501, win: 0, loss: 0, prevRank: 25 },
        { id: "26", name: "운요로", race: "Zerg", rating: 1450, win: 0, loss: 0, prevRank: 26 },
        { id: "27", name: "고보미", race: "Zerg", rating: 1432, win: 0, loss: 0, prevRank: 27 },
        { id: "28", name: "카루하", race: "Terran", rating: 1385, win: 0, loss: 0, prevRank: 28 },
        { id: "29", name: "시폰케이크", race: "Protoss", rating: 1331, win: 0, loss: 0, prevRank: 29 },
        { id: "30", name: "비카Vika", race: "Zerg", rating: 1298, win: 0, loss: 1, prevRank: 30 },
        { id: "31", name: "양거북", race: "Terran", rating: 1290, win: 0, loss: 2, prevRank: 31 },
        { id: "32", name: "한초약", race: "Terran", rating: 1222, win: 0, loss: 0, prevRank: 32 },
        { id: "33", name: "실키아", race: "Zerg", rating: 1184, win: 0, loss: 0, prevRank: 33 },
        { id: "34", name: "캐스커", race: "Protoss", rating: 1146, win: 0, loss: 0, prevRank: 34 },
        { id: "35", name: "릴라차", race: "Terran", rating: 1108, win: 0, loss: 0, prevRank: 35 },
        { id: "36", name: "고라니는똥손", race: "Zerg", rating: 1070, win: 0, loss: 0, prevRank: 36 },
        { id: "37", name: "쿤", race: "Protoss", rating: 1035, win: 0, loss: 0, prevRank: 37 },
        { id: "38", name: "두두키", race: "Zerg", rating: 1000, win: 0, loss: 0, prevRank: 38 }
    ];

    const backupMatches = [
        { id: 1774684490476, date: "2026. 3. 28. 오후 4:54:50", title: "SDC Cup Open Season 1 결승전 3세트", winner: { name: "제리", delta: "+11" }, loser: { name: "아미1", delta: "-11" } },
        { id: 1774684489298, date: "2026. 3. 28. 오후 4:54:49", title: "SDC Cup Open Season 1 결승전 2세트", winner: { name: "제리", delta: "+12" }, loser: { name: "아미1", delta: "-12" } },
        { id: 1774684488034, date: "2026. 3. 28. 오후 4:54:48", title: "SDC Cup Open Season 1 결승전 1세트", winner: { name: "제리", delta: "+13" }, loser: { name: "아미1", delta: "-13" } },
        { id: 1774684380521, date: "2026. 3. 28. 오후 4:53:00", title: "SDC Cup Open Season 1 4강 2경기 2세트", winner: { name: "제리", delta: "+11" }, loser: { name: "채선트", delta: "-11" } },
        { id: 1774684378981, date: "2026. 3. 28. 오후 4:52:58", title: "SDC Cup Open Season 1 4강 2경기 1세트", winner: { name: "제리", delta: "+12" }, loser: { name: "채선트", delta: "-12" } },
        { id: 1774684376969, date: "2026. 3. 28. 오후 4:52:56", title: "SDC Cup Open Season 1 4강 1경기 2세트", winner: { name: "아미1", delta: "+9" }, loser: { name: "에뚜랑제", delta: "-9" } },
        { id: 1774684375559, date: "2026. 3. 28. 오후 4:52:55", title: "SDC Cup Open Season 1 4강 1경기 1세트", winner: { name: "아미1", delta: "+9" }, loser: { name: "에뚜랑제", delta: "-9" } },
        { id: 1774684205754, date: "2026. 3. 28. 오후 4:50:05", title: "SDC Cup Open Season 1 8강 4경기 2세트", winner: { name: "제리", delta: "+10" }, loser: { name: "코을", delta: "-10" } },
        { id: 1774684204614, date: "2026. 3. 28. 오후 4:50:04", title: "SDC Cup Open Season 1 8강 4경기 1세트", winner: { name: "제리", delta: "+11" }, loser: { name: "코을", delta: "-11" } },
        { id: 1774684203195, date: "2026. 3. 28. 오후 4:50:03", title: "SDC Cup Open Season 1 8강 3경기 2세트", winner: { name: "채선트", delta: "+1" }, loser: { name: "프로피", delta: "-1" } },
        { id: 1774684201727, date: "2026. 3. 28. 오후 4:50:01", title: "SDC Cup Open Season 1 8강 3경기 1세트", winner: { name: "채선트", delta: "+1" }, loser: { name: "프로피", delta: "-1" } },
        { id: 1774684200663, date: "2026. 3. 28. 오후 4:50:00", title: "SDC Cup Open Season 1 8강 2경기 2세트", winner: { name: "아미1", delta: "+3" }, loser: { name: "전설의마왕9658", delta: "-3" } },
        { id: 1774684199391, date: "2026. 3. 28. 오후 4:49:59", title: "SDC Cup Open Season 1 8강 2경기 1세트", winner: { name: "아미1", delta: "+3" }, loser: { name: "전설의마왕9658", delta: "-3" } },
        { id: 1774684197924, date: "2026. 3. 28. 오후 4:49:57", title: "SDC Cup Open Season 1 8강 1경기 2세트", winner: { name: "에뚜랑제", delta: "+0" }, loser: { name: "양거북", delta: "-0" } },
        { id: 1774684196600, date: "2026. 3. 28. 오후 4:49:56", title: "SDC Cup Open Season 1 8강 1경기 1세트", winner: { name: "에뚜랑제", delta: "+0" }, loser: { name: "양거북", delta: "-0" } },
        { id: 1774683998321, date: "2026. 3. 28. 오후 4:46:38", title: "SDC Cup Open Season 1 16강", winner: { name: "전설의마왕9658", delta: "+11" }, loser: { name: "SmileGyun", delta: "-11" } },
        { id: 1774683996128, date: "2026. 3. 28. 오후 4:46:36", title: "SDC Cup Open Season 1 16강", winner: { name: "프로피", delta: "+19" }, loser: { name: "워모그JaX", delta: "-19" } },
        { id: 1774683994607, date: "2026. 3. 28. 오후 4:46:34", title: "SDC Cup Open Season 1 16강", winner: { name: "제리", delta: "+0" }, loser: { name: "비카Vika", delta: "-0" } },
        { id: 1774683992953, date: "2026. 3. 28. 오후 4:46:32", title: "SDC Cup Open Season 1 16강", winner: { name: "코을", delta: "+2" }, loser: { name: "콩아내", delta: "-2" } },
        { id: 1774683704038, date: "2026. 3. 28. 오후 4:41:44", title: "SDC Cup Season 1 전야제 5세트", winner: { name: "워모그JaX", delta: "+14" }, loser: { name: "프로피", delta: "-14" } },
        { id: 1774683702439, date: "2026. 3. 28. 오후 4:41:42", title: "SDC Cup Season 1 전야제 4세트", winner: { name: "프로피", delta: "+20" }, loser: { name: "워모그JaX", delta: "-20" } },
        { id: 1774683701110, date: "2026. 3. 28. 오후 4:41:41", title: "SDC Cup Season 1 전야제 3세트", winner: { name: "워모그JaX", delta: "+13" }, loser: { name: "프로피", delta: "-13" } },
        { id: 1774683699249, date: "2026. 3. 28. 오후 4:41:39", title: "SDC Cup Season 1 전야제 2세트", winner: { name: "프로피", delta: "+21" }, loser: { name: "워모그JaX", delta: "-21" } },
        { id: 1774683696640, date: "2026. 3. 28. 오후 4:41:36", title: "SDC Cup Season 1 전야제 1세트", winner: { name: "워모그JaX", delta: "+13" }, loser: { name: "프로피", delta: "-13" } }
    ];

    // --- [태그 정의 데이터] ---
    const tagDefinitions = [
        { name: "SDC", color: "#fbbf24", members: ["채선트","코을","에뚜랑제","나브자크","전설의마왕9658","SmileGyun","콩아내","앙오예","워모그JaX","프로피"] },
        { name: "스진동", color: "#60a5fa", members: ["하늘루틴","엄크술사","아모크 ammock82","아모크 amock82","은송아지","라무쓰","망시","찬울 Chanwool","고보미","카루하"] },
        { name: "스악귀", color: "#f87171", members: ["나브자크"] }
    ];

    let players = backupPlayers.map(p => ({ ...p }));
    let matchHistory = [...backupMatches];
    let pendingMatches = [];
    let pendingUsers = [];
    let tags = [];
    let isAdminLoggedIn = sessionStorage.getItem('chzzk_admin') === 'true';
    let searchTerm = '';
    
    let historyCurrentPage = 1;
    let adminHistoryCurrentPage = 1;
    const ITEMS_PER_PAGE = 20;

    function renderPagination(containerId, totalItems, currentPage, onPageChange) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';
        const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
        if (totalPages <= 1) return;

        const maxButtons = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
        let endPage = Math.min(totalPages, startPage + maxButtons - 1);
        if (endPage - startPage + 1 < maxButtons) startPage = Math.max(1, endPage - maxButtons + 1);

        const createBtn = (page, text, active = false, disabled = false) => {
            const btn = document.createElement('button');
            btn.className = `page-btn ${active ? 'active' : ''}`;
            btn.innerHTML = text;
            btn.disabled = disabled;
            if (!disabled) btn.onclick = () => onPageChange(page);
            return btn;
        };

        container.appendChild(createBtn(currentPage - 1, '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>', false, currentPage === 1));

        if (startPage > 1) {
            container.appendChild(createBtn(1, '1'));
            if (startPage > 2) {
                const dots = document.createElement('span');
                dots.className = 'pagination-dots';
                dots.textContent = '...';
                container.appendChild(dots);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            container.appendChild(createBtn(i, i, i === currentPage));
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                const dots = document.createElement('span');
                dots.className = 'pagination-dots';
                dots.textContent = '...';
                container.appendChild(dots);
            }
            container.appendChild(createBtn(totalPages, totalPages));
        }

        container.appendChild(createBtn(currentPage + 1, '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>', false, currentPage === totalPages));
    }
    
    // --- [마이그레이션 로직: 데이터 유실 방지를 위해 개수가 부족하면 무조건 실행] ---
    async function migrateToCollections() {
        const playersCol = collection(db, "Players");
        const matchesCol = collection(db, "Matches");

        // 플레이어 데이터 복구: 컬렉션이 완전히 비어있는 경우에만 백업 데이터로 초기화합니다.
        const playersSnap = await getDocs(playersCol);
        if (playersSnap.empty) {
            console.log("플레이어 데이터 복구 중...");
            for (const p of backupPlayers) {
                const playerRef = doc(db, "Players", p.id);
                await setDoc(playerRef, { ...p, baseRating: p.rating, approvedAt: Date.now() });
            }
        }

        // 매치 기록 복구
        const matchesSnap = await getDocs(matchesCol);
        if (matchesSnap.empty) {
            console.log("매치 기록 복구 중...");
            for (const m of backupMatches) await setDoc(doc(db, "Matches", m.id.toString()), m);
        }

        // 태그 데이터 동기화: 태그 정의의 변경사항을 Firebase에 실시간 반영 (삭제된 태그 제거 포함)
        const existingTagsSnap = await getDocs(collection(db, "Tags"));
        const existingTagNames = existingTagsSnap.docs.map(d => d.id);
        const newTagNames = tagDefinitions.map(t => t.name);

        // 삭제된 태그 제거 (Firebase에는 있지만 정의에는 없는 태그)
        for (const oldName of existingTagNames) {
            if (!newTagNames.includes(oldName)) {
                console.log(`태그 제거: ${oldName}`);
                await deleteDoc(doc(db, "Tags", oldName));
            }
        }

        // 새 태그 정의를 항상 최신 상태로 덮어쓰기
        for (const tag of tagDefinitions) {
            await setDoc(doc(db, "Tags", tag.name), { name: tag.name, color: tag.color, members: tag.members });
        }

        // 시스템 상태 초기화 (없을 경우에만)
        const sysSnap = await getDoc(doc(db, "Settings", "system"));
        if (!sysSnap.exists()) {
            await setDoc(doc(db, "Settings", "system"), { status: "online" });
        }
    }

    await migrateToCollections();

    // --- [실시간 리스너] ---
    onSnapshot(collection(db, "Players"), (snapshot) => {
        players = snapshot.docs.map(doc => ({ ...doc.data() }));
        players.sort((a, b) => b.rating - a.rating);
        updateUI();
        if (isAdminLoggedIn) renderAdminDashboard();
    });

    onSnapshot(collection(db, "Matches"), (snapshot) => {
        matchHistory = snapshot.docs.map(doc => doc.data());
        matchHistory.sort((a, b) => b.id - a.id);
        renderHistory();
        renderStats();
        if (isAdminLoggedIn) renderAdminDashboard();
    });

    onSnapshot(collection(db, "MatchReports"), (snapshot) => {
        pendingMatches = snapshot.docs.map(doc => ({ ...doc.data(), docId: doc.id }));
        if (isAdminLoggedIn) renderAdminDashboard();
    });


    onSnapshot(collection(db, "UserReports"), (snapshot) => {
        pendingUsers = snapshot.docs.map(doc => ({ ...doc.data(), docId: doc.id }));
        if (isAdminLoggedIn) renderAdminDashboard();
    });

    onSnapshot(collection(db, "Tags"), (snapshot) => {
        tags = snapshot.docs.map(doc => doc.data());
        renderRankingTable();
    });

    onSnapshot(doc(db, "Settings", "system"), (snap) => {
        if (snap.exists()) {
            const status = snap.data().status;
            const row = document.getElementById('systemStatusRow');
            const txt = document.getElementById('systemStatusText');
            const select = document.getElementById('adminSystemStatus');
            
            if (status === 'maintenance') {
                row.className = 'record-row status-gray';
                txt.textContent = '점검중';
                if (select) select.value = 'maintenance';
            } else {
                row.className = 'record-row status-green';
                txt.textContent = '정상 운영중';
                if (select) select.value = 'online';
            }
        }
    });

    const K_FACTOR = 32;

    const rankingTableBody = document.getElementById('rankingTableBody');
    const tierTableBody = document.getElementById('tierTableBody');
    const historyContainer = document.getElementById('historyContainer');
    const winnerSelect = document.getElementById('matchWinner');
    const loserSelect = document.getElementById('matchLoser');
    const totalPlayersEl = document.getElementById('totalPlayersCombined');
    const totalMatchesEl = document.getElementById('totalMatchesCombined');
    const topRatingScoreEl = document.getElementById('topRatingScore');
    const topRatingNameEl = document.getElementById('topRatingName');
    const historyCountEl = document.getElementById('historyCount');
    
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        searchTerm = e.target.value.toLowerCase();
        historyCurrentPage = 1;
        adminHistoryCurrentPage = 1;
        renderTierTable();
        renderRankingTable();
        renderHistory();
        if (isAdminLoggedIn) renderAdminDashboard();
    });

    // 서버 데이터를 불러오기 전, 백업 데이터로 즉시 화면을 구성합니다.
    updateUI();

    function initSelects() {
        winnerSelect.innerHTML = '<option value="">선택하세요</option>';
        loserSelect.innerHTML = '<option value="">선택하세요</option>';
        const sorted = [...players].sort((a, b) => a.name.localeCompare(b.name));
        sorted.forEach(p => {
            winnerSelect.innerHTML += `<option value="${p.id}">${p.name} (${p.race})</option>`;
            loserSelect.innerHTML += `<option value="${p.id}">${p.name} (${p.race})</option>`;
        });
    }

    function calculateRanks() {
        players.sort((a, b) => b.rating - a.rating);
        players.forEach((p, index) => p.currentRank = index + 1);
    }

    function renderStats() {
        totalPlayersEl.textContent = players.length;
        totalMatchesEl.textContent = matchHistory.length;
        historyCountEl.textContent = matchHistory.length;
        
        if (players.length > 0) {
            // 레이팅 1등 (이미 정렬되어 있음)
            const ratingWinner = players[0];
            topRatingScoreEl.textContent = Math.round(ratingWinner.rating);
            topRatingNameEl.textContent = ratingWinner.name;

            // 승률 1등 (4판 이하 100% 승률 제외)
            const winrateCandidate = [...players].filter(p => {
                const total = p.win + p.loss;
                const rate = total === 0 ? 0 : p.win / total;
                if (total <= 4 && rate === 1.0) return false;
                return total > 0;
            }).sort((a, b) => {
                const rateA = a.win / (a.win + a.loss);
                const rateB = b.win / (b.win + b.loss);
                if (rateB !== rateA) return rateB - rateA;
                return b.win - a.win; // 승률 같을 시 승리 수 우선
            })[0];

            if (winrateCandidate) {
                document.getElementById('topWinrateName').textContent = winrateCandidate.name;
                document.getElementById('topWinratePct').textContent = getWinrate(winrateCandidate.win, winrateCandidate.loss);
            }

            // 판수 1등
            const activityWinner = [...players].sort((a, b) => (b.win + b.loss) - (a.win + a.loss))[0];
            if (activityWinner) {
                document.getElementById('topMatchesName').textContent = activityWinner.name;
                document.getElementById('topMatchesCount').textContent = `${activityWinner.win + activityWinner.loss}판`;
            }
        }
    }

    function getWinrate(win, loss) {
        const total = win + loss;
        return total === 0 ? '0%' : Math.round((win / total) * 100) + '%';
    }

    function isNewUser(approvedAt) {
        if (!approvedAt) return false;
        return (Date.now() - approvedAt) < (24 * 60 * 60 * 1000);
    }

    function getPlayerTags(playerName) {
        return tags.filter(t => t.members && t.members.includes(playerName));
    }

    function renderRankingTable() {
        calculateRanks();
        rankingTableBody.innerHTML = '';
        players.forEach(p => {
            if (searchTerm && !p.name.toLowerCase().includes(searchTerm)) return;
            const rankClass = p.currentRank <= 3 ? `rank-${p.currentRank}` : '';
            const winrate = getWinrate(p.win, p.loss);
            let rankChangeHtml = '<span class="rank-change change-none">-</span>';
            if (p.prevRank && p.prevRank > p.currentRank) {
                rankChangeHtml = `<span class="rank-change change-up">▲ ${p.prevRank - p.currentRank}</span>`;
            } else if (p.prevRank && p.prevRank < p.currentRank) {
                rankChangeHtml = `<span class="rank-change change-down">▼ ${p.currentRank - p.prevRank}</span>`;
            }

            const newBadge = isNewUser(p.approvedAt) ? '<span class="new-badge">N</span>' : '';
            const playerTags = getPlayerTags(p.name);
            const tagsHtml = playerTags.map(t =>
                `<span class="tag-badge" style="color:${t.color}; border-color:${t.color};">${t.name}</span>`
            ).join('');

            const trOuter = document.createElement('tr');
            trOuter.innerHTML = `
                <td>
                    <div class="rank-td-content">
                        <span class="rank-number ${rankClass}">${p.currentRank}</span> ${rankChangeHtml}
                    </div>
                </td>
                <td class="player-info-cell">
                    <div class="player-info-wrapper">
                        <div class="player-tags">${tagsHtml}</div>
                        <span class="player-name">${newBadge}${p.name}</span>
                    </div>
                </td>
                <td class="race-cell"><span class="race-badge ${p.race.toLowerCase()}">${p.race}</span></td>
                <td class="rating-score">${Math.round(p.rating)}</td>
                <td class="record"><span class="win">${p.win}W</span> / <span class="loss">${p.loss}L</span> <span class="winrate">(${winrate})</span></td>
                <td>
                    <button class="action-btn toggle-details" data-id="${p.id}">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </button>
                </td>`;
            rankingTableBody.appendChild(trOuter);
        });

        document.querySelectorAll('.toggle-details').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                const p = players.find(x => x.id === id);
                if (p) {
                    const playerMatches = matchHistory.filter(m => m.winner.name === p.name || m.loser.name === p.name).slice(0, 5);
                    let matchesHtml = '<div style="grid-column: 1 / -1; margin-top: 0.5rem; padding-top: 1rem; border-top: 1px dashed var(--border-color);"><h4 style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.5rem;">최근 매치 기록</h4>';
                    if (playerMatches.length > 0) {
                        matchesHtml += '<ul style="list-style: none; padding: 0; font-size: 0.85rem;">';
                        playerMatches.forEach(m => {
                            const isWin = m.winner.name === p.name;
                            matchesHtml += `<li style="display: flex; justify-content: space-between; padding: 0.4rem 0;">
                                <span>${m.title} <span style="color: var(--text-main);">vs ${isWin?m.loser.name:m.winner.name}</span></span>
                                <span><span class="${isWin?'win':'loss'}">${isWin?'승리':'패배'}</span> <span style="font-size: 0.8rem;">${isWin?m.winner.delta:m.loser.delta}</span></span>
                            </li>`;
                        });
                        matchesHtml += '</ul></div>';
                    } else matchesHtml += '<div style="color: var(--text-muted); font-size: 0.85rem; text-align: center; padding: 1rem 0;">기록 없음</div></div>';

                    document.getElementById('detailModalTitle').textContent = `${p.name} 상세정보`;
                    document.getElementById('detailModalBody').innerHTML = `
                        <div class="detail-stat"><span class="detail-stat-label">종족</span><span class="detail-stat-val"><span class="race-badge ${p.race.toLowerCase()}">${p.race}</span></span></div>
                        <div class="detail-stat"><span class="detail-stat-label">티어</span><span class="detail-stat-val tier-${getTier(p.rating).toLowerCase()}">${getTier(p.rating)} Tier</span></div>
                        <div class="detail-stat"><span class="detail-stat-label">레이팅</span><span class="detail-stat-val">${Math.round(p.rating)}</span></div>
                        <div class="detail-stat"><span class="detail-stat-label">전적</span><span class="detail-stat-val">${p.win}승 ${p.loss}패</span></div>
                        ${matchesHtml}`;
                    document.getElementById('userDetailsModal').classList.add('active');
                }
            });
        });
    }

    function getTier(rating) {
        if (rating >= 2140) return 'S';
        if (rating >= 2010) return 'A';
        if (rating >= 1750) return 'B';
        if (rating >= 1600) return 'C';
        if (rating >= 1300) return 'D';
        return 'E';
    }

    function renderTierTable() {
        tierTableBody.innerHTML = '';
        const tiers = { S: [], A: [], B: [], C: [], D: [], E: [] };
        players.forEach(p => tiers[getTier(p.rating)].push(p));
        Object.keys(tiers).forEach(t => {
            const tr = document.createElement('tr');
            let plHtml = '<div class="tier-row-content">';
            tiers[t].forEach(p => {
                const isH = searchTerm && p.name.toLowerCase().includes(searchTerm) ? 'highlight' : '';
                plHtml += `<div class="tier-player-item ${isH}">${isNewUser(p.approvedAt)?'<span class="new-badge tier-badge">N</span>':''}${p.name} (${p.race.charAt(0)})</div>`;
            });
            plHtml += '</div>';
            tr.innerHTML = `<td class="tier-${t.toLowerCase()}">${t}</td><td colspan="5">${plHtml}</td>`;
            tierTableBody.appendChild(tr);
        });
    }

    async function applyMatchResult(title, winnerId, loserId, winnerNameFallback, loserNameFallback) {
        try {
            await runTransaction(db, async (transaction) => {
                // 1. 최신 유저 데이터 실시간 조회 (데이터 정합성 보장)
                let winnerRef = doc(db, "Players", winnerId);
                let winnerDoc = await transaction.get(winnerRef);
                
                // ID로 찾지 못한 경우 이름으로 탐색 시도
                if (!winnerDoc.exists() && winnerNameFallback) {
                    const p = players.find(p => p.name === winnerNameFallback);
                    if (p) {
                        winnerRef = doc(db, "Players", p.id);
                        winnerDoc = await transaction.get(winnerRef);
                    }
                }

                let loserRef = doc(db, "Players", loserId);
                let loserDoc = await transaction.get(loserRef);
                if (!loserDoc.exists() && loserNameFallback) {
                    const p = players.find(p => p.name === loserNameFallback);
                    if (p) {
                        loserRef = doc(db, "Players", p.id);
                        loserDoc = await transaction.get(loserRef);
                    }
                }

                if (!winnerDoc.exists() || !loserDoc.exists()) {
                    throw "선수 데이터를 찾을 수 없어 매치를 승인할 수 없습니다.";
                }

                const winnerData = winnerDoc.data();
                const loserData = loserDoc.data();

                // 2. 새로운 레이팅 및 변동치(delta) 계산
                const p1 = 1 / (1 + Math.pow(10, (loserData.rating - winnerData.rating) / 400));
                const delta = Math.round(K_FACTOR * (1 - p1));

                // 3. 선수 전적 및 레이팅 원자적 업데이트
                transaction.update(winnerRef, {
                    rating: increment(delta),
                    win: increment(1)
                });
                transaction.update(loserRef, {
                    rating: increment(-delta),
                    loss: increment(1)
                });

                // 4. 매치 결과 공식 기록 저장
                const mid = Date.now().toString();
                const matchRef = doc(db, "Matches", mid);
                transaction.set(matchRef, {
                    id: parseInt(mid),
                    title: title || '친선전',
                    date: new Date().toLocaleString('ko-KR'),
                    winner: { name: winnerData.name, delta: `+${delta}` },
                    loser: { name: loserData.name, delta: `-${delta}` }
                });
            });
            return true;
        } catch (e) {
            console.error("매치 승인 트랜잭션 실패:", e);
            alert("매치 승인 중 오류가 발생했습니다: " + e);
            return false;
        }
    }

    function renderHistory() {
        let fh = matchHistory;
        if (searchTerm) fh = matchHistory.filter(m => m.winner.name.toLowerCase().includes(searchTerm) || m.loser.name.toLowerCase().includes(searchTerm) || m.title.toLowerCase().includes(searchTerm));
        if (fh.length === 0) { historyContainer.innerHTML = '기록 없음'; document.getElementById('historyPagination').innerHTML = ''; return; }
        
        const totalItems = fh.length;
        const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
        if (historyCurrentPage > totalPages) historyCurrentPage = totalPages || 1;

        const pagedData = fh.slice((historyCurrentPage - 1) * ITEMS_PER_PAGE, historyCurrentPage * ITEMS_PER_PAGE);

        historyContainer.innerHTML = '<div class="history-list">' + pagedData.map(m => `
            <div class="history-item">
                <div class="match-info"><h4>${m.title}</h4><div class="match-time">${m.date}</div></div>
                <div class="match-result">
                    <div class="player-outcome player-winner">${m.winner.name} <span class="rating-delta">${m.winner.delta}</span></div>
                    <div class="vs">VS</div>
                    <div class="player-outcome player-loser">${m.loser.name} <span class="rating-delta">${m.loser.delta}</span></div>
                </div>
            </div>`).join('') + '</div>';

        renderPagination('historyPagination', totalItems, historyCurrentPage, (page) => {
            historyCurrentPage = page;
            renderHistory();
            window.scrollTo({ top: historyContainer.offsetTop - 100, behavior: 'smooth' });
        });
    }

    function updateUI() { calculateRanks(); renderStats(); renderRankingTable(); renderTierTable(); renderHistory(); initSelects(); }

    // Tabs & Modals
    const navBtns = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    navBtns.forEach(btn => btn.addEventListener('click', () => {
        navBtns.forEach(b => b.classList.remove('active')); tabContents.forEach(t => t.classList.remove('active'));
        btn.classList.add('active'); document.getElementById(`tab-${btn.dataset.tab}`).classList.add('active');
        if(btn.dataset.tab === 'admin') renderAdminDashboard();
    }));

    document.getElementById('reportBtn').onclick = () => document.getElementById('reportModal').classList.add('active');
    document.querySelectorAll('.close-btn').forEach(b => b.onclick = () => b.closest('.modal').classList.remove('active'));

    document.getElementById('submitMatchBtn').onclick = async () => {
        const title = document.getElementById('matchTitle').value, w = winnerSelect.value, l = loserSelect.value;
        if (!w || !l || w === l) { alert('확인'); return; }
        const rid = Date.now().toString();
        await setDoc(doc(db, "MatchReports", rid), { id: rid, title: title || '친선전', winnerId: w, loserId: l, winnerName: winnerSelect.options[winnerSelect.selectedIndex].text.split(' (')[0], loserName: loserSelect.options[loserSelect.selectedIndex].text.split(' (')[0], date: new Date().toLocaleString('ko-KR'), status: 'pending' });
        document.getElementById('matchTitle').value = ''; winnerSelect.value = ''; loserSelect.value = '';
        document.getElementById('reportModal').classList.remove('active');
        alert('제보 완료');
    };

    document.getElementById('reportUserBtn').onclick = () => document.getElementById('reportUserModal').classList.add('active');
    document.getElementById('submitUserBtn').onclick = async () => {
        const n = document.getElementById('newUserName').value.trim(), r = document.getElementById('newUserRace').value, rt = parseInt(document.getElementById('newUserRating').value) || 1200, rs = document.getElementById('newUserRecord').value.trim();
        if(!n || !r) { alert('이름 종족 필수'); return; }
        let wins = 0, losses = 0;
        const wm = rs.match(/(\d+)승/), lm = rs.match(/(\d+)패/);
        if(wm) wins = parseInt(wm[1]); if(lm) losses = parseInt(lm[1]);
        const rid = Date.now().toString();
        await setDoc(doc(db, "UserReports", rid), { id: rid, name: n, race: r, rating: rt, win: wins, loss: losses, recordStr: rs, status: 'pending' });
        document.getElementById('newUserName').value = ''; document.getElementById('reportUserModal').classList.remove('active'); alert('제보 완료');
    };

    document.getElementById('adminLoginBtn').onclick = () => document.getElementById('adminAuthModal').classList.add('active');
    document.getElementById('submitAdminLoginBtn').onclick = () => {
        const id = document.getElementById('adminId').value, pw = document.getElementById('adminPw').value;
        if (btoa(id) === 'c2RjbWFuYWdlcg==' && btoa(pw) === 'c3RhcmRldmlsMUA=') {
            isAdminLoggedIn = true; sessionStorage.setItem('chzzk_admin', 'true');
            document.getElementById('adminAuthModal').classList.remove('active'); document.getElementById('adminTabBtn').style.display = 'inline-block'; document.getElementById('adminLoginBtn').style.display = 'none';
            document.getElementById('adminTabBtn').click();
        } else alert('인증 실패');
    };

    document.getElementById('saveSystemStatusBtn').onclick = async () => {
        const val = document.getElementById('adminSystemStatus').value;
        try {
            await setDoc(doc(db, "Settings", "system"), { status: val });
            alert('시스템 상태가 변경되었습니다.');
        } catch (e) {
            console.error(e);
            alert('변경 중 오류 발생');
        }
    };

    function renderAdminDashboard() {
        if(!isAdminLoggedIn) return;
        document.getElementById('pendingMatchesContainer').innerHTML = pendingMatches.map(m => `
            <div class="admin-item">
                <div class="admin-item-info"><div class="admin-item-title">${m.title}</div><div>승: ${m.winnerName} / 패: ${m.loserName}</div><div style="font-size:0.8rem; opacity:0.6;">${m.date}</div></div>
                <div class="admin-actions"><button class="admin-btn approve admin-match-approve" data-id="${m.docId}">승인</button><button class="admin-btn reject admin-match-reject" data-id="${m.docId}">거절</button></div>
            </div>`).join('') || '대기열 없음';
        document.getElementById('pendingUsersContainer').innerHTML = pendingUsers.map(u => `
            <div class="admin-item">
                <div class="admin-item-info"><div class="admin-item-title">${u.name} (${u.race})</div><div>레이팅: ${u.rating} / 전적: ${u.win}승 ${u.loss}패</div></div>
                <div class="admin-actions"><button class="admin-btn approve admin-user-approve" data-id="${u.docId}">승인</button><button class="admin-btn reject admin-user-reject" data-id="${u.docId}">거절</button></div>
            </div>`).join('') || '대기열 없음';

        document.getElementById('adminRankingContainer').innerHTML = players.map(p => `
            <div class="admin-item" style="flex-direction:column; align-items:start;"><div class="admin-edit-row">
                <input type="text" class="admin-edit-input p-name" data-id="${p.id}" value="${p.name}" style="width:100px;">
                <select class="admin-edit-input p-race" data-id="${p.id}"><option value="Zerg" ${p.race==='Zerg'?'selected':''}>Z</option><option value="Protoss" ${p.race==='Protoss'?'selected':''}>P</option><option value="Terran" ${p.race==='Terran'?'selected':''}>T</option><option value="Random" ${p.race==='Random'?'selected':''}>R</option></select>
                <input type="number" class="admin-edit-input p-rating" data-id="${p.id}" value="${Math.round(p.rating)}" style="width:80px;">
                <input type="number" class="admin-edit-input p-win" data-id="${p.id}" value="${p.win}" style="width:60px;">
                <input type="number" class="admin-edit-input p-loss" data-id="${p.id}" value="${p.loss}" style="width:60px;">
                <button class="admin-btn approve admin-save-player" data-id="${p.id}">저장</button><button class="admin-btn delete admin-delete-player" data-id="${p.id}">삭제</button>
            </div></div>`).join('');

        const totalHistoryItems = matchHistory.length;
        const totalHistoryPages = Math.ceil(totalHistoryItems / ITEMS_PER_PAGE);
        if (adminHistoryCurrentPage > totalHistoryPages) adminHistoryCurrentPage = totalHistoryPages || 1;
        
        const pagedAdminHistory = matchHistory.slice((adminHistoryCurrentPage - 1) * ITEMS_PER_PAGE, adminHistoryCurrentPage * ITEMS_PER_PAGE);

        document.getElementById('adminHistoryContainer').innerHTML = pagedAdminHistory.map(m => `
            <div class="admin-item" style="flex-direction:column; align-items:start;"><div class="admin-edit-row">
                <input type="text" class="admin-edit-input m-title" data-id="${m.id}" value="${m.title}" style="width:300px;">
                <span style="font-size:0.8rem; margin:0 5px; color:var(--text-muted);">${m.winner.name} vs ${m.loser.name}</span>
                <button class="admin-btn approve admin-save-match" data-id="${m.id}">저장</button><button class="admin-btn delete admin-delete-match" data-id="${m.id}">삭제</button>
            </div></div>`).join('') || '기록 없음';

        renderPagination('adminHistoryPagination', totalHistoryItems, adminHistoryCurrentPage, (page) => {
            adminHistoryCurrentPage = page;
            renderAdminDashboard();
        });
    }

    document.getElementById('tab-admin').onclick = async (e) => {
        if (!isAdminLoggedIn) return;
        const btn = e.target.closest('.admin-btn');
        if (!btn || !btn.dataset.id) return;
        const id = btn.dataset.id;

        if (btn.classList.contains('admin-match-approve')) {
            const m = pendingMatches.find(x => x.docId === id);
            if(m) { 
                await applyMatchResult(m.title, m.winnerId, m.loserId, m.winnerName, m.loserName); 
                await deleteDoc(doc(db, "MatchReports", id)); 
                alert('승인 완료 및 데이터가 즉시 반영되었습니다.'); 
            }
        }
        if (btn.classList.contains('admin-match-reject')) await deleteDoc(doc(db, "MatchReports", id));
        if (btn.classList.contains('admin-user-approve')) {
            const u = pendingUsers.find(x => x.docId === id);
            if(u) {
                const nid = Date.now().toString();
                await setDoc(doc(db, "Players", nid), { id: nid, name: u.name, race: u.race, rating: u.rating, win: u.win, loss: u.loss, prevRank: players.length+1, approvedAt: Date.now(), baseRating: u.rating });
                await deleteDoc(doc(db, "UserReports", id));
                alert('승인 완료');
            }
        }
        if (btn.classList.contains('admin-user-reject')) await deleteDoc(doc(db, "UserReports", id));
        if (btn.classList.contains('admin-save-player')) {
            const row = btn.closest('.admin-edit-row');
            const newName = row.querySelector('.p-name').value;
            const newRace = row.querySelector('.p-race').value;
            const newRating = parseInt(row.querySelector('.p-rating').value);
            const newWin = parseInt(row.querySelector('.p-win').value);
            const newLoss = parseInt(row.querySelector('.p-loss').value);

            const playerRef = doc(db, "Players", id);
            const playerSnap = await getDoc(playerRef);
            const oldName = playerSnap.exists() ? playerSnap.data().name : '';

            // 1. 플레이어 데이터 업데이트
            await updateDoc(playerRef, { name: newName, race: newRace, rating: newRating, win: newWin, loss: newLoss });

            // 2. 이름이 변경된 경우 모든 매치 기록의 이름도 동기화
            if (oldName && oldName !== newName) {
                console.log(`이름 변경 감지: ${oldName} -> ${newName}. 관련 매치 기록 업데이트 중...`);
                const matchesSnap = await getDocs(collection(db, "Matches"));
                const batch = writeBatch(db);
                let updateCount = 0;

                matchesSnap.forEach(mDoc => {
                    const mData = mDoc.data();
                    let needsUpdate = false;
                    const winner = { ...mData.winner };
                    const loser = { ...mData.loser };

                    if (winner.name === oldName) { winner.name = newName; needsUpdate = true; }
                    if (loser.name === oldName) { loser.name = newName; needsUpdate = true; }

                    if (needsUpdate) {
                        batch.update(mDoc.ref, { winner, loser });
                        updateCount++;
                    }
                });

                if (updateCount > 0) {
                    await batch.commit();
                    console.log(`${updateCount}개의 매치 기록이 업데이트되었습니다.`);
                }
            }
            alert('저장 완료 (매치 기록 동기화 포함)');
        }
        if (btn.classList.contains('admin-delete-player')) { if(confirm('삭제?')) await deleteDoc(doc(db, "Players", id)); }
        if (btn.classList.contains('admin-save-match')) {
            const row = btn.closest('.admin-edit-row');
            await updateDoc(doc(db, "Matches", id), { title: row.querySelector('.m-title').value });
            alert('저장 완료');
        }
        if (btn.classList.contains('admin-delete-match')) {
            if(confirm('이 경기를 삭제하면 선수의 전적과 레이팅도 복구됩니다. 삭제하시겠습니까?')) {
                const m = matchHistory.find(x => x.id.toString() === id);
                if (m) {
                    const winPlayer = players.find(p => p.name === m.winner.name);
                    const losePlayer = players.find(p => p.name === m.loser.name);
                    
                    if (winPlayer && losePlayer) {
                        const delta = parseInt(m.winner.delta.replace('+', '').replace('-', '')) || 0;
                        await updateDoc(doc(db, "Players", winPlayer.id), { 
                            rating: increment(-delta), 
                            win: increment(-1) 
                        });
                        await updateDoc(doc(db, "Players", losePlayer.id), { 
                            rating: increment(delta), 
                            loss: increment(-1) 
                        });
                    }
                }
                await deleteDoc(doc(db, "Matches", id));
                alert('경기 기록 및 선수 데이터가 복구되었습니다.');
            }
        }
    };

    document.querySelectorAll('.admin-grid-card').forEach(card => card.addEventListener('click', () => {
        document.querySelectorAll('.admin-grid-card').forEach(c => c.classList.remove('active'));
        document.querySelectorAll('.admin-content-section').forEach(s => s.style.display = 'none');
        card.classList.add('active'); document.getElementById(card.dataset.target).style.display = 'block';
    }));

    // 모달 닫기 버튼 버그 수정
    document.getElementById('closeDetailModalBtn').onclick = () => document.getElementById('userDetailsModal').classList.remove('active');
});
