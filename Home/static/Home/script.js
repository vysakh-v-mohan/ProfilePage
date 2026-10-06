const root=document.documentElement;
const themeToggle=document.getElementById("themeToggle");
const savedTheme=localStorage.getItem("vvm-theme");
if(savedTheme) root.dataset.theme=savedTheme;
themeToggle.textContent=root.dataset.theme==="dark"?"☀":"☾";
themeToggle.addEventListener("click",()=>{
  const dark=root.dataset.theme!=="dark";
  root.dataset.theme=dark?"dark":"light";
  localStorage.setItem("vvm-theme",dark?"dark":"light");
  themeToggle.textContent=dark?"☀":"☾";
});

const menuBtn=document.getElementById("menuBtn");
const navLinks=document.getElementById("navLinks");
menuBtn.addEventListener("click",()=>navLinks.classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>navLinks.classList.remove("open")));

const header=document.querySelector(".site-header");
const progress=document.getElementById("progress");
window.addEventListener("scroll",()=>{
  header.classList.toggle("scrolled",window.scrollY>20);
  const h=document.documentElement.scrollHeight-window.innerHeight;
  progress.style.width=(h>0?(window.scrollY/h)*100:0)+"%";
});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const counters=document.querySelectorAll("[data-count]");
let counted=false;
const counterObserver=new IntersectionObserver(entries=>{
  if(entries.some(e=>e.isIntersecting)&&!counted){
    counted=true;
    counters.forEach(el=>{
      const target=+el.dataset.count;
      let n=0; const step=Math.max(1,Math.ceil(target/28));
      const timer=setInterval(()=>{n=Math.min(target,n+step);el.textContent=n;if(n>=target)clearInterval(timer)},35);
    });
  }
},{threshold:.5});
const stats=document.querySelector(".stats-section"); if(stats)counterObserver.observe(stats);

const filters=document.querySelectorAll(".filter");
const cards=document.querySelectorAll(".work-card");
const search=document.getElementById("workSearch");
let activeFilter="all";
function applyWorkFilter(){
  const q=search.value.toLowerCase().trim();
  cards.forEach(card=>{
    const okCat=activeFilter==="all"||card.dataset.category===activeFilter;
    const okSearch=!q||card.dataset.search.includes(q);
    card.classList.toggle("hidden",!(okCat&&okSearch));
  });
}
filters.forEach(btn=>btn.addEventListener("click",()=>{
  filters.forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
  activeFilter=btn.dataset.filter; applyWorkFilter();
}));
search.addEventListener("input",applyWorkFilter);

const sections=[...document.querySelectorAll("main section[id]")];
const navAnchors=[...document.querySelectorAll(".nav-links a")];
const navObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      navAnchors.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+entry.target.id));
    }
  });
},{rootMargin:"-30% 0px -60% 0px"});
sections.forEach(s=>navObserver.observe(s));

document.getElementById("year").textContent=new Date().getFullYear();
