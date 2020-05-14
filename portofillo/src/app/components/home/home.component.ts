import { Component, OnInit, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';
import { TweenLite, Power1 } from 'gsap/all';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

    constructor() { }

    ngOnInit(): void {
    }

    ngAfterViewInit() {
        // Title animation
        gsap.to('.title', 1, {
            y: -160,
            opacity: 0,
            ease: Power1.easeInOut,
            stagger: 0.1
        });

        gsap.to('.screen', 1.5, {
            delay: .5, 
            height: 0,
            ease: Power1.easeInOut
        })


        const html = document.documentElement;
        const body = document.body;
        const scroller = {
            target: document.querySelector('#scroll-container'),
            ease: 0.05,
            endY: 0,
            y: 0,
            resizeRequest: 1,
            scrollRequest: 0
        };
        let requestId = 0;
        gsap.set(scroller.target, {
            rotation: 0.01,
            force3D: true
        });
        window.addEventListener('load', onLoad);

        function onLoad() {
            updateScroller();
            window.focus();
            window.addEventListener('resize', onResize);
            window.addEventListener('scroll', onScroll);
        }

        function updateScroller() {
            let resized = scroller.resizeRequest > 0;
            if(resized) {
                let height = scroller.target.clientHeight;
                body.style.height = `${height}px`;
                scroller.resizeRequest = 0;
            }

            let scrollY = window.pageYOffset || html.scrollTop || 0;
            scroller.endY = scrollY;
            scroller.y += (scrollY - scroller.y) * scroller.ease;
            if(Math.abs(scrollY - scroller.y) < 0.05 || resized) {
                scroller.y = scrollY;
                scroller.scrollRequest = 0;
            }
            gsap.set(scroller.target, {
                y: -scroller.y
            })
            requestId = scroller.scrollRequest > 0 ? requestAnimationFrame(updateScroller) : null;
        }

        function onResize() {
            scroller.resizeRequest++;
            if(!requestId) {
                requestId = requestAnimationFrame(updateScroller);
            }
        }

        function onScroll() {
            scroller.scrollRequest++;
            if(!requestId) {
                requestId = requestAnimationFrame(updateScroller);
            }
        }

    }
}
