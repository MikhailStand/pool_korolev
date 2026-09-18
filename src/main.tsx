import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { ArrowDown, ArrowUp, ArrowUpRight, Clock3, MapPin, Menu, Phone, X } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import { RetroMap } from './RetroMap';
import './styles.css';

const base = import.meta.env.BASE_URL;
const phoneHref = 'tel:+79998382917';
const phoneLabel = '+7 (999) 838-29-17';
const mapsHref = 'https://yandex.ru/maps/org/retro/17968240150/?ll=37.863951%2C55.920845&z=15';
const hoursSourceHref = 'https://tomesto.ru/moskva/places/retro';
const deliveryHref = 'https://retro-korolev.ru/contact.html#delivery';
const menuHref = 'https://retro-korolev.ru/menu.html';
const ourMenuHref = `${base}menu.html`;
const gallery = [
  { src: 'glavny-billiards-player.jpg', alt: 'Иллюстрация: игрок за бильярдным столом' },
  { src: 'glavny-billiards-hall.jpg', alt: 'Иллюстрация: бильярдный зал' },
  { src: 'glavny-billiards-shot.jpg', alt: 'Иллюстрация: удар по бильярдному шару' },
  { src: 'glavny-billiards-friends.jpg', alt: 'Иллюстрация: партия в бильярд' },
  { src: 'glavny-billiards-balls.jpg', alt: 'Иллюстрация: шары для русского бильярда' },
];

