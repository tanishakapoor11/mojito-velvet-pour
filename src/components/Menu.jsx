'use client';
import React, { useRef, useState } from 'react'
import { allCocktails } from '../../constants'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Menu = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const contentRef = useRef()
  const directionRef = useRef(-1) // -1: enter from left (next), 1: enter from right (prev)

  useGSAP(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: '#menu',
        start: 'top 30%',
        end: 'bottom 80%',
        scrub: true,
      }
    })
    .from('#m-left-leaf', { x: -100, y: 100 })
    .from('#m-right-leaf', { x: 100, y: 100 })
  }, []);

  useGSAP(() => {
    gsap.fromTo('#title', { opacity: 0 }, { opacity: 1, duration: 1 });
    // incoming and outgoing move together so the images look like they rotate on a ring
    const dir = directionRef.current;
    gsap.fromTo('.cocktail .incoming', { opacity: 0, scale: 0.8, xPercent: 100 * dir }, { xPercent: 0, scale: 1, opacity: 1, duration: 1, ease: 'power1.inOut' });
    if (prevIndex === currentIndex) gsap.set('.cocktail .outgoing', { opacity: 0 });
    else gsap.fromTo('.cocktail .outgoing', { opacity: 1, scale: 1, xPercent: 0 }, { xPercent: -100 * dir, scale: 0.8, opacity: 0, duration: 1, ease: 'power1.inOut' });
    gsap.fromTo('.details h2', { opacity: 0, yPercent: 100 }, { opacity: 100, yPercent: 0, ease: 'power1.inOut' });
    gsap.fromTo('.details p', { opacity: 0, yPercent: 100 }, { opacity: 100, yPercent: 0, ease: 'power1.inOut' });
  },[currentIndex]);

  const totalCocktails = allCocktails.length;

  const goToSlide = (index) => {
    const newIndex = (index + totalCocktails) % totalCocktails;
    directionRef.current = index < currentIndex ? 1 : -1;
    setPrevIndex(currentIndex)
    setCurrentIndex(newIndex)
  }

  const getCocktailAt = (indexOffset) => {
    return allCocktails[(currentIndex + indexOffset + totalCocktails) % totalCocktails]
  }

  const currentCocktail = getCocktailAt(0);
  const prevCocktail = getCocktailAt(-1);
  const nextCocktail = getCocktailAt(1);

  return (
    <section id="menu" aria-labelledby='menu-heading'>
        <img src="/images/slider-left-leaf.png" alt="left-leaf" id="m-left-leaf" />
        <img src="/images/slider-right-leaf.png" alt="right-leaf" id="m-right-leaf" />
        <h2 id="menu-heading" className="sr-only">
            Cocktail Menu 
        </h2>

        <nav className="cocktail-tabs" aria-label="Cocktail Navigation">
          {allCocktails.map((cocktail, index) => {
            const isActive = index === currentIndex;
            return (
              <button key={cocktail.id} className={`${isActive ? 'text-white border-white' : 'text-white/50 border-white/50'}`} onClick={() => goToSlide(index)}>
                {cocktail.name}
              </button>
            )
          })}
        </nav>
        <div className="content">
          <div className="arrows">
            <button className="text-left" onClick={() => goToSlide(currentIndex - 1)}>
              <span>{prevCocktail.name}</span>
              <img src="/images/right-arrow.png" alt="right-arrow" aria-hidden="true" />
            </button>
            <button className="text-left" onClick={() => goToSlide(currentIndex + 1)}>
              <span>{nextCocktail.name}</span>
              <img src="/images/left-arrow.png" alt="left-arrow" aria-hidden="true" />
            </button>
          </div>
          <div className="cocktail relative">
            <img src={allCocktails[prevIndex].image} alt="" aria-hidden="true" className="outgoing absolute" />
            <img src={currentCocktail.image} alt={currentCocktail.name} className="incoming" />
          </div>
          <div className="recipe">
            <div ref={contentRef} className="info">
              <p>Recipe for:</p>
              <p id="title">{currentCocktail.name}</p>
            </div>
            <div className="details">
              <h2>{currentCocktail.title}</h2>
              <p>{currentCocktail.description}</p>
            </div>
          </div>
        </div>
    </section>
  )
}

export default Menu
