import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import {
    initializeFirestore, persistentLocalCache, persistentMultipleTabManager, doc, setDoc, getDoc, updateDoc, deleteDoc,
    collection, addDoc, onSnapshot, query, orderBy, getDocs, limit, increment, runTransaction, writeBatch, where, or
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
const db = initializeFirestore(app, {
    localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
});

document.addEventListener('DOMContentLoaded', async () => {
    // --- [사용자 백업 데이터] ---
    const backupPlayers = [
        { id: "1", name: "제리123", race: "Zerg", rating: 2480, win: 8, loss: 0, prevRank: 1 },
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
        { id: "15", name: "아모크 amock82", race: "Zerg", rating: 1838, win: 0, loss: 0, prevRank: 15 },
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
        { name: "SDC", color: "#ff4500", members: ["채선트", "코을", "에뚜랑제", "나브자크", "전설의마왕9658", "SmileGyun", "콩아내", "앙오예", "워모그JaX", "프로피"] },
        { name: "스진동", color: "#60a5fa", members: ["하늘루틴", "엄크술사", "아모크 amock82", "은송아지", "라무쓰", "망시", "찬울 Chanwool", "고보미", "카루하"] },
        { name: "스악귀", color: "#ff0000", members: ["나브자크"] },
        { name: "치즈캠", color: "#faea48", members: [] },
        { name: "뉴스동", color: "#34d399", members: [] }
    ];

    let players = backupPlayers.map(p => ({ ...p }));
    let matchHistory = [...backupMatches];
    let pendingMatches = [];
    let pendingUsers = [];
    let tags = [];
    let isAdminLoggedIn = sessionStorage.getItem('chzzk_admin') === 'true';
    let searchTerm = '';
    let notices = [];
    let inquiries = [];
    let currentEditNoticeId = null;

    let historyCurrentPage = 1;
    let adminHistoryCurrentPage = 1;
    let totalMatchesCount = backupMatches.length; // 초기값
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

    // --- [실시간 리스너] ---
    onSnapshot(collection(db, "Players"), (snapshot) => {
        players = snapshot.docs.map(doc => ({ ...doc.data() }));
        players.sort((a, b) => b.rating - a.rating);
        updateUI();
        if (isAdminLoggedIn) renderAdminDashboard();
    });

    onSnapshot(query(collection(db, "Matches"), orderBy("id", "desc"), limit(40)), (snapshot) => {
        matchHistory = snapshot.docs.map(doc => doc.data());
        // 실시간 리스너는 이미 정렬된 데이터를 주지만, 혹시 모를 로컬 정렬
        matchHistory.sort((a, b) => b.id - a.id);
        renderHistory();
        renderStats();
        if (isAdminLoggedIn) renderAdminDashboard();
    });

    onSnapshot(doc(db, "Settings", "stats"), (snap) => {
        if (snap.exists()) {
            totalMatchesCount = snap.data().totalMatches || 0;
            renderStats();
        } else {
            // 통계 문서가 없으면 백업 데이터의 개수를 기본으로 사용 (읽기 할당량 절약)
            totalMatchesCount = backupMatches.length;
            renderStats();
        }
    });

    let adminListenersInitialized = false;
    function initAdminListeners() {
        if (adminListenersInitialized) return;
        adminListenersInitialized = true;

        onSnapshot(collection(db, "MatchReports"), (snapshot) => {
            pendingMatches = snapshot.docs.map(doc => ({ ...doc.data(), docId: doc.id }));
            if (isAdminLoggedIn) renderAdminDashboard();
        });

        onSnapshot(collection(db, "UserReports"), (snapshot) => {
            pendingUsers = snapshot.docs.map(doc => ({ ...doc.data(), docId: doc.id }));
            if (isAdminLoggedIn) renderAdminDashboard();
        });

        onSnapshot(query(collection(db, "Inquiries"), orderBy("date", "desc")), (snapshot) => {
            inquiries = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            if (isAdminLoggedIn) renderAdminDashboard();
        });
    }

    if (isAdminLoggedIn) {
        initAdminListeners();
    }

    onSnapshot(collection(db, "Tags"), (snapshot) => {
        const allTagsDocs = snapshot.docs;
        tags = allTagsDocs.map(doc => doc.data());
        
        // --- 중복 태그 정리 로직 ---
        const seenNames = new Set();
        allTagsDocs.forEach(tDoc => {
            const data = tDoc.data();
            if (seenNames.has(data.name)) {
                // 이미 동일한 이름의 태그가 있으면 이 중복 문서는 삭제
                deleteDoc(tDoc.ref);
            } else {
                seenNames.add(data.name);
            }
        });

        // 필수 태그들이 Firestore에 없는 경우 자동 생성
        const requiredTags = ["SDC", "뉴스동", "치즈캠"];
        requiredTags.forEach(tagName => {
            if (!tags.some(t => t.name === tagName)) {
                const def = tagDefinitions.find(d => d.name === tagName) || { name: tagName, color: "#94a3b8", members: [] };
                // 문서 ID는 소문자로 통일하여 중복 방지
                const docId = tagName.toLowerCase();
                setDoc(doc(db, "Tags", docId), { name: def.name, color: def.color, members: def.members || [] });
            }
        });

        renderRankingTable();
        if (isAdminLoggedIn) renderAdminDashboard();
    });

    onSnapshot(query(collection(db, "Notices"), orderBy("date", "desc"), limit(3)), (snapshot) => {
        notices = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        renderNotices();
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
        totalMatchesEl.textContent = totalMatchesCount;
        historyCountEl.textContent = totalMatchesCount;

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
                        <span class="player-name">${p.name}</span>
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
                                <span>${m.title} <span style="color: var(--text-main);">vs ${isWin ? m.loser.name : m.winner.name}</span></span>
                                <span><span class="${isWin ? 'win' : 'loss'}">${isWin ? '승리' : '패배'}</span> <span style="font-size: 0.8rem;">${isWin ? m.winner.delta : m.loser.delta}</span></span>
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

    function renderNotices() {
        // Main UI
        const mainList = document.getElementById('mainNoticeList');
        const adminList = document.getElementById('adminNoticeContainer');
        const allList = document.getElementById('allNoticesList');

        const createNoticeHtml = (n) => `
            <div class="notice-item" data-id="${n.id}">
                <div class="notice-top">
                    <span class="notice-tag">${n.category}</span>
                    <span class="notice-subject">${n.title}</span>
                </div>
                <div class="notice-date">${new Date(n.date).toLocaleDateString()}</div>
            </div>`;

        if (mainList) mainList.innerHTML = notices.map(createNoticeHtml).join('');
        if (adminList) adminList.innerHTML = notices.map(n => `
            <div class="admin-item" style="cursor:pointer;" onclick="editNotice('${n.id}')">
                <div class="admin-item-info"><strong>[${n.category}] ${n.title}</strong><div style="font-size:0.8rem; opacity:0.6;">${new Date(n.date).toLocaleString()}</div></div>
                <div class="admin-actions"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></div>
            </div>`).join('') || '작성된 공지 없음';

        if (allList) allList.innerHTML = notices.map(createNoticeHtml).join('');

        // Attach click listeners for main and all list
        document.querySelectorAll('.notice-item').forEach(item => {
            item.onclick = () => {
                const n = notices.find(x => x.id === item.dataset.id);
                if (n) {
                    document.getElementById('viewNoticeTitle').textContent = n.title;
                    document.getElementById('viewNoticeTag').textContent = n.category;
                    document.getElementById('viewNoticeDate').textContent = new Date(n.date).toLocaleDateString();
                    document.getElementById('viewNoticeContent').textContent = n.content;
                    document.getElementById('noticeViewModal').classList.add('active');
                }
            };
        });
    }

    window.editNotice = (id) => {
        const n = notices.find(x => x.id === id);
        if (n) {
            currentEditNoticeId = n.id;
            document.getElementById('noticeModalTitle').textContent = '공지 수정';
            document.getElementById('noticeCategory').value = n.category;
            document.getElementById('noticeTitle').value = n.title;
            document.getElementById('noticeContent').value = n.content;
            document.getElementById('noticeAdminActions').style.display = 'flex';
            document.getElementById('saveNoticeBtn').style.display = 'none';
            document.getElementById('noticeWriteModal').classList.add('active');
        }
    };

    function renderTierTable() {
        tierTableBody.innerHTML = '';
        const tiers = { S: [], A: [], B: [], C: [], D: [], E: [] };
        players.forEach(p => tiers[getTier(p.rating)].push(p));
        Object.keys(tiers).forEach(t => {
            const tr = document.createElement('tr');
            let plHtml = '<div class="tier-row-content">';
            tiers[t].forEach(p => {
                const isH = searchTerm && p.name.toLowerCase().includes(searchTerm) ? 'highlight' : '';
                plHtml += `<div class="tier-player-item ${isH}">${p.name} (${p.race.charAt(0)})</div>`;
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

                // 5. 전체 매치 카운터 업데이트
                const statsRef = doc(db, "Settings", "stats");
                transaction.update(statsRef, {
                    totalMatches: increment(1)
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
        if (btn.dataset.tab === 'admin') renderAdminDashboard();
    }));

    document.getElementById('reportBtn').onclick = () => document.getElementById('reportModal').classList.add('active');
    document.getElementById('inquiryBtn').onclick = () => document.getElementById('inquiryModal').classList.add('active');
    document.querySelectorAll('.close-btn').forEach(b => b.onclick = () => b.closest('.modal').classList.remove('active'));

    document.getElementById('submitInquiryBtn').onclick = async () => {
        const author = document.getElementById('inquiryAuthor').value.trim() || '익명';
        const msg = document.getElementById('inquiryMessage').value.trim();
        if (!msg) return alert('문의 내용을 입력해 주세요.');

        await addDoc(collection(db, "Inquiries"), { author, message: msg, date: Date.now() });
        document.getElementById('inquiryAuthor').value = '';
        document.getElementById('inquiryMessage').value = '';
        document.getElementById('inquiryModal').classList.remove('active');
        alert('문의가 성공적으로 접수되었습니다. 감사합니다.');
    };

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
        if (!n || !r) { alert('이름 종족 필수'); return; }
        let wins = 0, losses = 0;
        const wm = rs.match(/(\d+)승/), lm = rs.match(/(\d+)패/);
        if (wm) wins = parseInt(wm[1]); if (lm) losses = parseInt(lm[1]);
        const rid = Date.now().toString();
        await setDoc(doc(db, "UserReports", rid), { id: rid, name: n, race: r, rating: rt, win: wins, loss: losses, recordStr: rs, status: 'pending' });
        document.getElementById('newUserName').value = ''; document.getElementById('reportUserModal').classList.remove('active'); alert('제보 완료');
    };

    document.getElementById('adminLoginBtn').onclick = () => document.getElementById('adminAuthModal').classList.add('active');
    document.getElementById('submitAdminLoginBtn').onclick = () => {
        const id = document.getElementById('adminId').value, pw = document.getElementById('adminPw').value;
        if (btoa(id) === 'c2RjbWFuYWdlcg==' && btoa(pw) === 'c3RhcmRldmlsMUA=') {
            isAdminLoggedIn = true; sessionStorage.setItem('chzzk_admin', 'true');
            initAdminListeners();
            document.getElementById('adminAuthModal').classList.remove('active'); document.getElementById('adminTabBtn').style.display = 'inline-block'; document.getElementById('adminLoginBtn').style.display = 'none';
            document.getElementById('adminTabBtn').click();
        } else alert('인증 실패');
    };

    document.getElementById('addNoticeBtn').onclick = () => {
        currentEditNoticeId = null;
        document.getElementById('noticeModalTitle').textContent = '공지 작성';
        document.getElementById('noticeCategory').value = '공지';
        document.getElementById('noticeTitle').value = '';
        document.getElementById('noticeContent').value = '';
        document.getElementById('noticeAdminActions').style.display = 'none';
        document.getElementById('saveNoticeBtn').style.display = 'block';
        document.getElementById('noticeWriteModal').classList.add('active');
    };

    document.getElementById('saveNoticeBtn').onclick = async () => {
        const cat = document.getElementById('noticeCategory').value;
        const title = document.getElementById('noticeTitle').value.trim();
        const content = document.getElementById('noticeContent').value.trim();
        if (!title || !content) return alert('제목과 내용을 입력해 주세요.');

        await addDoc(collection(db, "Notices"), { category: cat, title, content, date: Date.now() });
        document.getElementById('noticeWriteModal').classList.remove('active');
        alert('공지가 등록되었습니다.');
    };

    document.getElementById('updateNoticeBtn').onclick = async () => {
        if (!currentEditNoticeId) return;
        const cat = document.getElementById('noticeCategory').value;
        const title = document.getElementById('noticeTitle').value.trim();
        const content = document.getElementById('noticeContent').value.trim();

        await updateDoc(doc(db, "Notices", currentEditNoticeId), { category: cat, title, content });
        document.getElementById('noticeWriteModal').classList.remove('active');
        alert('공지가 수정되었습니다.');
    };

    document.getElementById('deleteNoticeBtn').onclick = async () => {
        if (!currentEditNoticeId || !confirm('공지를 삭제하시겠습니까?')) return;
        await deleteDoc(doc(db, "Notices", currentEditNoticeId));
        document.getElementById('noticeWriteModal').classList.remove('active');
        alert('공지가 삭제되었습니다.');
    };

    const viewAllNoticesBtn = document.getElementById('viewAllNoticesBtn');
    if (viewAllNoticesBtn) {
        viewAllNoticesBtn.onclick = () => {
            renderNotices();
            document.getElementById('allNoticesModal').classList.add('active');
        };
    }

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

    document.getElementById('resetRankChangeBtn').onclick = async () => {
        if (!confirm('현재 순위를 기준으로 등락률을 초기화하시겠습니까?\n모든 플레이어의 등락 표시가 "-"로 변경됩니다.')) return;
        try {
            calculateRanks();
            const batch = writeBatch(db);
            players.forEach(p => {
                const playerRef = doc(db, "Players", p.id);
                batch.update(playerRef, { prevRank: p.currentRank });
            });
            await batch.commit();
            alert('등락률이 초기화되었습니다. 현재 순위가 새로운 기준점으로 설정되었습니다.');
        } catch (e) {
            console.error('등락률 초기화 오류:', e);
            alert('초기화 중 오류가 발생했습니다.');
        }
    };



    function renderAdminDashboard() {
        if (!isAdminLoggedIn) return;
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

        document.getElementById('adminRankingContainer').innerHTML = players.map(p => {
            const playerTags = getPlayerTags(p.name);
            const tag1 = playerTags[0]?.name || '';
            const tag2 = playerTags[1]?.name || '';

            const tagSelectHtml = (idx, selectedVal) => `<select class="admin-edit-input p-tag-${idx}" data-id="${p.id}" style="width:80px;">
                <option value="">태그 없음</option>
                ${tags.map(t => `<option value="${t.name}" ${selectedVal === t.name ? 'selected' : ''}>${t.name}</option>`).join('')}
            </select>`;

            return `
            <div class="admin-item" style="flex-direction:column; align-items:start;"><div class="admin-edit-row">
                <input type="text" class="admin-edit-input p-name" data-id="${p.id}" value="${p.name}" style="width:100px;">
                <select class="admin-edit-input p-race" data-id="${p.id}"><option value="Zerg" ${p.race === 'Zerg' ? 'selected' : ''}>Z</option><option value="Protoss" ${p.race === 'Protoss' ? 'selected' : ''}>P</option><option value="Terran" ${p.race === 'Terran' ? 'selected' : ''}>T</option><option value="Random" ${p.race === 'Random' ? 'selected' : ''}>R</option></select>
                <input type="number" class="admin-edit-input p-rating" data-id="${p.id}" value="${Math.round(p.rating)}" style="width:80px;">
                <input type="number" class="admin-edit-input p-win" data-id="${p.id}" value="${p.win}" style="width:60px;">
                <input type="number" class="admin-edit-input p-loss" data-id="${p.id}" value="${p.loss}" style="width:60px;">
                <div style="display:flex; gap:2px;">${tagSelectHtml(1, tag1)}${tagSelectHtml(2, tag2)}</div>
                <button class="admin-btn approve admin-sync-player" data-id="${p.id}" title="전적 복구"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 4v6h-6M1 20v-6h6"></path><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg></button>
                <button class="admin-btn approve admin-save-player" data-id="${p.id}">저장</button><button class="admin-btn delete admin-delete-player" data-id="${p.id}">삭제</button>
            </div></div>`;
        }).join('');

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

        const inqContainer = document.getElementById('adminInquiriesContainer');
        if (inqContainer) {
            inqContainer.innerHTML = inquiries.map(iq => `
                <div class="admin-item" style="flex-direction:column; align-items:start;">
                    <div style="width: 100%; display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                        <strong style="color:var(--text-main);">${iq.author}</strong>
                        <span style="font-size:0.8rem; opacity:0.6;">${new Date(iq.date).toLocaleString()}</span>
                    </div>
                    <div style="background: rgba(0,0,0,0.2); padding: 1rem; border-radius: 0.5rem; width: 100%; margin-bottom: 0.5rem; white-space: pre-wrap; color: rgba(255,255,255,0.8);">${iq.message}</div>
                    <button class="admin-btn delete admin-delete-inquiry" data-id="${iq.id}" style="align-self: flex-end;">삭제</button>
                </div>
            `).join('') || '접수된 문의가 없습니다.';
        }

        // 태그 데이터 추출용 코드 생성
        const tagExportArea = document.getElementById('tagExportArea');
        const playerExportArea = document.getElementById('playerExportArea');
        
        if (tagExportArea) {
            const codeString = "const tagDefinitions = [\n" + 
                tags.map(t => `    { name: "${t.name}", color: "${t.color}", members: ${JSON.stringify(t.members || [])} }`).join(",\n") + 
                "\n];";
            tagExportArea.value = codeString;
        }

        if (playerExportArea) {
            // 레이팅 기준으로 소팅하여 추출
            const sorted = [...players].sort((a, b) => b.rating - a.rating);
            const codeString = "const backupPlayers = [\n" + 
                sorted.map((p, idx) => `    { id: "${p.id}", name: "${p.name}", race: "${p.race}", rating: ${Math.round(p.rating)}, win: ${p.win}, loss: ${p.loss}, prevRank: ${idx + 1} }`).join(",\n") + 
                "\n];";
            playerExportArea.value = codeString;
        }
    }

    document.getElementById('tab-admin').onclick = async (e) => {
        if (!isAdminLoggedIn) return;

        // 1. 관리자 그리드 메뉴 전환 처리 (메뉴 버튼 클릭)
        const card = e.target.closest('.admin-grid-card');
        if (card && card.dataset.target) {
            document.querySelectorAll('.admin-grid-card').forEach(c => c.classList.remove('active'));
            document.querySelectorAll('.admin-content-section').forEach(s => s.style.display = 'none');
            card.classList.add('active');
            const targetContent = document.getElementById(card.dataset.target);
            if (targetContent) targetContent.style.display = 'block';
            return; // 메뉴 전환 시에는 아래 버튼 로직 실행 안함
        }

        // 2. 관리자 액션 버튼 처리 (승인, 삭제, 저장 등)
        const btn = e.target.closest('.admin-btn');
        if (!btn || !btn.dataset.id) return;
        const id = btn.dataset.id;

        if (btn.classList.contains('admin-match-approve')) {
            const m = pendingMatches.find(x => x.docId === id);
            if (m) {
                await applyMatchResult(m.title, m.winnerId, m.loserId, m.winnerName, m.loserName);
                await deleteDoc(doc(db, "MatchReports", id));
                alert('승인 완료 및 데이터가 즉시 반영되었습니다.');
            }
        }
        if (btn.classList.contains('admin-match-reject')) await deleteDoc(doc(db, "MatchReports", id));
        if (btn.classList.contains('admin-user-approve')) {
            const u = pendingUsers.find(x => x.docId === id);
            if (u) {
                const nid = Date.now().toString();
                // 새 유저가 들어갈 순위 계산
                const newPlayerRank = players.filter(p => p.rating > u.rating).length + 1;

                // 새 유저보다 레이팅이 낮거나 같은 기존 유저들의 prevRank를 +1 (순위 밀림 보정)
                const adjustBatch = writeBatch(db);
                players.forEach(p => {
                    if (p.rating <= u.rating && p.prevRank) {
                        adjustBatch.update(doc(db, "Players", p.id), { prevRank: p.prevRank + 1 });
                    }
                });

                await setDoc(doc(db, "Players", nid), { id: nid, name: u.name, race: u.race, rating: u.rating, win: u.win, loss: u.loss, prevRank: newPlayerRank, approvedAt: Date.now(), baseRating: u.rating });
                await adjustBatch.commit();
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
            const newTag1 = row.querySelector('.p-tag-1').value;
            const newTag2 = row.querySelector('.p-tag-2').value;
            const selectedTags = [newTag1, newTag2].filter(t => t !== "");

            const playerRef = doc(db, "Players", id);
            const playerSnap = await getDoc(playerRef);
            const oldName = playerSnap.exists() ? playerSnap.data().name : '';

            // 1. 플레이어 데이터 업데이트
            await updateDoc(playerRef, { name: newName, race: newRace, rating: newRating, win: newWin, loss: newLoss });

            // 1.5. 태그 멤버십 업데이트
            const _tagsSnap = await getDocs(collection(db, "Tags"));
            const tagBatch = writeBatch(db);
            let hasTagUpdates = false;

            _tagsSnap.forEach(tDoc => {
                const tData = tDoc.data();
                let members = tData.members || [];
                const originalLength = members.length;

                // 기존 이름이나 새 이름으로 된 태그에서 제거
                members = members.filter(m => m !== (oldName || newName) && m !== newName);

                // 선택된 태그들에 이름 추가
                if (selectedTags.includes(tData.name)) {
                    members.push(newName);
                }

                // 변경사항이 있으면 배치에 추가
                if (JSON.stringify(members) !== JSON.stringify(tData.members || [])) {
                    tagBatch.update(tDoc.ref, { members: members });
                    hasTagUpdates = true;
                }
            });

            if (hasTagUpdates) {
                await tagBatch.commit();
            }

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
        if (btn.classList.contains('admin-sync-player')) {
            const p = players.find(x => x.id === id);
            if (!p || !confirm(`'${p.name}' 선수의 모든 매치 기록을 찾아 전적과 레이팅을 재계산하시겠습니까?`)) return;

            btn.disabled = true;
            try {
                // 이전 이름 목록 (매핑이 필요한 경우 추가)
                const targetNames = [p.name];
                if (p.name === "제리123") targetNames.push("제리");
                if (p.name === "아모크 amock82") targetNames.push("아모크 ammock82");

                // 해당 플레이어가 참여한 모든 매치 조회
                const q = query(
                    collection(db, "Matches"),
                    or(where("winner.name", "in", targetNames), where("loser.name", "in", targetNames))
                );
                const snap = await getDocs(q);

                let newWin = 0;
                let newLoss = 0;
                let totalDelta = 0;

                snap.forEach(doc => {
                    const m = doc.data();
                    const isWinner = targetNames.includes(m.winner.name);
                    const isLoser = targetNames.includes(m.loser.name);

                    if (isWinner) {
                        newWin++;
                        totalDelta += parseInt(m.winner.delta.toString().replace('+', '')) || 0;
                    } else if (isLoser) {
                        newLoss++;
                        totalDelta += parseInt(m.loser.delta.toString().replace('+', '')) || 0; // -XX 형태이므로 그대로 더함
                    }
                });

                const newRating = (p.baseRating || 1200) + totalDelta;
                await updateDoc(doc(db, "Players", id), {
                    win: newWin,
                    loss: newLoss,
                    rating: newRating
                });
                alert(`'${p.name}' 선수 데이터 복구 완료!\n(승: ${newWin}, 패: ${newLoss}, 레이팅: ${Math.round(newRating)})`);
            } catch (e) {
                console.error(e);
                alert('복구 중 오류 발생');
            } finally {
                btn.disabled = false;
            }
        }
        if (btn.classList.contains('admin-delete-player')) { if (confirm('삭제?')) await deleteDoc(doc(db, "Players", id)); }
        if (btn.classList.contains('admin-save-match')) {
            const row = btn.closest('.admin-edit-row');
            await updateDoc(doc(db, "Matches", id), { title: row.querySelector('.m-title').value });
            alert('저장 완료');
        }
        if (btn.classList.contains('admin-delete-match')) {
            if (confirm('이 경기를 삭제하면 선수의 전적과 레이팅도 복구됩니다. 삭제하시겠습니까?')) {
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
        if (btn.classList.contains('admin-delete-inquiry')) {
            if (confirm('이 문의 내역을 삭제하시겠습니까?')) {
                await deleteDoc(doc(db, "Inquiries", id));
                alert('삭제되었습니다.');
            }
        }
    };

    // 모달 닫기 버튼 버그 수정
    const closeDetailBtn = document.getElementById('closeDetailModalBtn');
    if (closeDetailBtn) {
        closeDetailBtn.onclick = () => {
            const modal = document.getElementById('userDetailsModal');
            if (modal) modal.classList.remove('active');
        };
    }
});
