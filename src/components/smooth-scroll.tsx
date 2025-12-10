// "use client";

// import { useEffect } from 'react';

// export function SmoothScroll() {
//     useEffect(() => {
//         // Плавный скролл для всех ссылок с якорями
//         const handleAnchorClick = (e: MouseEvent) => {
//             const target = e.target as HTMLElement;
//             const anchor = target.closest('a[href^="#"]');

//             if (anchor) {
//                 e.preventDefault();
//                 const href = anchor.getAttribute('href');
//                 if (!href || href === '#') return;

//                 const element = document.querySelector(href);
//                 if (element) {
//                     element.scrollIntoView({
//                         behavior: 'smooth',
//                         block: 'start',
//                     });

//                     // Обновить URL без перезагрузки страницы
//                     history.pushState(null, '', href);
//                 }
//             }
//         };

//         document.addEventListener('click', handleAnchorClick);

//         return () => {
//             document.removeEventListener('click', handleAnchorClick);
//         };
//     }, []);

//     return null;
// }