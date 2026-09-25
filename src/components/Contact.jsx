import React from 'react'
import { openingHours, socials, storeInfo } from '../../constants'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/all'
import gsap from 'gsap'

const Contact = () => {
    useGSAP(() => {
        const titleSplit = SplitText.create('#contact h2', { type: "words" });

        const timeline = gsap.timeline({ 
            scrollTrigger: {
                trigger: '#contact',
                start: 'top center',
            },
            defaults: { ease: 'power1.inOut' },
        });

        timeline
        .from(titleSplit.words, {
            opacity: 0,
            yPercent: 100,
            stagger: 0.02
        })
        .from('#contact h3, #contact p', {
            opacity: 0,
            yPercent: 100,
            stagger: 0.02
        })

        // leaves grow in from their corners with the scroll and end at their CSS position,
        // so the left leaf stays anchored to the bottom (no gap)
        gsap.timeline({
            scrollTrigger: {
                trigger: '#contact',
                start: 'top bottom',
                end: 'bottom bottom',
                scrub: 1,
            },
            defaults: { ease: 'none' },
        })
        .from('#f-right-leaf', { xPercent: 40, yPercent: -40, rotate: 15, transformOrigin: 'top right' }, 0)
        .from('#f-left-leaf', { xPercent: -40, yPercent: 40, rotate: -15, transformOrigin: 'bottom left' }, 0)
    })
  return (
    <footer id="contact">
        <img src="/images/footer-right-leaf.png" alt="leaf-right" id="f-right-leaf" />
        <img src="/images/footer-left-leaf.png" alt="leaf-left" id="f-left-leaf" />
        <div className="content">
            <h2>{storeInfo.heading}</h2>
            <div>
                <h3>Visit Our Bar</h3>
                <p>{storeInfo.address}</p>
            </div>
            <div>
                <h3>Contact Us</h3>
                <p>{storeInfo.contact.phone}</p>
                <p>{storeInfo.contact.email}</p>
            </div>
            <div>
                <h3>Open Every Day</h3>
                {openingHours.map((time) => (
                    <p key={time.day}>{time.day} : {time.time}</p>
                ))}
            </div>
            <div>
                <h3>Socials</h3>
                <div className="flex-center gap-5">
                    {socials.map((social) => (
                        <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                            <img src={social.icon} alt={social.name} />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Contact
