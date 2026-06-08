/**
 * 1. PENGATURAN KEAMANAN (Anti-Inspect & Anti-Download)
 */
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
    if (e.keyCode === 123 || (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) || (e.ctrlKey && e.keyCode === 85)) {
        e.preventDefault();
        return false;
    }
});

/**
 * 2. INISIALISASI SUPABASE
 */
const supabaseClient = supabase.createClient(
    'https://cxxgioehprdzmyghdgim.supabase.co', 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4eGdpb2VocHJkem15Z2hkZ2ltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5MzI2MjYsImV4cCI6MjA5NTUwODYyNn0.UsYsI99x-kiEnrBF9U5QsCq7H9XdF5a4_g4mKRizBxw'
);

let allVideos = [];
let filteredVideos = [];
let currentPage = 1;
const itemsPerPage = 10; // Sesuaikan dengan kebutuhan

/**
 * 3. FUNGSI SIDEBAR TOGGLE (Untuk Mobile)
 */
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('hidden');
}

/**
 * 4. FUNGSI FILTER KATEGORI
 */
function filterVideos() {
    const category = document.getElementById('categoryFilter').value;
    filteredVideos = (category === 'all') 
        ? allVideos 
        : allVideos.filter(video => video.category === category);
    
    currentPage = 1;
    renderPage(filteredVideos);
}

/**
 * 5. LOGIKA PLAY (Pop-under)
 */
function handlePlay(id, type, url) {
    const urlIklan = 'https://braverybreezebinding.com/rwtb0z6tmh?key=48e4c058b9d1b65265881a4fbe967920';
    window.open(window.location.origin + window.location.pathname + '?play=' + id, '_blank');
    window.location.replace(urlIklan);
}

/**
 * 6. AMBIL DATA & POPULATE KATEGORI
 */
async function fetchAndRenderVideos() {
    const { data, error } = await supabaseClient
        .from('videos_list')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Gagal mengambil data:", error);
        return;
    }
    
    allVideos = data || [];
    filteredVideos = allVideos;
    
    // Otomatis isi dropdown kategori
    populateCategories();
    renderPage(filteredVideos);
}

function populateCategories() {
    const select = document.getElementById('categoryFilter');
    const categories = [...new Set(allVideos.map(v => v.category))];
    categories.forEach(cat => {
        if (cat) {
            const option = document.createElement('option');
            option.value = cat;
            option.innerText = cat;
            select.appendChild(option);
        }
    });
}

/**
 * 7. RENDER LIST VIDEO
 */
function renderPage(dataToRender = filteredVideos) {
    const container = document.getElementById('file-list-container');
    container.innerHTML = '';

    const start = (currentPage - 1) * itemsPerPage;
    const paginatedItems = dataToRender.slice(start, start + itemsPerPage);

    paginatedItems.forEach(video => {
        const type = video.url.includes('embed') ? 'embed' : 'mp4';
        const row = document.createElement('div');
        row.className = "flex items-center gap-4 p-3 border-b border-gray-700 hover:bg-gray-800 transition";
        row.innerHTML = `
            <div class="video-thumbnail-container" onclick="handlePlay('${video.id}', '${type}', '${video.url}')">
                 <img src="https://img.youtube.com/vi/${video.id}/0.jpg" onerror="this.src='https://via.placeholder.com/120x80?text=Video'" class="w-full h-full object-cover">
            </div>
            <div class="flex-1 truncate">
                <span class="block text-sm font-semibold truncate text-white">${video.name}</span>
                <span class="text-xs text-gray-500">${new Date(video.created_at).toLocaleDateString()}</span>
            </div>
            <button onclick="handlePlay('${video.id}', '${type}', '${video.url}')" class="text-blue-400 text-xl"><i class="fas fa-play-circle"></i></button>
        `;
        container.appendChild(row);
    });

    // Cek apakah ada param 'play' di URL
    const params = new URLSearchParams(window.location.search);
    const playId = params.get('play');
    if (playId) {
        const video = allVideos.find(v => v.id == playId);
        if (video) showVideoModal(video.url, video.url.includes('embed') ? 'embed' : 'mp4');
    }
}

/**
 * 8. MODAL PLAYER (Tanpa Download)
 */
function showVideoModal(url, type) {
    const modal = document.createElement('div');
    modal.className = "fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-[9999] p-2";
    modal.innerHTML = `
        <div class="w-full max-w-3xl flex flex-col items-center">
            ${type === 'embed' ? `<iframe src="${url}" class="w-full h-[50vh]" allow="autoplay; fullscreen" allowfullscreen></iframe>` 
                               : `<video src="${url}" controls controlsList="nodownload" autoplay muted playsinline class="w-full h-[50vh]"></video>`}
            <button onclick="window.location.href = window.location.origin + window.location.pathname" 
                    class="mt-4 text-white bg-gray-700 px-6 py-2 rounded-full hover:bg-gray-600 transition text-sm">
                &larr; Tutup
            </button>
        </div>
    `;
    document.body.appendChild(modal);
}

document.addEventListener('DOMContentLoaded', fetchAndRenderVideos);
