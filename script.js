
const welcomePage = document.getElementById("welcomePage");
const mainPage = document.getElementById("mainPage");

const openButton = document.getElementById("openButton");

const backgroundMusic = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");

const featureModal = document.getElementById("featureModal");
const featureContent = document.getElementById("featureContent");

let typingInterval = null;
let openingTimeout = null;


// OPEN WEBSITE

openButton.addEventListener("click", function () {

    welcomePage.classList.add("hidden");
    mainPage.classList.remove("hidden");

    backgroundMusic.play()
        .then(() => {
            musicButton.textContent = "⏸ Pause Music";
        })
        .catch(() => {
            musicButton.textContent = "🎵 Play Music";
        });

});


// MUSIC CONTROL

musicButton.addEventListener("click", function () {

    if (backgroundMusic.paused) {

        backgroundMusic.play();
        musicButton.textContent = "⏸ Pause Music";

    } else {

        backgroundMusic.pause();
        musicButton.textContent = "🎵 Play Music";

    }

});


// FEATURE MENU

function showFeature(feature) {

    clearInterval(typingInterval);
    clearTimeout(openingTimeout);

    const features = {

        letter: `
            <div class="letter-wrapper">

                <h2 class="letter-title">
                    A Little Letter For You ♡
                </h2>

                <p class="letter-subtitle">
                    Someone has something to tell you, Acii!
                </p>

                <div class="envelope" id="loveEnvelope">

                    <div class="envelope-back"></div>

                    <div class="envelope-paper">
                        <div class="paper-preview">
                            For Acii ♡
                        </div>
                    </div>

                    <div class="envelope-front"></div>

                    <div class="envelope-flap"></div>

                    <div class="envelope-heart">💗</div>

                </div>

                <div class="letter-content" id="loveLetter">

                    <h3>Dear Acii! 🧸💗</h3>

                    <div id="typedText" class="typed-text"></div>

                </div>

            </div>
        `,

        memories: `
            <div class="memories-wrapper">
                <h2 class="memories-title">Our Memories 📸💗</h2>
                <p class="memories-subtitle">
                    28 little moments that mean so much to me ✨
                </p>

                <div class="memories-gallery">
                    ${Array.from({ length: 28 }, (_, i) => `
                        <div class="memory-card" onclick="openMemory(this)">
                            <img
                                src="assets/images/foto${i + 1}.jpg"
                                alt="Memory ${i + 1}"
                                class="memory-photo"
                                loading="lazy"
                            >
                            <span class="memory-number">Memory ${i + 1} 💕</span>
                        </div>
                    `).join("")}
                </div>

                <p class="memories-footer">
                    Every picture has a little story with you. 🥺💕
                </p>
            </div>

            <div class="memory-lightbox" id="memoryLightbox"
                onclick="closeMemory()">
                <span class="memory-close">&times;</span>
                <img id="lightboxImage" src="" alt="Our Memory">
            </div>
        `,

        surprise: `
            <div class="surprise-wrapper">

                <h2 class="surprise-title">A Little Surprise For You! 🎁</h2>

                <p class="surprise-subtitle">
                    Acii, aa punya sesuatu buat kamu...
                </p>

                <div class="gift-container" id="giftContainer"
                    onclick="openSurprise()">

                    <div class="gift-box" id="giftBox">
                        <div class="gift-lid" id="giftLid">
                            <div class="gift-ribbon"></div>
                            <div class="gift-bow">🎀</div>
                        </div>

                        <div class="gift-body">
                            <div class="gift-ribbon"></div>
                            <span class="gift-heart">💗</span>
                        </div>
                    </div>

                </div>

                <p class="gift-instruction" id="giftInstruction">
                    Klik kotaknya untuk membuka hadiah! 💕
                </p>

                <div class="surprise-message" id="surpriseMessage">
                    <h3>For Acii 💗</h3>

                    <p>
                        Yeayyy! Hadiahnya berhasil dibuka! 🎉
                    </p>

                    <p>
                        Mungkin ini bukan hadiah yang mewah, tapi aa harap bisa bikin acii tersenyum. ❤️
                    </p>

                    <p>
                        Terima kasih yaa udah jadi salah satu
                        alesan aa tersenyum setiap hari.
                        Semoga Acii selalu bahagia, yaa! 💕
                    </p>
                </div>

            </div>
        `,

        daily: `
            <div class="daily-love-wrapper">

                <div class="daily-love-icon">💌</div>

                <h2 class="daily-love-title">
                    A Little Love For Acii
                </h2>

                <p class="daily-love-subtitle">
                    Your little dose of happiness today ♡
                </p>

                <div class="daily-love-card">

                    <span class="daily-love-label">
                        MESSAGE OF THE DAY
                    </span>

                    <div class="daily-love-message" id="dailyLoveMessage">
                        Loading your love message...
                    </div>

                    <div class="daily-love-heart">💗</div>

                </div>

                <p class="daily-love-footer">
                    One message, one smile, and endless love for you. ♡
                </p>

            </div>
        `,


    };


    featureContent.innerHTML = features[feature] || "<p>Feature tidak ditemukan.</p>";

    featureModal.classList.remove("hidden");

    // DAILY LOVE

    if (feature === "daily") {

        const dailyMessages = [
            "Jangan lupa tersenyum hari ini, karena senyum acii adalah salah satu hal favorit aa. 💗",

            "Kalau hari ini terasa berat, ingat yaa, ada aa yang selalu support acii. 💗",

            "Dari sekian banyak hal indah di dunia, bertemu acii tetap menjadi salah satu favorit aa. 💗",

            "Jangan lupa makan, minum air putih, dan jangan terlalu capek yaa. 💗",

            "Semoga hari ini banyak hal baik datang menghampiri acii. You deserve all the happiness! 💕",

            "Aa mungkin nggak selalu bisa ada di samping acii, tapi aa selalu punya doa baik untuk acii. 💗",

            "Terima kasih sudah hadir dan membuat hari-hari aa terasa lebih berwarna. 💗",

            "Kalau hari ini belum berjalan sesuai harapan, nggak apa-apa. Besok kita coba lagi, yaa. 💗",

            "Acii itu hebat. Jangan pernah meragukan diri sendiri, karena aa percaya sama acii. 💗",

            "Semoga semua urusan acii hari ini dimudahkan dan semua lelahnya diganti dengan kebahagiaan. 💗",

            "Satu hal yang ingin aa ingatkan hari ini: you are loved, more than you know. 💗",

            "Jangan lupa istirahat. Dunia boleh menunggu, kesehatan dan kebahagiaan acii tetap penting. 💗",

            "Kalau aa bisa memilih satu hal untuk disyukuri hari ini, salah satunya adalah kehadiran acii. 💗",

            "Semoga hari ini acii menemukan banyak alasan untuk tersenyum. Aa selalu mendoakan yang terbaik. 💗",
        ];

        const today = new Date();
        const startOfYear = new Date(today.getFullYear(), 0, 0);
        const dayOfYear = Math.floor(
            (today - startOfYear) / (1000 * 60 * 60 * 24)
        );

        const messageIndex = (dayOfYear - 1) % dailyMessages.length;

        document.getElementById("dailyLoveMessage").textContent =
            dailyMessages[messageIndex];

    }

    // LETTER ANIMATION

    if (feature === "letter") {

        const envelope = document.getElementById("loveEnvelope");
        const letter = document.getElementById("loveLetter");
        const hint = document.getElementById("envelopeHint");

        const typedText = document.getElementById("typedText");
        const cursor = document.getElementById("typingCursor");


        // ISI SURAT

        
const paragraphs = [
    "Aa mau bilang sesuatu.", 
    
    "CONGRATULATIONS ON YOUR NEW JOB!! 🎉💗",

    "Maaf yaaa, aa telat ngucapinnya. Aa ikut bahagia karena akhirnya satu langkah baru berhasil acii lewati.",

    "Semoga kerjaan baru acii menjadi tempat yang baik untuk belajar, berkembang, dan mendapatkan banyak pengalaman baru.",
    
    "Semoga acii selalu dipertemukan dengan orang-orang baik, rekan kerja yang menyenangkan, atasan yang pengertian, dan lingkungan kerja yang bikin acii nyaman.",

    "Kalau nanti ada hari yang melelahkan, jangan terlalu keras sama diri sendiri, ya. It's okay to make mistakes, it's okay to learn slowly, and it's okay to take a rest.", 

    "Jangan lupa makan, jangan sering begadang terussss, tapi kalau sama aa gapapa wkwk.", 
    
    "Jangan sampai acii terlalu sibuk kerja sampai lupa istirahat dan lupa bahagia, ya!",

    "I'm so proud of you, Acii! Semoga semua usaha dan langkah baik acii selalu dimudahkan.", 
    
    "Semoga rezeki acii lancar, karir acii semakin berkembang, selalu diberikan kesehatan, dan banyak kebahagiaan datang menghampiri acii.",

    "Once again, congratulations Acii! ♡ Aa akan selalu support dan mendoakan yang terbaik untuk acii."
];

const signature = `
    <div class="letter-signature">
        With lots of love,<br>
        Someone who is always cheering for you ♡
    </div>
    <p class="letter-ps">
        P.S. Jangan lupa traktiran kalau udah gajian! WKWKWK 🤭
    </p>
`;

let paragraphIndex = 0;
let characterIndex = 0;
let currentParagraph = null;

typedText.innerHTML = "";

function typeParagraph() {

    if (paragraphIndex >= paragraphs.length) {
        clearInterval(typingInterval);
        typedText.insertAdjacentHTML("beforeend", signature);
        return;
    }

    if (!currentParagraph) {
        currentParagraph = document.createElement("p");
        currentParagraph.className = "typed-paragraph";
        typedText.appendChild(currentParagraph);
    }

    const currentText = paragraphs[paragraphIndex];

    if (characterIndex < currentText.length) {

        currentParagraph.textContent += currentText.charAt(characterIndex);
        characterIndex++;

    } else {

        paragraphIndex++;
        characterIndex = 0;
        currentParagraph = null;

    }
}

typingInterval = setInterval(typeParagraph, 40);



        // KLIK AMPLOP

        envelope.addEventListener("click", function () {

            // Mencegah amplop dibuka berkali-kali
            if (envelope.classList.contains("open")) {
                return;
            }

            // ANIMASI AMPLOP TERBUKA
            envelope.classList.add("open");

            hint.textContent = "Opening your little letter... 💗";


            // TUNGGU AMPLOP TERBUKA

            openingTimeout = setTimeout(function () {

                // TAMPILKAN SURAT
                letter.classList.add("show");

                hint.textContent = "A special message for you ♡";


                // MULAI TYPING TEXT

                let index = 0;

                typedText.textContent = "";

                cursor.style.display = "inline";


                typingInterval = setInterval(function () {

                    if (index < message.length) {

                        typedText.textContent += message.charAt(index);

                        index++;

                    } else {

                        clearInterval(typingInterval);

                        cursor.style.display = "none";

                    }

                }, 40);


                // FLOATING HEARTS

                for (let i = 0; i < 15; i++) {

                    const heart = document.createElement("div");

                    heart.className = "heart-particle";

                    heart.textContent = ["💗", "💕", "💖", "♡"][i % 4];

                    heart.style.left = Math.random() * 100 + "vw";

                    heart.style.animationDelay = Math.random() * 1.5 + "s";

                    heart.style.fontSize =
                        (15 + Math.random() * 20) + "px";

                    document.body.appendChild(heart);

                    setTimeout(function () {
                        heart.remove();
                    }, 4500);

                }

            }, 1100);

        });

    }

}


// CLOSE MODAL

function closeFeature() {

    clearInterval(typingInterval);
    clearTimeout(openingTimeout);

    featureModal.classList.add("hidden");

}



featureModal.addEventListener("click", function (event) {

    if (event.target === featureModal) {
        closeFeature();
    }

});



function openMemory(element) {
    const image = element.querySelector("img");

    document.getElementById("lightboxImage").src = image.src;
    document.getElementById("memoryLightbox").classList.add("active");
}

function closeMemory() {
    document.getElementById("memoryLightbox").classList.remove("active");
}



function openSurprise() {
    const giftBox = document.getElementById("giftBox");
    const giftInstruction = document.getElementById("giftInstruction");
    const surpriseMessage = document.getElementById("surpriseMessage");

    console.log("Kotak hadiah diklik!");

    if (!giftBox || !giftInstruction || !surpriseMessage) {
        console.error("Elemen Surprise Box tidak ditemukan!");
        return;
    }

    if (giftBox.classList.contains("opened")) {
        return;
    }

    giftBox.classList.add("opened");

    giftInstruction.textContent = "Yeayyy! Surprise!!! 💗";

    setTimeout(() => {
        surpriseMessage.classList.add("show");

        surpriseMessage.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    }, 700);
}