const track = document.getElementById("image-track");
let isDragging = false;
let enableTransform = true;

window.onmousedown = (e) => {
  track.dataset.mouseDownAt = e.clientX;
  isDragging = true;
};

window.onmouseup = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage || 0;
  isDragging = false;
};

window.onmousemove = (e) => {
  if (!isDragging || !enableTransform) return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
  const maxDelta = window.innerWidth / 2;
  const percentage = (mouseDelta / maxDelta) * -100;
  updateTrack(parseFloat(track.dataset.prevPercentage || 0) + percentage);
};

window.addEventListener("wheel", (e) => {
  if (!enableTransform) return;

  const delta = e.deltaY;
  const scrollSpeed = 0.02;
  const current = parseFloat(track.dataset.percentage || 0);

  updateTrack(current + delta * scrollSpeed);
});

function updateTrack(nextPercentage) {
  const min = -100;
  const max = 0;
  const clamped = Math.max(min, Math.min(max, nextPercentage));
  track.dataset.percentage = clamped;

  track.style.transform = `translate(${clamped}%, -50%)`;

  for (const item of track.getElementsByClassName("product-item")) {
    const image = item.querySelector(".products-img");
    const text = item.querySelector(".products-text");

    image.style.objectPosition = `${100 + clamped}% center`;
    text.style.transform = `translateX(${clamped}%) translateX(-50%)`;
  }
}

function disableTransform() {
  enableTransform = false;
}

function enableTransforming() {
  enableTransform = true;
}
