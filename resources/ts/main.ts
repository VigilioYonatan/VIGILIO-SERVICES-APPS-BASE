import "vite/modulepreload-polyfill"; // no borrar
import "../css/index.css";
import "aos/dist/aos.css";
import "@vigilio/sweet/sweet.min.css";
import AOS from "aos";
import Alpine from "alpinejs";
import render from "./lib/preact";
import { lazy } from "preact/compat";
Alpine.start();
AOS.init();

/* WEB */
render(
    "InformationStore",
    lazy(() => import("@/information/views/InformationStore"))
);
render(
    "ButtonProduct",
    lazy(() => import("@/products/views/ButtonProduct"))
);

render(
    "WebCarta",
    lazy(() => import("@/web/views/WebCarta"))
);

render(
    "WebTabs",
    lazy(() => import("@/web/views/WebTabs"))
);
render(
    "WebSettings",
    lazy(() => import("@/web/views/WebSettings"))
);
render(
    "WebReviews",
    lazy(() => import("@/web/views/WebReviews"))
);
/* CART */
render(
    "Cart",
    lazy(() => import("@/cart/views/Cart"))
);
/* AUTH */
render(
    "ButtonAuth",
    lazy(() => import("@/auth/views/ButtonAuth"))
);
render(
    "AuthProfile",
    lazy(() => import("@/auth/views/AuthProfile"))
);
render(
    "AuthLogin",
    lazy(() => import("@/auth/views/AuthLogin"))
);

/* ADMIN */
render(
    "VigilioAdmin",
    lazy(() => import("./App"))
);

/* MARKDOWN */
// render(
//     "MarkDown",
//     lazy(() => import("@/web/views/MarkDown"))
// );
