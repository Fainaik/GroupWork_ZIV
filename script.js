const pointer = document.getElementById("pointer");
const parent = pointer.parentElement;
let isDragging = false;
let startY;
let startTop;

pointer.addEventListener("mousedown", (e) => {
  isDragging = true;
  startY = e.clientY;
  startTop = pointer.offsetTop;
  pointer.style.cursor = "grabbing";
  e.preventDefault();
});

window.addEventListener("mouseup", () => {
  isDragging = false;
  pointer.style.cursor = "grab";
});

window.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  let deltaY = e.clientY - startY;
  let newTop = startTop + deltaY;

  const maxTop = parent.clientHeight - pointer.clientHeight - 10;
  if (newTop < 0) newTop = 0;
  if (newTop > maxTop) newTop = maxTop;

  pointer.style.top = newTop + "px";

  const scrollableHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = newTop / maxTop;
  window.scrollTo(0, scrollableHeight * scrollPercent);
});
