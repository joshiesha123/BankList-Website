'use strict';

///////////////////////////////////////
// Modal window


const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn=> btn.addEventListener('click', openModal));
  
 btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////////////////////////////////////////
//Button scrolling
const btnScrollTo = document.querySelector("#learn-more");
const section1 =document.querySelector("#section--1");

console.log(btnScrollTo);
btnScrollTo.addEventListener("click", function(e){
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect()); 

  console.log("Current scroll (X/Y)", window.pageXOffset, window.pageYOffset);

  console.log(
    "heigth/width viewport",
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  )

  // scrolling
  // window.scrollTo(
  //   s1coords.left+ window.pageXOffset,
  //    s1coords.top+ window.pageYOffset);

//  here we are passing in an object
    //  window.scrollTo(
    //   {
    //    left: s1coords.left+ window.pageXOffset,
    //    top:  s1coords.top+ window.pageYOffset,
    //    behavior: "smooth",
    //   }
    //  )

    section1.scrollIntoView({behviour: "smooth"});
  });


////////////////////////////////
//Page Navigation

// document.querySelectorAll(".nav__link").forEach(function(el){
//   el.addEventListener("click", function(e){
//     e.preventDefault();
//     console.log("LINK");
//     const id= this.getAttribute("href");
//     console.log(id);
//     document.querySelector(id).scrollIntoView({behviour: "smooth"});

//   })
// })
// Event Delegation approach
// 1) Add event listener to common parent Element.
// 2) Determine wjich element originated the event

document.querySelector(".nav__links").addEventListener("click", function(e){
console.log(e.target);
e.preventDefault();

//Matching strategy
if(e.target.classList.contains("nav__link")){
  console.log("LINK");
  const id =e.target.getAttribute("href");
  document.querySelector(id).scrollIntoView({behviour: "smooth"});

}
});

////////////////////////////////
//Tabbed Component
const tabs= document.querySelectorAll(".operations__tab");
const tabsContainer =document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");


// tabs.forEach(function(el){
//   el.addEventListener("click", function(e){
//     console.log("TAB");
// });
// });

// Event delegation 
tabsContainer.addEventListener("click", function(e){
  const clicked= e.target.closest(".operations__tab");
  console.log(clicked);
 
 
  if(!clicked)
   return;


  else{
    //  Remove active tab & active tab content
    tabs.forEach(function(t){
      t.classList.remove("operations__tab--active")
}) 
}

if(!clicked)
   return;

 else{ tabsContent.forEach(function(c){
 c.classList.remove("operations__content--active");
 })
}
  
   //Activate Tab
   clicked.classList.add("operations__tab--active");

  // Activate content area
  console.log(clicked.dataset.tab);
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add("operations__content--active");

});



///////////////////////////////
//Menu fade Animation

const nav = document.querySelector(".nav");

//using mouseover and not mouseenter is because mouseenter does not bubble
// and we have selected parent element so we want event to bubble so that it can reach to nav element.




nav.addEventListener("mouseover", function(e){
 if(e.target.classList.contains("nav__link")){
  const link = e.target;
  const siblings= document.querySelectorAll(".nav__link");

 //now we also have to select the sibling element, we can do that by going to parent & then selecting children from there.
 //In this case the parent of nav-link is nav-item, the only thing that nav-item incluses is just 1 link. so now we will have to move manually twice.
 // so we will use closest method
 

//  const siblings= link.closest(".nav").querySelectorAll("nav__link");
//  console.log(link.closest);
 const logo= link.closest(".nav").querySelector("img");
// console.log(siblings);
// console.log(link);

siblings.forEach(function(el){
 if(el.innerHTML !==link.innerHTML){ 
    el.style.opacity=0.5;
     }
})
logo.style.opacity=0.5;
link.style.opacity=1;
 }
 
});

// siblings.forEach(el=> {
//   console.log(el);
//   if (el !==link)
//   el.style.opacity=0.5;
// });
// logo.style.opacity=0.5;
 
//  }
// });


// the opposite of mouseover is mouseout
nav.addEventListener("mouseout", function(e){
  
  siblings.forEach(function(el){
    if(el.innerHTML !==link.innerHTML){ 
       el.style.opacity=1;
        }
   })
   logo.style.opacity=1;
  //  link.style.opacity=0.5;
}
)

////////////////////////////////
//Implementing a sticky Navigation: The scroll Event

// // The scroll event is available on window
// this event will be fired off each time we scroll our page

// window.scrollY gives the position of the window at which we r

// iniitialCoords will give you top value of the section1

// const initialCoords = section1.getBoundingClientRect();
// // console.log(initialCoords);

// window.addEventListener("scroll", function(){
//   // console.log(window.scrollY);

//   if(window.scrollY>initialCoords.top)
//   nav.classList.add("sticky");
//   else
//   nav.classList.remove("sticky");
// });


/////////////////////////////////////
//Intersection of Observer API: sticky Navigation

// To use this, we need to start by creating a new intersection observer
//  This object first needs first a root, this root is the element that target is intersecting
//Threshhold is the percentage of intersection at which the observer callback will be called.

 
const header= document.querySelector(".header");

const navHeight = nav.getBoundingClientRect().height;


 const stickyNav =function (entries){
  const [entry] = entries;
  // console.log(entry);

  if(!entry.isIntersecting) 
  nav.classList.add("sticky");
  else
  nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver
(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);


///////////////////////////
//Reveal sections on scroll
//we will use intersection of observer api

const allSections= document.querySelectorAll(".section");

const revealSection = function(entries, observer){
   const [entry]= entries;
   console.log(entry);
  
   if(!entry.isIntersecting) return;


   entry.target.classList.remove("section--hidden");
   observer.unobserve(entry.target);

}

const secObserver = new IntersectionObserver(revealSection, 
  //object of options
  { root: null,
    threshold:0.15,
  
  })
  allSections.forEach(function(section){
    secObserver.observe(section);
    // section.classList.add("section--hidden");
  });


  ////////////////////////
  //Lazy loading images
 const imgTargets = document.querySelectorAll("img[data-src]");

 const loadImg = function(entries, observer){
  const [entry]= entries;
  //  console.log(entry);
  
  //guard clause
  if(!entry.isIntersecting) return;
   //replace src with data-src

   entry.target.src= entry.target.dataset.src;

   entry.target.addEventListener("load", function(){
    entry.target.classList.remove("lazy-img");
   });
   observer.unobserve(entry.target);

 };

const imgObserver = new IntersectionObserver(loadImg, 
  {
    root:null,
    threshold: 0,
    rootMargin:"200px",
  });

  imgTargets.forEach(img=>imgObserver.observe(img));


 /////////////////////////////////////













