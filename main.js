const wrapper = document.body;

const mainTitle = document.createElement("h1");
mainTitle.className = "title";
mainTitle.textContent = "Weather Sound";
wrapper.appendChild(mainTitle);

const container = document.createElement("div");
container.className = "container";
wrapper.appendChild(container);

const musicCard = [
    { type: "summer", bg: "./assets/summer-bg.jpg", icon: "./assets/icons/sun.svg"},
    { type: "rain", bg: "./assets/rainy-bg.jpg", icon: "./assets/icons/cloud-rain.svg"},
    { type: "winter", bg: "./assets/winter-bg.jpg", icon: "./assets/icons/cloud-snow.svg"}
];

musicCard.forEach(cardContent => {
    const card = document.createElement("div");
    card.className = "audioCard";
    card.dataset.sound = cardContent.type;

    const img = document.createElement("img");
    img.src = cardContent.bg;
    card.appendChild(img);

    const icon = document.createElement("img");
    icon.className = "icon";
    icon.src = cardContent.icon;
    icon.dataset.defaultIcon = cardContent.icon;
    icon.dataset.pauseIcon = "./assets/icons/pause.svg";
    card.appendChild(icon);

    container.appendChild(card);
});

const sounds = {
    summer: new Audio("./assets/sounds/summer.mp3"),
    rain: new Audio("./assets/sounds/rain.mp3"),
    winter: new Audio("./assets/sounds/winter.mp3")
};

const backgrounds = {
    summer: "./assets/summer-bg.jpg",
    rain: "./assets/rainy-bg.jpg",
    winter: "./assets/winter-bg.jpg"
};

const soundControl = document.createElement("input");
soundControl.type = "range";
soundControl.min = 0;
soundControl.max = 1;
soundControl.step = 0.01;
soundControl.value = 1;
wrapper.appendChild(soundControl);

const soundCards = document.querySelectorAll(".audioCard");

soundCards.forEach(card => {
    card.addEventListener("click", () => {
        const soundType = card.dataset.sound;
        const sound = sounds[soundType];
        const icon = card.querySelector(".icon");

        soundCards.forEach(otherCard => {
            const otherIcon = otherCard.querySelector(".icon");
            otherIcon.src = otherIcon.dataset.defaultIcon;
        });

        if (sound.paused) {
            Object.values(sounds).forEach(audio => audio.pause());

            document.body.style.background = `url('${backgrounds[soundType]}') no-repeat center/cover`;

            sound.volume = soundControl.value;
            sound.play();

            icon.src = icon.dataset.pauseIcon;
        } else {
            sound.pause();

            icon.src = icon.dataset.defaultIcon;
        }
    });
});

soundControl.addEventListener("input", () => {
    Object.values(sounds).forEach(audio => {
        audio.volume = soundControl.value;
    });
});