function Hours() {
  return <div className="hours-list"><span><b>Пн</b><strong>16:00–01:00</strong></span><span><b>Вт–Чт, Вс</b><strong>14:00–03:00</strong></span><span><b>Пт–Сб</b><strong>14:00–06:00</strong></span></div>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [headerScrolled, setHeaderScrolled] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMenuOpen(false); setLightbox(null); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return <main>
    <header className={`site-header shell${headerScrolled ? ' site-header-scrolled' : ''}`}>
      <a className="brand" href="#top" aria-label="Ретро — наверх"><span className="brand-mark">Р</span><span className="brand-copy"><b>Ретро</b><small>Кафе · Бильярд · Королёв</small></span></a>
      <nav className="desktop-nav" aria-label="Основная навигация"><a href="#top">Главная</a><a href="#billiards">Бильярд</a><a href="#food">Кухня</a><a href="#contacts">Контакты</a></nav>
      <a className="header-call" href={phoneHref} aria-label={`Позвонить в Ретро: ${phoneLabel}`}><Phone size={18} /> <span>{phoneLabel}</span></a>
      <button className="menu-button" aria-label="Открыть меню" onClick={() => setMenuOpen(true)}><Menu /></button>
    </header>

    <section className="hero" style={{ '--hero-image': `url(${base}images/glavny-hero-action.jpg)` } as React.CSSProperties}>
      <div id="top" className="hero-content shell">
        <p className="eyebrow"><span /> Кафе и бильярд в Королёве</p>
        <h1>Встречаемся<br />в <em>«Ретро»</em></h1>
        <p className="hero-lead">Сыграть партию, заказать ужин и провести вечер вместе — всё в одном месте на Полевом проезде.</p>
        <div className="hero-actions"><a className="button button-primary" href={phoneHref}><Phone size={19} /> Забронировать</a><a className="button button-prices" href="#billiards">О бильярде</a><a className="button button-prices" href="#food">О кухне</a></div>
        <div className="hero-meta"><a href={mapsHref} target="_blank" rel="noreferrer"><MapPin /> Полевой проезд, 4А</a><div className="hero-hours"><Clock3 /><Hours /></div></div>
        <p className="hero-photo-note">Иллюстративное изображение</p>
      </div>
      <a className="scroll-hint" href="#billiards" aria-label="Листать к разделу о бильярде"><ArrowDown /></a>
    </section>

    <section className="facts-zone" aria-label="Что есть в Ретро"><div className="quick-facts shell">
      <div><small>Для игры</small><strong>Бильярд</strong><span>русский бильярд и американский пул</span></div>
      <div><small>Для ужина</small><strong>Мангал</strong><span>мясо, рыба и овощи</span></div>
      <div><small>Для компании</small><strong>Караоке</strong><span>вечер можно продолжить</span></div>
      <div><small>С собой</small><strong>Еда навынос</strong><span>или доставка</span></div>
    </div></section>

    <section id="billiards" className="about section-pad shell">
      <div className="about-copy"><p className="section-kicker">Бильярд в Ретро</p><h2>Для партии —<br /><em>свой стол</em></h2>
        <p className="section-lead">Любите размеренную игру или быстрый пул? В «Ретро» можно выбрать формат под настроение, а после партии остаться на ужин.</p>
        <div className="feature-list"><div><b>Русский бильярд</b><small>Для тех, кто ценит точность и неспешную игру.</small></div><div><b>Американский пул</b><small>Более динамичный формат для встречи с друзьями.</small></div><div><b>Стол и ужин в одном месте</b><small>Бронируйте игру и спрашивайте свободное время по телефону.</small></div></div>
      </div>
      <div className="about-image-wrap"><img src={`${base}images/glavny-billiards-balls.jpg`} alt="Иллюстрация: бильярдные шары на столе" loading="lazy" /></div>
    </section>

    <section className="prices section-pad" aria-labelledby="game-heading"><div className="shell">
      <div className="section-heading split-heading"><div><p className="section-kicker">Выбор игры</p><h2 id="game-heading">Во что <em>сыграем?</em></h2></div><p>Для ориентира — опубликованные цены клуба «Визави» по тому же адресу. Это не подтверждённый тариф «Ретро»: точную стоимость уточните перед игрой.</p></div>
      <div className="game-grid">
        <a className="game-card" href="#booking" aria-label="Русский бильярд: ориентир 450–550 рублей в час, перейти к бронированию"><span>Русский бильярд</span><strong className="game-price">450–550 <small>₽ / час</small></strong><p>Ориентир по соседнему клубу, не тариф «Ретро»</p><small>Уточнить цену и забронировать <ArrowUpRight /></small></a>
        <a className="game-card" href="#booking" aria-label="Американский пул: ориентир 400–450 рублей в час, перейти к бронированию"><span>Американский пул</span><strong className="game-price">400–450 <small>₽ / час</small></strong><p>Ориентир по соседнему клубу, не тариф «Ретро»</p><small>Уточнить цену и забронировать <ArrowUpRight /></small></a>
        <div className="game-info"><p>Перед игрой</p><strong>Уточните<br />тариф</strong><span>Цена может зависеть от дня и времени. По телефону подскажут стоимость и свободные столы.</span><a href={phoneHref}><Phone size={18} /> {phoneLabel}</a></div>
      </div>
      <p className="game-source">Источник ориентиров: <a href="https://visavis-club.ru/" target="_blank" rel="noreferrer">прайс клуба «Визави» <ArrowUpRight size={15} /></a>. «Визави» и «Ретро» — разные заведения по одному адресу.</p>
    </div></section>

    <section id="gallery" className="gallery-section section-pad shell"><div className="section-heading split-heading"><div><p className="section-kicker">Атмосфера игры</p><h2>Время для <em>партии</em></h2></div><p>Пока здесь иллюстративные кадры бильярда, не фотографии «Ретро». <a className="gallery-source-link" href="https://retro-korolev.ru/gallery.html" target="_blank" rel="noreferrer">Посмотреть галерею кафе <ArrowUpRight size={17} /></a></p></div>
      <div className="gallery-grid">{gallery.map((image, index) => <button key={image.src} className={`gallery-item gallery-item-${index + 1}`} onClick={() => setLightbox(index)} aria-label={`Открыть фото: ${image.alt}`}><img src={`${base}images/${image.src}`} alt={image.alt} loading="lazy" /><span><ArrowUpRight /></span></button>)}</div>
    </section>

    <section id="food" className="food-section section-pad"><div className="shell food-layout">
      <div className="food-copy"><p className="section-kicker">О кафе и кухне</p><h2>После партии —<br /><em>за стол.</em></h2><p className="section-lead">«Ретро» — не только бильярд. Здесь можно поужинать вдвоём, встретиться с друзьями или собрать компанию на праздник. В меню — блюда с мангала, домашняя кухня и бар.</p>
        <div className="cafe-highlights" aria-label="В кафе"><div><strong>3 зала</strong><span>для встреч и праздников</span></div><div><strong>Мангал</strong><span>мясо, рыба и овощи</span></div><div><strong>Банкеты</strong><span>для большой компании</span></div></div>
        <div className="food-types" aria-label="Разделы меню"><a href={`${ourMenuHref}#grill`}>Мангал и шашлык</a><a href={`${ourMenuHref}#salads`}>Салаты</a><a href={`${ourMenuHref}#snacks`}>Закуски</a><a href={`${ourMenuHref}#hookah`}>Кальян</a></div>
        <div className="food-actions"><a className="button button-primary" href={ourMenuHref}>Посмотреть меню <ArrowUpRight size={18} /></a><a className="button button-ghost" href={phoneHref}><Phone size={18} /> Уточнить по телефону</a></div>
        <p className="food-disclaimer">Меню на отдельной странице собрано по данным <a href={menuHref} target="_blank" rel="noreferrer">сайта «Ретро»</a>. Цены и наличие блюд уточняйте по телефону.</p>
      </div>
      <figure className="food-photo"><img src={`${base}images/retro-food-grill.jpg`} alt="Иллюстрация: шашлык, овощи, салат и хлеб на столе" loading="lazy" /><figcaption>Иллюстративное изображение, не фото заведения</figcaption></figure>
    </div></section>

    <section id="delivery" className="delivery-section" aria-labelledby="delivery-heading"><div className="shell">
      <div className="delivery-layout">
        <div className="delivery-heading"><p className="section-kicker">Доставка из «Ретро»</p><h2 id="delivery-heading">Ужин — <em>к вам домой.</em></h2><p>Шашлык и другие блюда привезут домой. Можно также забрать заказ самостоятельно.</p><div className="delivery-actions"><a className="button button-primary" href={phoneHref}><Phone size={19} /> Заказать по телефону</a><a className="delivery-map-link" href="#delivery-map">Посмотреть зону доставки <ArrowDown size={18} /></a></div></div>
        <div className="delivery-details" aria-label="Условия доставки">
          <div className="delivery-highlight"><span>Бесплатно в зоне доставки</span><strong>от 3 500 ₽</strong></div>
          <div><span>Минимальный заказ</span><strong>2 500 ₽</strong></div>
          <div><span>Стоимость доставки</span><strong>300–1 200 ₽</strong></div>
          <div><span>Время доставки</span><strong>12:00–24:00</strong><small>ежедневно</small></div>
          <p>Заказы принимают до 23:00. За пределами отмеченной зоны доставку рассчитывают по тарифам Яндекс Go — стоимость уточните по телефону.</p>
        </div>
      </div>
      <div id="delivery-map" className="delivery-map-section"><div className="delivery-map-heading"><div><p className="section-kicker">Где привезём</p><h3>Зона доставки</h3><p>Зелёным выделена зона бесплатной доставки при заказе от 3 500 ₽. Проверьте свой адрес на карте перед заказом.</p></div><a href={deliveryHref} target="_blank" rel="noreferrer">Открыть карту крупнее <ArrowUpRight size={18} /></a></div><div className="delivery-map-frame"><RetroMap showDeliveryZone /></div><p className="delivery-map-note">Граница зоны взята с <a href={deliveryHref} target="_blank" rel="noreferrer">официальной карты кафе</a>. Для адресов за пределами зоны стоимость доставки уточняйте при заказе.</p></div>
    </div></section>

    <section id="booking" className="booking-zone"><div className="booking-banner shell"><div><p className="section-kicker">Вечер начинается здесь</p><h2>Осталось выбрать <em>время</em></h2></div><div className="booking-actions"><a className="button button-primary" href={phoneHref}><Phone /> Позвонить и забронировать</a><a className="button button-outline-dark" href={mapsHref} target="_blank" rel="noreferrer"><MapPin /> Построить маршрут</a></div></div></section>

    <section id="contacts" className="contacts section-pad"><div className="shell contacts-grid"><div className="contacts-copy"><p className="section-kicker">Контакты</p><h2>До встречи<br /><em>в Ретро</em></h2><div className="contact-lines"><a href={phoneHref}><span>Телефон и бронь</span><b>{phoneLabel}</b></a><div className="contact-hours-row"><span>Режим работы</span><Hours /><small>Расписание по открытым данным. Перед поздним визитом лучше позвонить. <a href={hoursSourceHref} target="_blank" rel="noreferrer">Источник <ArrowUpRight size={14} /></a></small></div><div><span>Адрес</span><b>Королёв, Полевой проезд, 4А</b></div></div><div className="contact-buttons"><a className="button button-primary" href={mapsHref} target="_blank" rel="noreferrer"><MapPin /> Построить маршрут</a><a className="button button-ghost" href={phoneHref}><Phone /> Позвонить</a></div></div>
      <div className="map-card"><RetroMap /><a className="map-link" href={mapsHref} target="_blank" rel="noreferrer" aria-label="Открыть кафе Ретро в Яндекс Картах">Открыть в Яндекс Картах <ArrowUpRight /></a></div>
    </div></section>

    <footer className="footer shell"><a className="brand" href="#top"><span className="brand-mark">Р</span><span className="brand-copy"><b>Ретро</b><small>Кафе · Бильярд · Королёв</small></span></a><p>© {new Date().getFullYear()} Кафе и бильярд «Ретро»</p><a className="footer-phone" href={phoneHref}>{phoneLabel}</a><a className="back-to-top" href="#top"><ArrowUp /> Наверх</a></footer>

    {menuOpen && <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Меню"><button onClick={closeMenu} aria-label="Закрыть меню"><X /></button><nav><a href="#top" onClick={closeMenu}>Главная</a><a href="#billiards" onClick={closeMenu}>Бильярд</a><a href="#food" onClick={closeMenu}>Кухня</a><a href="#contacts" onClick={closeMenu}>Контакты</a></nav><a className="button button-primary" href={phoneHref}><Phone /> Позвонить и забронировать</a></div>}
    {lightbox !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Просмотр фотографии" onClick={() => setLightbox(null)}><button aria-label="Закрыть фотографию"><X /></button><img src={`${base}images/${gallery[lightbox].src}`} alt={gallery[lightbox].alt} onClick={(event) => event.stopPropagation()} /></div>}
  </main>;
}

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
